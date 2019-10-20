import React from "react";
import { IconProps } from "@material-ui/core/Icon";

export interface IProps<RowData extends object> {
  columns: Column[];
  components?: Components;
  data: RowData[] | ((query: Query<RowData>) => Promise<QueryResult<RowData>>);
  detailPanel?:
    | ((rowData: RowData) => React.ReactNode)
    | (DetailPanel<RowData> | ((rowData: RowData) => DetailPanel<RowData>))[];
  // icons?: Icons;
  localization?: Localization;
  options?: Options;
  onRowClick?: (
    event?: React.MouseEvent,
    rowData?: RowData,
    toggleDetailPanel?: (panelIndex?: number) => void
  ) => void;
  stickyHeader?: boolean;
  isLoading?: boolean;
  title?: string | React.ReactElement<any>;
  onOrderChange?: (
    orderBy: number,
    orderDirection: "asc" | "desc" | ""
  ) => void;
  style?: React.CSSProperties;
}

export interface Column<RowData extends object> {
  currencySetting?: {
    locale?: string;
    currencyCode?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  };
  costomSort?: (
    data1: RowData,
    data2: Rowdata,
    type: "row" | "group"
  ) => number;
  defaultSort?: "asc" | "desc";
  emptyValue?:
    | string
    | React.ReactElement<any>
    | ((data: any) => React.ReactElement<any> | string);
  field?: keyof RowData;
  hidden?: boolean;
  render?: (data: RowData, type: "row" | "group") => any;
  sorting?: boolean;
  tableData: {
    columnOrder: number;
    filterValue?: any;
    groupOrder?: any;
    groupSort?: string;
    id: number;
  };
  title?: string | React.ReactElement<any>;
  type?:
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
}

export interface Components {
  Body?: React.ComponentType<any> | React.FunctionComponent<any> | any;
  BodyRow?: React.ComponentType<any> | React.FunctionComponent<any> | any;
  Cell?: React.ComponentType<any> | React.FunctionComponent<any> | any;
  Header?: React.ComponentType<any> | React.FunctionComponent<any> | any;
}

export interface Icons {
  SortArrow?: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
}

export interface Localization {
  body?: {
    emptyDataSourceMessage?: string;
    filterRow?: {
      filterTooltip?: string;
    };
    editRow?: {
      saveTooltip?: string;
      cancelTooltip?: string;
      deleteText?: string;
    };
  };
}
export interface Options {
  emptyRowsWhenPaging?: boolean;
  header?: boolean;
  maxBodyHeight?: number | string;
  padding?: "default" | "dense";
  paging?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  rowHover?: boolean;
  sorting?: boolean;
  tableFontSize?: number | string;
  tablePadding?: number | string;
}
export interface Query<RowData extends object> {
  filters: Filter<RowData>[];
  page: number;
  pageSize: number;
  search: string;
  orderBy?: Column<RowData>;
  orderDirection: "asc" | "desc" | "";
  totalCount: number;
}
export interface QueryResult<RowData extends object> {
  data: RowData[];
  page: number;
  totalCount: number;
}
