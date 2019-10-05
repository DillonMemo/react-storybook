import { IProps, Column, Query, QueryResult } from "../types";

export default class DataManager implements IProps<object> {
  currentPage = 0;
  orderBy = -1;
  orderDirection = "";
  pageSize = 5;
  paging = true;
  searchText = "";
  selectedCount = 0;

  data: any[] = [];
  columns: Column<object>[] = [];

  filtered = false;
  sorted = false;

  constructor() {}

  setData = (data: object[] | ((query: Query<object>) => Promise<QueryResult<object>>)) => {
    this.selectedCount = 0;

    this.data = (data as any[]).map((row, index) => {
      row.tableData = { ...row.tableData, id: index };
      if (row.tableData.checked) {
        this.selectedCount++;
      }
      return row;
    });

    this.filtered = false;
  };

  setColumns(columns: any[]) {
    this.columns = columns.map((columnDef, index) => {
      columnDef.tableData = {
        columnOrder: index,
        filterValue: columnDef.defaultFilter,
        groupOrder: columnDef.defaultGroupOrder,
        groupSort: columnDef.defaultGroupSort || "asc",
        ...columnDef.tableData,
        id: index
      };
      return columnDef;
    });
  }

  changeOrder = (orderBy: number, orderDirection: "" | "asc" | "desc") => {
    this.orderBy = orderBy;
    this.orderDirection = orderDirection;

    this.currentPage = 0;

    this.sorted = false;
  };

  getFieldValue = (rowData: any[string | number], columnDef: any, lookup = true) => {
    let value =
      columnDef.field && typeof rowData[columnDef.field] !== "undefined"
        ? rowData[columnDef.field]
        : byString(rowData, columnDef.field);

    // if (columnDef.lookup && lookup) {
    //   value = columnDef.lookup[value];
    // }

    return value;
  };

  getRenderState = () => {
    if (this.filtered === false) {
      // this.filterData();
    }

    // if (this.searched === false) {
    //   this.searchData();
    // }

    // if (this.grouped === false && this.isDataType("group")) {
    //   this.groupData();
    // }

    // if (this.treefied === false && this.isDataType("tree")) {
    //   this.treefyData();
    // }

    if (this.sorted === false) {
      // this.sortData();
    }

    // if (this.paged === false) {
    //   this.pageData();
    // }

    return {
      columns: this.columns,
      currentPage: this.currentPage,
      // data: this.sortedData,
      // lastEditingRow: this.lastEditingRow,
      orderBy: this.orderBy,
      orderDirection: this.orderDirection,
      originalData: this.data,
      pageSize: this.pageSize,
      // renderData: this.pagedData,
      searchText: this.searchText,
      selectedCount: this.selectedCount
      // treefiedDataLength: this.treefiedDataLength,
      // treeDataMaxLevel: this.treeDataMaxLevel
    };
  };
}

export const byString = (o: any[string | number], s: string) => {
  if (!s) {
    return;
  }

  s = s.replace(/\[(\w+)\]/g, ".$1"); // 인덱스를 속성으로 변환
  s = s.replace(/^\./, ""); // '.' 제거

  var a: string[] = s.split(".");
  for (var i = 0, n = a.length; i < n; ++i) {
    var x: string = a[i];
    if (o && x in o) {
      o = o[x];
    } else {
      return;
    }
  }
  return o;
};
