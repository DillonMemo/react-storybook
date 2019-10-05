import React from "react";
import { TableRow, TableCell } from "@material-ui/core";
import { Column, Options, Components } from "../types";

interface IProps {
  columns: Column<object>[];
  components: Components;
  data: any;
  index: number;
  options: Options;
  onRowClick: () => void;
  getFieldValue: (rowData: any[string | number], columnDef: any, lookup?: boolean) => any;
}

const Table_Body_Row: React.FunctionComponent<IProps> = props => {
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
        const value = props.getFieldValue(props.data, columnDef);

        return (
          <props.components.Cell
            key={`Cell-${props.data.tableData && props.data.tableData.id}-${columnDef.tableData &&
              columnDef.tableData.id}`}
            size={size}
            columnDef={columnDef}
            value={value}
            rowData={props.data}
          />
        );
      });

    console.log("renderColumns map", mapArr);

    return mapArr;
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
