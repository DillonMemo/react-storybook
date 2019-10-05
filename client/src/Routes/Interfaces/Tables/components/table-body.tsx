import React, { useState } from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Column, Options, Components } from "../types";

interface IProps {
  components?: Components;
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
  getFieldValue?: () => void;
  onRowClick?: () => void;
}

const Tabel_Body: React.ComponentType<IProps> = props => {
  console.log("TableBody props", props);

  /**
   * 데이터가 비었음을 나타내는 이벤트 핸들러
   * @param emptyRowCount - (pageSize - originalData.length)
   * @param originalData - 데이터 셋
   */
  const renderEmpty = (emptyRowCount: number, originalData: any[]) => {
    try {
      if (props.options) {
        const rowHeight = props.options.padding === "default" ? 49 : 36;
        const localization: typeof props.localization = {
          ...props.localization
        };
        console.log("Tabel_Body renderEmpty", localization);
        if (originalData.length === 0) {
          return (
            <TableRow key={"empty-" + 0} style={{}}>
              <TableCell
                style={{ paddingTop: 0, paddingBottom: 0, textAlign: "center" }}
                colSpan={props.columns.length}
                key="empty-">
                {localization.emptyDataSourceMessage}
              </TableCell>
            </TableRow>
          );
        } else if (props.options && props.options.emptyRowsWhenPaging) {
          return (
            <React.Fragment>
              {[...Array(emptyRowCount)].map((r, index) => (
                <TableRow style={{ height: rowHeight }} key={"empty-" + index} />
              ))}
              {emptyRowCount > 0 && <TableRow style={{ height: 1 }} key={"empty-last1"} />}
            </React.Fragment>
          );
        }
      }
    } catch (error) {
      console.warn(error.message);
      throw error;
    }
  };

  /**
   * Group 설정모드가 아닌 Rows 랜더링 이벤트 핸들러
   * @param originalData - 데이터 셋
   */
  const renderUngroupedRows = (originalData: any[]) => {
    try {
      return originalData.map((data: any, index: number) => {
        if (data.tableData && data.tableData.editing) {
          // editrow ...
          return;
        } else {
          if (props.components) {
            return (
              <props.components.BodyRow
                key={data.tableData ? `key-${data.tableData.id}` : `not found tableData`}
                data={data}
                index={index}
                components={props.components}
                level={0}
                options={props.options}
                columns={props.columns}
                getFieldValue={props.getFieldValue}
                onRowClick={props.onRowClick}
              />
            );
          } else {
            console.warn("Table_Body renderUngroupedRows : 지정된 컴포넌트 데이터가 없습니다.");
          }
        }
      });
    } catch (error) {
      console.warn(error.message);
      throw error.message;
    }
  };

  /**
   * Group 설정모드인 Rows 랜더링 이벤트 핸들러
   * @param groups - 그룹 설정된 Columns
   * @param originalData - Row 데이터 셋
   */
  const renderGroupedRows = (groups: Column<object>[], originalData: any[]) => {
    console.log("renderGroupedRows", groups, originalData);
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
      col1.tableData && col2.tableData ? col1.tableData.groupOrder - col2.tableData.groupOrder : 0
    );

  console.log("groups.length", groups.length);

  return (
    <TableBody>
      {/* column(header)의 그룹이 하나라도 지정되면 renderGroupedRow 이벤트 실행 그룹이 하나도 없다면 renderUngroupedRows 이벤트 실행!! */}
      {groups.length ? renderGroupedRows(groups, originalData) : renderUngroupedRows(originalData)}
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
