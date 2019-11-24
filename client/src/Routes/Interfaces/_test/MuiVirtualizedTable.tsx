import React, { useRef, useState, useMemo, ChangeEvent } from "react";
import { AutoSizer, Table, Column, TableHeaderProps, TableCellProps } from "react-virtualized";
import { List, ColumnData } from ".";
import { TableCell, IconButton, TextField, TableSortLabel } from "@material-ui/core";
import { MdModeEdit, MdDone, MdCancel } from "react-icons/md";

interface IProps {
  list: List[];
  columns: ColumnData[];
  headerHeight?: number;
  rowHeight?: number;
  updateData: (data: List[]) => void;
}

interface dataManager {
  orderBy: number;
  orderDirection: "asc" | "desc" | "";
}

const MuiVirtualizedTable: React.FunctionComponent<IProps> = props => {
  const [editDatas, setEditDatas] = useState<any[]>(useMemo(() => [], []));
  const [renderState, setRenderState] = useState<dataManager>(
    useMemo<dataManager>(() => ({ orderBy: -1, orderDirection: "" }), [])
  );

  // Sorting
  useMemo(() => {
    console.log("sorting", renderState);

    /**
     * 정렬(sort) 연산을 하기 위한 결과값 반환
     * @param rowData - get row Data
     * @param columnDef - get column define
     */
    const getValue = (rowData: any[string | number], columnDef: ColumnData) => {
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

    const { orderBy, orderDirection } = renderState;

    const columnDef: ColumnData =
      orderBy !== -1
        ? props.columns.find(col => col.tableData.id === renderState.orderBy)!
        : props.columns.find(col => col.tableData.id === 0)!;

    props.list.sort(
      orderDirection === "desc"
        ? (a, b) => sort(getValue(b, columnDef), getValue(a, columnDef), columnDef.type)
        : (a, b) => sort(getValue(a, columnDef), getValue(b, columnDef), columnDef.type)
    );
  }, [renderState]);

  /**
   * order 변경 from column
   * @param orderBy - order by header column
   * @param orderDirection - "asc" | "desc" | ""
   */
  const onChangeOrder = (orderBy: number, orderDirection: typeof renderState.orderDirection) => {
    const newOrderBy = orderDirection === "" ? -1 : orderBy;

    setRenderState({ orderBy: newOrderBy, orderDirection });
  };

  /**
   * Applies updates to an card in th collection - 컬렉션의 row에  업데이트를 적용시킵니다.
   * @param id - row data id
   * @param updates - 업데이트할 property와 value
   */
  const rowUpdate = (
    id: string | number,
    updates: { prop: string; value: string | number } | any
  ) => {
    // defining method variables
    let collection = undefined;

    let index = props.list.findIndex(data => data.id === id);

    // 찾은 index 검사
    if (index !== -1) {
      if (Object.keys(updates).length > 2) {
        console.log("update", updates);

        let newData = Object.assign(props.list[index], updates);

        collection = [
          ...props.list.slice(0, index),
          { ...newData },
          ...props.list.slice(index + 1)
        ];
      } else {
        // prop, value 업데이트
        const { prop, value } = updates;

        // 업데이트 적용
        collection = [
          ...props.list.slice(0, index),
          { ...props.list[index], [prop]: value },
          ...props.list.slice(index + 1)
        ];
      }

      props.updateData(collection);
    }
  };

  /**
   * set a card to the edit card
   * @param rowData - row data
   */
  const setEdit = (rowData: List) => (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("setEdit rowData :", rowData);
    const reEditDatas: List[] = editDatas;
    let index = reEditDatas.findIndex(data => data.id === rowData.id);

    if (index === -1) {
      let data: List = {
        id: rowData.id,
        product: rowData.product,
        productMaterial: rowData.productMaterial
      };
      let newEdit = [...reEditDatas, data];
      setEditDatas(newEdit);

      rowUpdate(rowData.id, { prop: "isEdit", value: true });
    }
  };

  /**
   * get a card from the edit card
   * @param id - edit 배열에서 특정 값 찾을 id
   */
  const getEdit = (id: number | string) => {
    const reEditDatas: List[] = editDatas;
    const index = reEditDatas.findIndex(data => data.id === id);

    return index !== -1 ? reEditDatas[index] : undefined;
  };

  /**
   * 테이블 Row 업데이트
   * @param id - a row id
   * @param dataKey - data key in a row
   */
  const updateEdit = (id: number | string, dataKey: string) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const reEditDatas: List[] = editDatas;

    let index = reEditDatas.findIndex(data => data.id === id);
    if (index !== -1) {
      let newEdits = [
        ...reEditDatas.slice(0, index),
        { ...reEditDatas[index], [dataKey]: e.target.value },
        ...reEditDatas.slice(index + 1)
      ];

      setEditDatas(newEdits);
    }
  };

  /**
   * save the edit mode to row
   * @param id - a row id
   */
  const saveEdit = (id: number | string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const reEditDatas: List[] = editDatas;
    let index = reEditDatas.findIndex(data => data.id === id);

    if (index !== -1) {
      let updates: List = {
        id,
        product: reEditDatas[index].product,
        productMaterial: reEditDatas[index].productMaterial,
        isEdit: false
      };

      rowUpdate(reEditDatas[index].id, updates);

      // edit mode 제거
      let newEdit = [...reEditDatas.slice(0, index), ...reEditDatas.slice(index + 1)];

      setEditDatas(newEdit);
    }
  };

  /**
   * cancel on edit of a row
   * @param id - a row id
   */
  const cancelEdit = (id: number | string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    const editData: List[] = editDatas;
    let index = editData.findIndex(data => data.id === id);

    if (index !== -1) {
      rowUpdate(editData[index].id, { prop: "isEdit", value: false });

      let newEdit = [...editData.slice(0, index), ...editData.slice(index + 1)];

      setEditDatas(newEdit);
    }
  };

  /**
   * 테이블 헤더 랜더링
   * @param headerProps - virtualized header props
   */
  const headerRenderer = (headerProps: TableHeaderProps): JSX.Element => {
    // console.log("headerRenderer headerProps :");
    let headerCnt = 0;
    let content = headerProps.label;

    if (headerProps.columnData) {
      const { sortable, tableData }: ColumnData = headerProps.columnData;
      if (sortable) {
        content = (
          <TableSortLabel
            active={renderState.orderBy === tableData.id}
            direction={renderState.orderDirection || "asc"}
            onClick={() => {
              const orderDirection =
                tableData.id !== renderState.orderBy
                  ? "asc"
                  : renderState.orderDirection === "asc"
                  ? "desc"
                  : renderState.orderDirection === "desc"
                  ? ""
                  : renderState.orderDirection === ""
                  ? "asc"
                  : "desc";
              console.log("orderDirection", orderDirection);

              onChangeOrder(tableData.id, orderDirection);
            }}>
            {content}
          </TableSortLabel>
        );
      }
    }

    return (
      <TableCell
        key={`header-${
          headerProps.columnData
            ? headerProps.columnData.tableData.id
            : headerProps.columnData.tableData.key
        }`}
        component="div"
        className={``}
        variant="head"
        style={{
          height: 48,
          display: "flex",
          flex: 1,
          boxSizing: "border-box",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "1.4rem"
        }}
        align={"center"}>
        {content}
      </TableCell>
    );
  };

  /**
   * 테이블 셀 랜더링
   * @param cellProps - virtualized cell props
   */
  const cellRenderer = (cellProps: TableCellProps): JSX.Element => {
    // console.log("cellRenderer cellprops :");
    const {
      columnData,
      rowData
    }: { columnData?: { editable?: boolean }; rowData: List } = cellProps;

    let content = cellProps.cellData;

    if (columnData!.editable && rowData.isEdit) {
      let editData: any = getEdit(rowData.id);

      content = (
        <TextField
          value={editData[cellProps.dataKey]}
          type="text"
          onChange={updateEdit(rowData.id, cellProps.dataKey)}
        />
      );
    }

    return (
      <TableCell
        key={`body-${rowData.id}`}
        component="div"
        variant="body"
        style={{
          height: 48,
          display: "flex",
          flex: 1,
          boxSizing: "border-box",
          alignItems: "center",
          fontSize: "1.4rem"
        }}
        align={"center"}>
        {cellProps.dataKey === "id" ? content + 1 : content}
      </TableCell>
    );
  };

  /**
   * 테이블 edit 버튼 랜더링
   * @param cellProps - virtualized cell props
   */
  const actionRenderer = (cellProps: TableCellProps): JSX.Element => {
    const { rowData }: { rowData: List } = cellProps;

    let content: JSX.Element = rowData.isEdit ? (
      <div>
        <IconButton onClick={saveEdit(rowData.id)}>
          <MdDone style={{ width: 20, height: 20 }} />
        </IconButton>
        <IconButton onClick={cancelEdit(rowData.id)}>
          <MdCancel style={{ width: 20, height: 20 }} />
        </IconButton>
      </div>
    ) : (
      <div>
        <IconButton onClick={setEdit(rowData)}>
          <MdModeEdit style={{ width: 20, height: 20 }} />
        </IconButton>
      </div>
    );

    return (
      <TableCell
        component="div"
        variant="body"
        style={{
          height: 48,
          display: "flex",
          flex: 1,
          boxSizing: "border-box",
          alignItems: "center",
          flexDirection: "row-reverse"
        }}
        align={"center"}>
        {content}
      </TableCell>
    );
  };

  return (
    <AutoSizer>
      {({ width, height }) => (
        <>
          <Table
            width={width}
            height={height}
            headerHeight={props.headerHeight ? props.headerHeight : 48}
            rowHeight={props.rowHeight ? props.rowHeight : 48}
            rowCount={props.list.length}
            rowGetter={({ index }) => props.list[index]}
            rowClassName={({ index }) => {
              return index !== -1 ? "tableRowHover" : "";
            }}>
            {props.columns
              .sort((a, b) => a.tableData.columnOrder - b.tableData.columnOrder)
              .map((columnDef, index) => {
                const {
                  label,
                  dataKey,
                  width,
                  type,
                  flexGrow,
                  editable,
                  sortable,
                  tableData
                } = columnDef;

                return (
                  <Column
                    key={`virtualized-column-${index}`}
                    label={label}
                    dataKey={dataKey}
                    width={width}
                    flexGrow={flexGrow}
                    headerRenderer={headerProps => headerRenderer({ ...headerProps })}
                    cellRenderer={cellProps => cellRenderer({ ...cellProps })}
                    columnData={{ editable, sortable, tableData }}
                  />
                );
              })}

            <Column
              key={`virtualized-column-edit`}
              label={``}
              dataKey={``}
              width={150}
              headerRenderer={headerProps => headerRenderer({ ...headerProps })}
              cellRenderer={cellProps => actionRenderer({ ...cellProps })}
              columnData={{ tableData: { key: "edit" } }}
            />
          </Table>
        </>
      )}
    </AutoSizer>
  );
};

export default MuiVirtualizedTable;
