import React from "react";
import { CustomTableProps } from "../utils";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel
} from "@material-ui/core";
// Materail UI

const MTableHeader: React.FunctionComponent<any> = props => {
  const renderHeader = (): JSX.Element => {
    console.log("Table Header props", props);

    const mapArr = props.columns
      .filter(
        (columnDef: any) =>
          !columnDef.hidden && !(columnDef.table.groupOrder > -1)
      )
      .sort(
        (a: any, b: any) => a.tableData.columnOrder - b.tableData.columnOrder
      )
      .map((columnDef: any, index: number) => {
        let content = columnDef.title;

        if (columnDef.sorting !== false && props.sorting) {
          content = (
            <TableSortLabel
              IconComponent={props.icons.SortArrow}
              active={props.orderBy === columnDef.tableData.id}
              direction={props.orderDirection || "asc"}
              onClick={() => {
                const orderDirection =
                  columnDef.tableData.id !== props.orderBy
                    ? "asc"
                    : props.orderDirection === "asc"
                    ? "desc"
                    : props.orderDirection === "desc"
                    ? ""
                    : props.orderDirection === ""
                    ? "asc"
                    : "desc";
                props.onOrderChange(columnDef.tableData.id, orderDirection);
              }}>
              {content}
            </TableSortLabel>
          );
        }

        return <TableCell>{content}</TableCell>;
      });

    return mapArr;
  };
  const headers = renderHeader();
  return (
    <TableHead>
      <TableRow>{headers}</TableRow>
    </TableHead>
  );
};

export default MTableHeader;
