import React, { useState, useEffect, CSSProperties } from "react";
import { AutoSizer, MultiGrid, GridCellProps } from "react-virtualized";
import styled from "styled-components";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Faker from "faker";

import { CSS } from "./";

export type SortGridContainerProps = {
  gridStyles: CSS;
};

const SortGridContainer: React.FC<SortGridContainerProps> = ({ gridStyles }) => {
  const [count, setCount] = useState({ rowCount: 50, columnCount: headerColumns.length });
  const [dataCollection, setDataCollection] = useState<{ rows: any[] }>({ rows: [] });
  const [defaultSort, setDefaultSort] = useState<{
    sortBy: Number;
    sortDirection: "" | "asc" | "desc";
  }>({ sortBy: 0, sortDirection: "" });

  // =======================
  // Sorting - Start
  // =======================
  useEffect(() => {
    /**
     * 정렬(sort) 연산을 하기 위한 결과값 반환
     * @param rowData - get row Data
     * @param columnDef - get column define
     */
    const getValue = (rowData: any[string | number], columnDef: Column) => {
      let value =
        columnDef.dataKey && typeof rowData[columnDef.dataKey] !== "undefined"
          ? rowData[columnDef.dataKey]
          : "";
      return value;
    };

    /**
     * @tutorial - 결과가 -1 이면 DESC, 1 이면 ASC
     * @param a - 첫번째 sort 비교 인자
     * @param b - 두번째 sort 비교 인자
     * @param type - sorting되는 column의 타입
     */
    const sort = <K extends number>(a: any, b: K, type?: { [x: number]: string }): number => {
      if (type === "numeric") {
        return a - b;
      } else {
        if (a !== b) {
          if (!a) return -1;
          if (!b) return 1;
        }
      }
      return a < b ? -1 : a > b ? 1 : 0;
    };

    const { sortBy, sortDirection } = defaultSort;

    const columnDef: Column =
      sortBy !== -1
        ? headerColumns.find(col => col.options && col.options.id === defaultSort.sortBy)!
        : headerColumns.find(col => col.options && col.options.id === 0)!;

    let newRows = dataCollection.rows.sort(
      sortDirection === "desc"
        ? (a, b) => sort(getValue(b, columnDef), getValue(a, columnDef), columnDef.type)
        : (a, b) => sort(getValue(a, columnDef), getValue(b, columnDef), columnDef.type)
    );

    setDataCollection({ rows: newRows });
  }, [defaultSort]);

  /**
   * order 변경 from column
   * @param orderBy - order by header column
   * @param orderDirection - "asc" | "desc" | ""
   */
  const onChangeSort = (sortBy: number, sortDirection: typeof defaultSort.sortDirection) => {
    const newSortBy = sortDirection === "" ? -1 : sortBy;

    setDefaultSort({ sortBy: newSortBy, sortDirection });
  };
  // =======================
  // Sorting - End
  // =======================

  const cellRenderer = ({ columnIndex, rowIndex, key, style }: GridCellProps) => {
    // console.log(dataCollection.rows[rowIndex][headerColumns[columnIndex].dataKey]);
    rowIndex = rowIndex - 1; // header column
    const { dataKey, label, width, options }: Column = headerColumns[columnIndex];
    const row = dataCollection.rows[rowIndex];
    if (rowIndex === -1) {
      return (
        <Block
          key={key}
          className={`hover`}
          style={{
            ...style,
            ...Cell
          }}
          onClick={() => {
            const { options } = headerColumns[columnIndex];
            if (options) {
              const sortDirection =
                options.id !== defaultSort.sortBy
                  ? "asc"
                  : defaultSort.sortDirection === "asc"
                  ? "desc"
                  : defaultSort.sortDirection === "desc"
                  ? ""
                  : defaultSort.sortDirection === ""
                  ? "asc"
                  : "desc";

              onChangeSort(options.id, sortDirection);
            }
          }}>
          <Block>
            {headerColumns[columnIndex].label}
            {options.id !== defaultSort.sortBy ? null : defaultSort.sortDirection === "asc" ? (
              <FaAngleUp />
            ) : defaultSort.sortDirection === "desc" ? (
              <FaAngleDown />
            ) : defaultSort.sortDirection === "" ? null : (
              <FaAngleDown />
            )}
          </Block>
        </Block>
      );
    } else {
      return (
        <Block key={key} style={{ ...style, ...Cell }}>
          {row[dataKey]}
        </Block>
      );
    }
  };

  useEffect(() => {
    const rows = [];
    for (let i = 1; i < count.rowCount; i++) {
      rows.push({
        id: i,
        title: Faker.name.title(),
        jobTitle: Faker.name.jobTitle(),
        jobType: Faker.name.jobType(),
        jobDescriptor: Faker.name.jobDescriptor()
      });
    }
    setDataCollection({ rows });
  }, []);

  return (
    <>
      <AutoSizer disableHeight>
        {({ width, height }) => (
          <MultiGrid
            width={width}
            height={300}
            fixedColumnCount={1}
            fixedRowCount={1}
            scrollToColumn={0}
            scrollToRow={0}
            cellRenderer={cellProps => cellRenderer({ ...cellProps })}
            columnWidth={({ index }) => {
              return headerColumns[index].width;
              // return width * headerColumns[index].width
            }}
            columnCount={count.columnCount}
            rowHeight={50}
            rowCount={count.rowCount}
            enableFixedColumnScroll={false}
            enableFixedRowScroll={false}
            style={gridStyles.STYLE}
            styleBottomLeftGrid={gridStyles.STYLE_BOTTOM_LEFT_GRID}
            styleBottomRightGrid={gridStyles.STYLE_BOTTOM_RIGHT_GRID}
            styleTopLeftGrid={gridStyles.STYLE_TOP_LEFT_GRID}
            styleTopRightGrid={gridStyles.STYLE_TOP_RIGHT_GRID}
          />
        )}
      </AutoSizer>
    </>
  );
};

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &.hover {
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const Cell: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid #eee",
  borderRight: "1px solid #eee"
};

type Column = {
  dataKey: string;
  label: string;
  options: {
    id: number;
    sortable: boolean;
  };
  type?: "numeric" | "button" | "select" | "date" | "datetime";
  width: number;
};
let headerColumns: Column[] | any[] = [
  {
    dataKey: "id",
    label: "No.",
    width: 50
    // width: 0.04
  },
  {
    dataKey: "title",
    label: "제목",
    width: 300
    // width: 0.4
  },
  {
    dataKey: "jobTitle",
    label: "직업 제목",
    width: 300
    // width: 0.28
  },
  {
    dataKey: "jobType",
    label: "직업 종류",
    width: 150
    // width: 0.12
  },
  {
    dataKey: "jobDescriptor",
    label: "직업 설명",
    width: 150
    // width: 0.12
  }
];

headerColumns = headerColumns.map((data: Column, index) => ({
  ...data,
  options: {
    id: index,
    sortable: true
  }
}));

export default SortGridContainer;
