import React, { Ref, ReactElement, PropsWithChildren } from "react";
import { Table_Header, Table_Body, Table_Body_Row, Table_Cell } from "../components";
import { IProps } from "../types";

export const defaultProps: IProps<object> = {
  columns: [],
  components: {
    Body: Table_Body,
    BodyRow: Table_Body_Row,
    Cell: Table_Cell,
    Header: Table_Header
  },
  data: [],
  isLoading: false,
  localization: {
    body: {
      filterRow: {},
      editRow: {
        saveTooltip: "Save",
        cancelTooltip: "Cancel",
        deleteText: "행을 삭제 하시겠습니까?"
      }
    }
  },
  options: {
    emptyRowsWhenPaging: true,
    header: true,
    isProgress: false,
    padding: "default",
    paging: false,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20],
    sorting: true,
    rowHover: true
  },
  stickyHeader: false
  //   style: { }
};
