import React, { useState, useEffect, forwardRef } from "react";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";
import { ArrowUpward } from "@material-ui/icons";
import { Column } from "../types";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import { IconProps } from "@material-ui/core/Icon";

interface IProps {
  columns: Column<object>[];
  dataCount?: number;
  selectedCount?: number;
  sorting?: boolean;
  orderBy?: number;
  orderDirection?: "" | "asc" | "desc";
  onChangeOrder?: (orderBy?: number, orderDirection?: "" | "asc" | "desc") => void;
}

const Table_Header: React.FunctionComponent<IProps> = props => {
  console.log("TableHeader props", props);

  // useEffect(() => {
  //   setHeader(renderHeader());
  // }, []);

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
        const tableIcons = {
          SortArrow: forwardRef<any, {}>((props, ref) => <ArrowUpward {...props} ref={ref} />)
        };
        if (columnDef.sorting !== false && props.sorting && columnDef.tableData) {
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

  const [headers, setHeaders] = useState(renderHeader());
  debugger;
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
  sorting: true
};

export default Table_Header;
