import React, { useState, useEffect, forwardRef } from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel
} from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import { Column } from "../types";

interface IProps {
  classes?: Record<"visuallyHidden", string>;
  columns: Column<object>[];
  dataCount?: number;
  selectedCount?: number;
  sorting: boolean;
  orderBy: number;
  orderDirection: "" | "asc" | "desc";
  onOrderChange?: (
    orderBy?: number,
    orderDirection?: "" | "asc" | "desc"
  ) => void;
}

const Table_Header: React.FunctionComponent<IProps> = props => {
  console.log("TableHeader props", props);

  const createSortHandler = (property: number) => (
    event: React.MouseEvent<unknown>
  ) => {
    const orderDirection =
      property !== props.orderBy
        ? "asc"
        : props.orderDirection === "asc"
        ? "desc"
        : props.orderDirection === "desc"
        ? ""
        : props.orderDirection === ""
        ? "asc"
        : "desc";

    props.onOrderChange && props.onOrderChange(property, orderDirection);
  };

  const renderHeader = (): JSX.Element[] => {
    /// Filter 여부 확인 후 Sorting(default: columnOrder를 기준으로 ASC) 그다음 elements 생성
    const mapArr = props.columns
      .filter(
        columnDef =>
          !columnDef.hidden &&
          !(columnDef.tableData && columnDef.tableData.groupOrder > -1)
      )
      .sort((a, b) =>
        a.tableData && b.tableData
          ? a.tableData.columnOrder - b.tableData.columnOrder
          : 0
      )
      .map((columnDef, index) => {
        let content = columnDef.title;
        const tableIcons: any = {
          SortArrow: forwardRef<any, {}>((props, ref) => (
            <ArrowUpward {...props} ref={ref} />
          ))
        };
        if (
          columnDef.sorting !== false &&
          props.sorting &&
          columnDef.tableData
        ) {
          debugger;
          content = (
            <TableSortLabel
              IconComponent={tableIcons.SortArrow}
              active={props.orderBy === columnDef.tableData.id}
              direction={props.orderDirection || "asc"}
              onClick={createSortHandler(columnDef.tableData.id)}>
              {content}
              {props.orderBy === columnDef.tableData.id ? (
                <span className={props.classes && props.classes.visuallyHidden}>
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
            key={columnDef.tableData && columnDef.tableData.id}
            align={
              ["numeric"].indexOf(
                columnDef.type ? columnDef.type : "undefined"
              ) !== -1
                ? "right"
                : "left"
            }
            padding={true ? "default" : "none"}
            className=""
            style={{}}>
            {content}
          </TableCell>
        );
      });

    return mapArr;
  };

  const [headers, setHeaders] = useState(renderHeader());
  // Checkbox 모두선택 이벤트
  // if(props.hasSelection){}
  return (
    <TableHead>
      <TableRow>{headers}</TableRow>
    </TableHead>
  );
};

(Table_Header.defaultProps as IProps) = {
  columns: [],
  dataCount: 0,
  selectedCount: 0,
  sorting: true,
  orderBy: -1,
  orderDirection: ""
};

export default Table_Header;
