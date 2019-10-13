import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Column, Options, Components } from "../types";

interface IProps<RowData extends any> {
  columns: Column<object>[];
  components: Components;
  rowData: RowData | any;
  index: number;
  options: Options;
  getFieldValue: (rowData: any, columnDef: any, lookup?: boolean) => any;
}

const Table_Body_Row: React.FunctionComponent<IProps<object>> = props => {
  console.log("Table_Body_Row props :", props);

  const renderColumns = (): JSX.Element[] => {
    const size = getElementSize();
    const mapArr = props.columns
      .filter(
        columnDef =>
          !columnDef.hidden && !(columnDef.tableData && columnDef.tableData.groupOrder > -1)
      )
      .sort((a, b) =>
        a.tableData && b.tableData ? a.tableData.groupOrder - b.tableData.groupOrder : 0
      )
      .map((columnDef, index) => {
        const value = props.getFieldValue(props.rowData, columnDef);

        return (
          <props.components.Cell
            key={`Cell-${props.rowData.tableData &&
              props.rowData.tableData.id}-${columnDef.tableData && columnDef.tableData.id}`}
            size={size}
            columnDef={columnDef}
            value={value}
            rowData={props.rowData}
          />
        );
      });

    return mapArr;
  };

  const getElementSize = () => {
    return props.options.padding === "default" ? "medium" : "small";
  };

  const onClickHandler = (rowData: typeof props.rowData) => (event: React.MouseEvent<unknown>) => {
    alert(JSON.stringify(rowData));
  };

  return (
    <>
      <TableRow hover={props.options.rowHover} onClick={onClickHandler(props.rowData)}>
        {renderColumns()}
      </TableRow>
    </>
  );
};

export default Table_Body_Row;
