export interface IProps<RowData extends object> {
  //   columns: Column<RowData>[];
  columns: Column[];
  components?: Components;
  data: RowData[] | ((query: Query<RowData>) => Promise<QueryResult<RowData>>);
  detailPanel?:
    | ((rowData: RowData) => React.ReactNode)
    | (DetailPanel<RowData> | ((rowData: RowData) => DetailPanel<RowData>))[];
  localization?: Localization;
  options?: Options;
  onRowClick?: (
    event?: React.MouseEvent,
    rowData?: RowData,
    toggleDetailPanel?: (panelIndex?: number) => void
  ) => void;
  stickyHeader?: boolean;
}

export interface Column<RowData extends object> {
  field?: keyof RowData;
  hidden?: boolean;
  sorting?: boolean;
  tableData?: {
    columnOrder: number;
    filterValue?: any;
    groupOrder?: any;
    groupSort?: string;
    id: number;
  };
  title?: string | React.ReactElement<any>;
  type?: "string" | "boolean" | "numeric" | "date" | "datetime" | "time" | "currency";
}

export interface Components {
  Body?: React.ComponentType<any> | React.FunctionComponent<any> | any;
  BodyRow?: React.ComponentType<any> | React.FunctionComponent<any> | any;
  Cell?: React.ComponentType<any> | React.FunctionComponent<any> | any;
  Header?: React.ComponentType<any> | React.FunctionComponent<any> | any;
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
  sorting?: boolean;
}
export interface Query<RowData extends object> {}
export interface QueryResult<RowData extends object> {
  data: RowData[];
  page: number;
  totalCount: number;
}
