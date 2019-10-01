import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Column, Options, Components } from "../types";

interface IProps {
  columns: Column<object>[];
  components: Components;
  data: object;
  index: number;
  options: Options;
  onRowClick: () => void;
}

const Table_Body_Row: React.FunctionComponent<IProps> = props => {
  const renderColumns = () => {
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
        console.log("renderColumns map", columnDef, index);
      });
  };

  const getElementSize = () => {
    return props.options.padding === "default" ? "medium" : "small";
  };
  return (
    <>
      <TableRow>
        {/* renderColumns */}
        <TableCell>Test</TableCell>
      </TableRow>
    </>
  );
};

Table_Body_Row.defaultProps = {};

export default Table_Body_Row;
