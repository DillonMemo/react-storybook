import React, { useState, useEffect } from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";
import { Column } from "../types";

interface IProps {
  columns: Column<object>[];
  dataCount?: number;
  selectedCount?: number;
  sorting?: boolean;
}

const Table_Header: React.FunctionComponent<IProps> = props => {
  console.log("TableHeader props", props);
  const [header, setHeader] = useState();

  useEffect(() => {
    setHeader(renderHeader());
  }, []);

  const renderHeader = (): JSX.Element[] => {
    /// Filter 여부 확인 후 Sorting(default: columnOrder를 기준으로 ASC) 그다음 elements 생성
    const mapArr = props.columns
      .filter(
        columnDef =>
          !columnDef.hidden && !(columnDef.tableData && columnDef.tableData.groupOrder > -1)
      )
      .sort((a, b) =>
        a.tableData && b.tableData ? a.tableData.columnOrder - b.tableData.columnOrder : 0
      )
      .map((columnDef, index) => {
        let content = columnDef.title;
        // console.log("columnDef sort", columnDef.sorting, "props.sort", props.sorting);
        if (columnDef.sorting !== false && props.sorting) {
          content = <TableSortLabel>{content}</TableSortLabel>;
        }

        return (
          <TableCell
            key={columnDef.tableData && columnDef.tableData.id}
            align={
              ["numeric"].indexOf(columnDef.type ? columnDef.type : "undefined") !== -1
                ? "right"
                : "left"
            }
            className=""
            style={{}}>
            {content}
          </TableCell>
        );
      });

    return mapArr;
  };

  return (
    <TableHead>
      <TableRow>{header}</TableRow>
    </TableHead>
  );
};

(Table_Header.defaultProps as IProps) = {
  columns: [],
  dataCount: 0,
  selectedCount: 0,
  sorting: true
};

export default Table_Header;
