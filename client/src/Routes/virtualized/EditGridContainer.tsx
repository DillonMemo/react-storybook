import React, { useState, useEffect, CSSProperties, useMemo } from "react";
import { AutoSizer, MultiGrid, GridCellProps, Grid } from "react-virtualized";
import styled from "styled-components";
import { FaPen, FaRegCheckCircle, FaRegTimesCircle } from "react-icons/fa";
import Faker from "faker";

import { CSS } from "./";

export type EditGridContainerProps = {
  gridStyles: CSS;
};

const EditGridContainer: React.FC<EditGridContainerProps> = ({ gridStyles }) => {
  const [count, setCount] = useState({ rowCount: 50, columnCount: headerColumns.length });
  const [dataCollection, setDataCollection] = useState<{ rows: any[] }>({ rows: [] });
  const [editDatas, setEditDatas] = useState<typeof dataCollection.rows>(useMemo(() => [], []));

  /**
   * set a card to the edit card
   * @param rowData - row data
   */
  const setEdit = (rowData: any) => (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log("setEdit rowData :", rowData);
    const reEditDatas: typeof dataCollection.rows = editDatas;
    let index = reEditDatas.findIndex(data => data.id === rowData.id);

    if (index === -1) {
      let data: any = {
        ...rowData,
        isEdit: true
      };
      let newEdit = [...reEditDatas, data];
      setEditDatas(newEdit);

      // rowUpdate(rowData.id, { prop: "isEdit", value: true });
      let num = dataCollection.rows.findIndex(data => data.id === rowData.id);
      let collection = [
        ...dataCollection.rows.slice(0, num),
        { ...dataCollection.rows[num], isEdit: true },
        ...dataCollection.rows.slice(num + 1)
      ];

      setDataCollection({ rows: collection });
    }
  };

  /**
   * get a card from the edit card
   * @param id - edit 배열에서 특정 값 찾을 id
   */
  const getEdit = (id: number | string) => {
    const reEditDatas: typeof dataCollection.rows = editDatas;
    const index = reEditDatas.findIndex(data => data.id === id);

    return index !== -1 ? reEditDatas[index] : undefined;
  };

  /**
   * 테이블 Row 업데이트
   * @param id - a row id
   * @param dataKey - data key in a row
   */
  const updateEdit = (id: number | string, dataKey: string) => (e: React.ChangeEvent<unknown>) => {
    console.log(dataCollection);
    const reEditDatas: typeof dataCollection.rows = editDatas;

    let index = reEditDatas.findIndex(data => data.id === id);
    if (index !== -1) {
      let newEdits = [
        ...reEditDatas.slice(0, index),
        { ...reEditDatas[index], [dataKey]: (e.target as any).value },
        ...reEditDatas.slice(index + 1)
      ];

      setEditDatas(newEdits);
    }
  };

  /**
   * save the edit mode to row
   * @param id - a row id
   */
  const saveEdit = (id: number | string) => (e: React.MouseEvent<HTMLDivElement>) => {
    const reEditDatas: typeof dataCollection.rows = editDatas;
    let index = reEditDatas.findIndex(data => data.id === id);

    if (index !== -1) {
      let updates: any = {
        ...reEditDatas[index],
        id,
        isEdit: false
      };

      let num = dataCollection.rows.findIndex(data => data.id === id);

      let collection = [
        ...dataCollection.rows.slice(0, num),
        { ...updates },
        ...dataCollection.rows.slice(num + 1)
      ];

      setDataCollection({ rows: collection });

      let newEdit = [...reEditDatas.slice(0, index), ...reEditDatas.slice(index + 1)];
      setEditDatas(newEdit);
    }
  };

  /**
   * cancel on edit of a row
   * @param id - a row id
   */
  const cancelEdit = (id: number | string) => (e: React.MouseEvent<HTMLDivElement>) => {
    const reEditData: typeof dataCollection.rows = editDatas;
    let index = reEditData.findIndex(data => data.id === id);

    if (index !== -1) {
      let num = dataCollection.rows.findIndex(data => data.id === reEditData[index].id);
      let collection = [
        ...dataCollection.rows.slice(0, num),
        { ...dataCollection.rows[num], isEdit: false },
        ...dataCollection.rows.slice(num + 1)
      ];
      setDataCollection({ rows: collection });

      let newEdit = [...reEditData.slice(0, index), ...reEditData.slice(index + 1)];

      setEditDatas(newEdit);
    }
  };

  const cellRenderer = ({ columnIndex, rowIndex, key, style }: GridCellProps) => {
    // console.log(dataCollection.rows[rowIndex][headerColumns[columnIndex].dataKey]);
    rowIndex = rowIndex - 1; // header column
    const { dataKey, label, width, options, type }: Column = headerColumns[columnIndex];
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
      let content: JSX.Element = <></>;
      // 수정 모드 일 경우
      if (dataKey === "editMode") {
        if (row.isEdit) {
          content = (
            <Block key={key} style={{ ...style, ...Cell }}>
              <Block className={`hover`} onClick={saveEdit(row.id)}>
                <FaRegCheckCircle style={{ width: 20, height: 20 }} />
              </Block>
              <Block className={`hover`} onClick={cancelEdit(row.id)}>
                <FaRegTimesCircle style={{ width: 20, height: 20 }} />
              </Block>
            </Block>
          );
        } else {
          content = (
            <Block
              className={`hover`}
              key={key}
              style={{ ...style, ...Cell }}
              onClick={setEdit(row)}>
              <FaPen />
            </Block>
          );
        }
      } else {
        if (options.editable && row.isEdit) {
          if (!type) {
            let editData: any = getEdit(row.id);
            content = (
              <Block key={key} style={{ ...style, ...Cell }}>
                <input
                  type="text"
                  value={editData[dataKey]}
                  onChange={updateEdit(row.id, dataKey)}
                  style={{ width: "90%" }}
                />
              </Block>
            );
          } else if (type === "button") {
          }
        } else {
          content = (
            <Block key={key} style={{ ...style, ...Cell }}>
              {row[dataKey]}
            </Block>
          );
        }
      }
      return content;
    }
  };

  const actionRenderer = ({ columnIndex, rowIndex, key, style }: GridCellProps) => {
    return (
      <Block key={key} style={{ ...style, ...Cell }}>
        {columnIndex}, {rowIndex}
      </Block>
    );
  };

  useEffect(() => {
    const rows = [];
    for (let i = 1; i < count.rowCount; i++) {
      rows.push({
        id: i,
        title: Faker.name.title(),
        jobTitle: Faker.name.jobTitle(),
        jobType: Faker.name.jobType(),
        jobDescriptor: Faker.name.jobDescriptor(),
        isEdit: false
      });
    }
    setDataCollection({ rows });
  }, []);

  return (
    <>
      <AutoSizer disableHeight>
        {({ width, height }) => (
          <>
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
            <form>
              <Grid
                width={width}
                height={50}
                scrollToColumn={0}
                scrollToRow={0}
                cellRenderer={cellProps => actionRenderer({ ...cellProps })}
                columnWidth={({ index }) => {
                  return headerColumns[index].width;
                  // return width * headerColumns[index].width
                }}
                columnCount={count.columnCount}
                rowHeight={50}
                rowCount={1}
                style={gridStyles.STYLE}
              />
            </form>
          </>
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
    editable: boolean;
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
    width: 300,
    options: {
      editable: true
    }
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
    width: 150,
    options: {
      editable: true
    }
    // width: 0.12
  },
  {
    dataKey: "jobDescriptor",
    label: "직업 설명",
    width: 150,
    options: {
      editable: true
    }
    // width: 0.12
  },
  {
    dataKey: "editMode",
    label: "",
    width: 100
  }
];

headerColumns = headerColumns.map((data: Column, index) => {
  if (data.dataKey !== "editMode") {
    return {
      ...data,
      options: {
        ...data.options,
        id: index,
        sortable: true
      }
    };
  } else {
    return {
      ...data,
      options: {
        ...data.options,
        id: index
      }
    };
  }
});

export default EditGridContainer;
