import React, { useState, useEffect, CSSProperties } from "react";
import { AutoSizer, MultiGrid, GridCellProps } from "react-virtualized";
import styled from "styled-components";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import Faker from "faker";

import { CSS } from "./";

export type EditGridContainerProps = {
  gridStyles: CSS;
};

const EditGridContainer: React.FC<EditGridContainerProps> = ({ gridStyles }) => {
  const [count, setCount] = useState({ rowCount: 50, columnCount: headerColumns.length });
  const [dataCollection, setDataCollection] = useState<{ rows: any[] }>({ rows: [] });

  const cellRenderer = ({ columnIndex, rowIndex, key, style }: GridCellProps) => {
    // console.log(dataCollection.rows[rowIndex][headerColumns[columnIndex].dataKey]);
    rowIndex = rowIndex - 1; // header column
    const { dataKey, label, width, options }: Column = headerColumns[columnIndex];
    const row = dataCollection.rows[rowIndex];
    if (rowIndex === -1) {
      return (
        <Block
          key={key}
          style={{
            ...style,
            ...Cell
          }}>
          <Block>{headerColumns[columnIndex].label}</Block>
        </Block>
      );
    } else {
      debugger;
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
            // styleBottomRightGrid={gridStyles.STYLE_BOTTOM_RIGHT_GRID}
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

export default EditGridContainer;
