import React, { useState } from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Column, Options } from "../types";

interface IProps {
  components?: object;
  columns: Column<object>[];
  detailPanel?: () => void | (object | (() => void))[];
  options?: Options;
  localization?: {
    emptyDataSourceMessage?: string;
    filterRow?: object;
    editRow?: object;
  };
  originalData: any[];
  pageSize: number;
}

const Tabel_Body: React.ComponentType<IProps> = props => {
  console.log("TableBody props", props);

  const renderEmpty = (emptyRowCount: number, originalData: any[]) => {
    try {
      if (props.options) {
        const rowHeight = props.options.padding === "default" ? 49 : 36;
        const localization = {
          ...props.localization
        };

        if (originalData.length === 0) {
          return (
            <TableRow key={"empty-" + 0} style={{}}>
              <TableCell
                style={{ paddingTop: 0, paddingBottom: 0, textAlign: "center" }}
                colSpan={props.columns.length}
                key="empty-"></TableCell>
            </TableRow>
          );
        } else if (props.options && props.options.emptyRowsWhenPaging) {
          return (
            <React.Fragment>
              {[...Array(emptyRowCount)].map((r, index) => (
                <TableRow
                  style={{ height: rowHeight }}
                  key={"empty-" + index}
                />
              ))}
              {emptyRowCount > 0 && (
                <TableRow style={{ height: 1 }} key={"empty-last1"} />
              )}
            </React.Fragment>
          );
        }
      }
    } catch (error) {
      console.warn(error.message);
      throw error;
    }
  };

  // rows data
  const [originalData, setoriginalData] = useState<any[]>(props.originalData);
  // 남은 Row 개수 ex) pagesize : 5인데 data row는 2개 일경우 남은 row는 3개 - 아직 페이징 사용 안하고 생성만 해둠.
  const [emptyRowCount, setEmptyRowCount] = useState<number>(0);
  if (props.options && props.options.paging) {
    setEmptyRowCount(props.pageSize - (originalData ? originalData.length : 0));
  }
  const groups = props.columns
    .filter(col => col.tableData && col.tableData.groupOrder > -1)
    .sort((col1, col2) =>
      col1.tableData && col2.tableData
        ? col1.tableData.groupOrder - col2.tableData.groupOrder
        : 0
    );

  console.log("groups.length", groups.length);

  return (
    <TableBody>
      {/* column(header)의 그룹이 하나라도 지정되면 renderGroupedRow 이벤트 실행 그룹이 하나도 없다면 renderUngroupedRows 이벤트 실행!! */}
      {/* {groups.length
        ? renderGroupedRows(groups, originalData)
        : renderUngroupedRows(renderData)} */}
      {renderEmpty(emptyRowCount, originalData)}
    </TableBody>
  );
};

(Tabel_Body.defaultProps as IProps) = {
  columns: [],
  originalData: [],
  pageSize: 5,
  localization: {
    emptyDataSourceMessage: "데이터가 없습니다.",
    filterRow: {},
    editRow: {}
  }
};

export default Tabel_Body;
