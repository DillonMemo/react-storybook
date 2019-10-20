import React, { useState } from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Column, Options, Components } from "../types";
import { CSSProperties } from "@material-ui/styles";
import { Check, Remove } from "@material-ui/icons";

interface IProps<RowDatas extends object> {
  components: Components;
  columns: Column<object>[];
  options: Options;
  localization: {
    emptyDataSourceMessage: string;
    filterRow: object;
    editRow: object;
  };
  renderData: RowDatas[];
  pageSize: number;
  getFieldValue: (rowData: any, columnDef: any, lookup?: boolean) => any;
}

const Tabel_Body: React.ComponentType<IProps<any>> = props => {
  // console.log("TableBody props", props);

  /**
   * 데이터가 비었음을 나타내는 이벤트 핸들러
   * @param emptyRowCount - (pageSize - renderData.length)
   * @param renderData - 데이터 셋
   */
  const renderEmpty = (emptyRowCount: number, renderData: any[]) => {
    try {
      if (props.options) {
        const rowHeight = props.options.padding === "default" ? 49 : 36;
        const localization: typeof props.localization = {
          ...props.localization
        };
        // console.log("Tabel_Body renderEmpty", localization);
        if (renderData.length === 0) {
          return (
            <TableRow key={"empty-" + 0} style={{}}>
              <TableCell
                style={{
                  paddingTop: 0,
                  paddingBottom: 0,
                  textAlign: "center",
                  fontSize: props.options && props.options.tableFontSize
                }}
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

  const renderUngroupedRows = (renderData: typeof props.renderData) => {
    try {
      return renderData.map((rowData, index) => {
        if (rowData.tableData && rowData.tableData.editing) {
        } else {
          if (props.components) {
            return (
              <props.components.BodyRow
                key={
                  rowData.tableData
                    ? `key-${rowData.tableData.id}`
                    : `not found tableData`
                }
                rowData={rowData}
                index={index}
                components={props.components}
                level={0}
                options={props.options}
                columns={props.columns}
                getFieldValue={props.getFieldValue}
                // onRowClick={props.onRowClick}
              />
            );
          } else {
            console.warn(
              "Table_Body renderUnGroupedRows : 지정된 컴포넌트 데이터가 없습니다."
            );
          }
        }
      });
    } catch (error) {
      console.warn(error);
      throw error;
    }
  };

  /**
   * Group 설정모드인 Rows 랜더링 이벤트 핸들러
   * @param groups - 그룹 설정된 Columns
   * @param renderData - Row 데이터 셋
   */
  const renderGroupedRows = (groups: Column<object>[], renderData: any[]) => {
    console.log("renderGroupedRows", groups, renderData);
  };

  // 남은 Row 개수 ex) pagesize : 5인데 data row는 2개 일경우 남은 row는 3개 - 아직 페이징 사용 안하고 생성만 해둠.
  const [emptyRowCount, setEmptyRowCount] = useState<number>(0);
  if (props.options && props.options.paging) {
    setEmptyRowCount(
      props.pageSize - (props.renderData ? props.renderData.length : 0)
    );
  }

  const groups = props.columns
    .filter(col => col.tableData && col.tableData.groupOrder > -1)
    .sort((col1, col2) =>
      col1.tableData && col2.tableData
        ? col1.tableData.groupOrder - col2.tableData.groupOrder
        : 0
    );

  return (
    <TableBody>
      {/* column(header)의 그룹이 하나라도 지정되면 renderGroupedRow 이벤트 실행 그룹이 하나도 없다면 renderUngroupedRows 이벤트 실행!! */}
      {groups.length
        ? renderGroupedRows(groups, props.renderData)
        : renderUngroupedRows(props.renderData)}
      {renderEmpty(emptyRowCount, props.renderData)}
    </TableBody>
  );
};

export default Tabel_Body;
