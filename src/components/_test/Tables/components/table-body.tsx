import React, { useState } from "react";
import { TableBody, TableRow, TableCell } from "@material-ui/core";
import { Column, Options } from "../types";

interface IProps {
  components?: object;
  columns: Column<object>[];
  detailPanel?: () => void | (object | (() => void))[];
  options?: Options;
  localization?: { emptyDataSourceMessage?: string; filterRow?: object; editRow?: object };
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

  return (
    <TableBody>
      {/* <TableRow>
        <TableCell>test</TableCell>
      </TableRow> */}
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
