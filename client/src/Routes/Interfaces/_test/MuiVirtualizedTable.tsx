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
  rowUpdate: (id: string | number, updates: any) => void;
  sorting: (orderBy: number, orderDirection: "asc" | "desc" | "") => void;
}

interface dataManager {
  orderBy: number;
  orderDirection: "asc" | "desc" | "";
}

const MuiVirtualizedTable: React.FunctionComponent<IProps> = props => {
  const _table = useRef(null);
  const [editDatas, setEditDatas] = useState<any[]>(useMemo(() => [], []));
  const [renderState, setRenderState] = useState<dataManager>(
    useMemo<dataManager>(
      () => ({
        orderBy: -1,
        orderDirection: ""
      }),
      []
    )
  );

  /**
   * order 변경 from column
   * @param orderBy - order by header column
   * @param orderDirection - "asc" | "desc" | ""
   */
  const onChangeOrder = (orderBy: number, orderDirection: typeof renderState.orderDirection) => {
    const newOrderBy = orderDirection === "" ? -1 : orderBy;

    setRenderState({ orderBy: newOrderBy, orderDirection });

    props.sorting(newOrderBy, orderDirection);
  };

  /**
   * set a card to the edit card
   * @param rowData - row data
   */
  const setEdit = (rowData: List) => (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("setEdit rowData :", rowData);
    const reEditDatas: List[] = editDatas;
    let index = reEditDatas.findIndex(data => {
      return data.id === rowData.id;
    });

    console.log("setEdit index :", index);
    if (index === -1) {
      let card: List = {
        id: rowData.id,
        product: rowData.product,
        productMaterial: rowData.productMaterial
      };
      let newEdit = [...reEditDatas, card];
      setEditDatas(newEdit);

      props.rowUpdate(rowData.id, { prop: "isEdit", value: true });
    }
  };

  /**
   * get a card from the edit card
   * @param id - edit 배열에서 특정 값 찾을 id
   */
  const getEdit = (id: number | string) => {
    const reEditDatas: List[] = editDatas;
    let index = reEditDatas.findIndex(data => data.id === id);

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
    console.log("updateEdit :", id, dataKey, e.target.value);

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
    console.log("saveEdit", id);
    const reEditDatas: List[] = editDatas;
    let index = reEditDatas.findIndex(data => data.id === id);

    if (index !== -1) {
      let updates: List = {
        id,
        product: reEditDatas[index].product,
        productMaterial: reEditDatas[index].productMaterial,
        isEdit: false
      };

      props.rowUpdate(reEditDatas[index].id, updates);

      // edit mode 제거
      let newEdit = reEditDatas.slice(index + 1);

      setEditDatas(newEdit);
    }
  };

  /**
   * cancel on edit of a row
   * @param id - a row id
   */
  const cancelEdit = (id: number | string) => (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("cancelEdit", id);

    const editData: List[] = editDatas;
    let index = editData.findIndex(data => data.id === id);

    if (index !== -1) {
      props.rowUpdate(editData[index].id, { prop: "isEdit", value: false });

      let newEdit = editData.slice(index + 1);

      setEditDatas(newEdit);
    }
  };

  /**
   * 테이블 헤더 랜더링
   * @param headerProps - virtualized header props
   */
  const headerRenderer = (headerProps: TableHeaderProps): JSX.Element => {
    console.log("headerRenderer headerProps :", headerProps);
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
        component="div"
        className={``}
        variant="head"
        style={{
          height: 48,
          display: "flex",
          flex: 1,
          boxSizing: "border-box",
          alignItems: "center",
          fontWeight: "bold"
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
    console.log("cellRenderer cellprops :", cellProps);
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

    // if (cellProps.columnData.editable)
    return (
      <TableCell
        component="div"
        variant="body"
        style={{
          height: 48,
          display: "flex",
          flex: 1,
          boxSizing: "border-box",
          alignItems: "center"
        }}
        align={"center"}>
        {content}
      </TableCell>
    );
  };

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
            ref={_table}
            width={width}
            height={height}
            headerHeight={props.headerHeight!}
            rowHeight={props.rowHeight!}
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
                    label={label}
                    dataKey={dataKey}
                    width={width}
                    flexGrow={flexGrow}
                    headerRenderer={headerProps => headerRenderer({ ...headerProps })}
                    cellRenderer={cellProps => cellRenderer({ ...cellProps })}
                    columnData={{
                      editable,
                      sortable,
                      tableData
                    }}
                  />
                );
              })}

            <Column
              label={``}
              dataKey={``}
              width={150}
              headerRenderer={headerProps => headerRenderer({ ...headerProps })}
              cellRenderer={cellProps => actionRenderer({ ...cellProps })}
            />
          </Table>
        </>
      )}
    </AutoSizer>
  );
};

export default MuiVirtualizedTable;
