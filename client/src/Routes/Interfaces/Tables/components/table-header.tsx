import React, { useState, useEffect, forwardRef } from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";
import { Column, Options } from "../types";

interface IProps {
  classes: Record<"visuallyHidden", string>;
  columns: Column<object>[];
  sorting: boolean;
  options: Options;
  orderBy: number;
  orderDirection: "" | "asc" | "desc";
  onOrderChange: (orderBy: number, orderDirection: "" | "asc" | "desc") => void;
}

const Table_Header: React.FunctionComponent<IProps> = props => {
  // console.log("TableHeader props", props);

  const renderHeader = () => {
    const mapArr = props.columns
      .filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) =>
        a.tableData && b.tableData ? a.tableData.columnOrder - b.tableData.columnOrder : 0
      )
      .map((columnDef, index) => {
        let content = columnDef.title;

        if (columnDef.sorting !== false && props.sorting && columnDef.tableData) {
          content = (
            <TableSortLabel
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
              {props.orderBy === columnDef.tableData.id ? (
                <span className={props.classes.visuallyHidden}>
                  {props.orderDirection === "asc"
                    ? "sorted ascending"
                    : props.orderDirection === "desc"
                    ? "sorted descending"
                    : "not working"}
                </span>
              ) : null}
            </TableSortLabel>
          );
        }

        return (
          <TableCell
            key={columnDef.tableData.id}
            align={
              ["numeric"].indexOf(columnDef.type ? columnDef.type : "undefined") !== -1
                ? "right"
                : "left"
            }
            padding={true ? "default" : "none"}
            style={{ fontSize: props.options && props.options.tableFontSize }}>
            {content}
          </TableCell>
        );
      });

    return mapArr;
  };
  // Checkbox 모두선택 이벤트
  // if(props.hasSelection){}
  return (
    <TableHead>
      <TableRow>{renderHeader()}</TableRow>
    </TableHead>
  );
};

export default Table_Header;
