import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Column, Options, Components } from "../types";

interface IProps {
  columns: Column<object>[];
  components: Components;
  data: object;
  getFieldValue?: (
    rowData: any[string | number],
    columnDef: any,
    lookup?: boolean
  ) => any;
  index: number;
  options: Options;
  onRowClick: () => void;
}

const getFieldValue = (rowData: {}, columnDef: any, lookup = true) => {
  debugger;
  // let value = columnDef &&
  //     typeof rowData[columnDef.field] !== "undefined"
  //       ? rowData[columnDef.field]
  //       : byString(rowData, columnDef.field);
  //   if (columnDef.lookup && lookup) {
  //     value = columnDef.lookup[value];
  //   }

  //   return value;
  return "getFieldValue test";
};

const Table_Body_Row: React.FunctionComponent<IProps> = props => {
  const renderColumns = (): JSX.Element => {
    const size = getElementSize();
    const mapArr = props.columns
      .filter(
        columnDef =>
          !columnDef.hidden &&
          !(columnDef.tableData && columnDef.tableData.groupOrder > -1)
      )
      .sort((a, b) =>
        a.tableData && b.tableData
          ? a.tableData.groupOrder - b.tableData.groupOrder
          : 0
      )
      .map((columnDef, index) => {
        debugger;
        const value = getFieldValue(props.data, columnDef);

        return value;
      });

    console.log("renderColumns map", mapArr);

    return <TableCell>test</TableCell>;
  };

  const getElementSize = () => {
    return props.options.padding === "default" ? "medium" : "small";
  };

  return (
    <>
      <TableRow>{renderColumns()}</TableRow>
    </>
  );
};

Table_Body_Row.defaultProps = {};

export default Table_Body_Row;
