import { IProps, Column, Query, QueryResult } from "../types";

export default class DataManager implements IProps<object> {
  currentPage = 0;
  orderBy = -1;
  orderDirection: "" | "asc" | "desc" = "";
  pageSize = 5;
  paging = true;
  parentFunc = null;
  searchText = "";
  selectedCount = 0;

  data: any[] = [];
  columns: Column<object>[] = [];

  filteredData: any[] = [];
  searchedData: any[] = [];
  groupedData: any[] = [];
  treefiedData: any[] = [];
  sortedData: any[] = [];

  filtered = false;
  searched = false;
  grouped = false;
  treefied = false;
  sorted = false;
  paged = false;

  constructor() {}

  setData = (
    data: object[] | ((query: Query<object>) => Promise<QueryResult<object>>)
  ) => {
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

  /**
   * @description - 특정 Row의 데이터셋중 하나의 키를 찾아 결과값 가져오기.
   * @param rowData - 한개 row의 데이터셋
   * @param columnDef - 한개 column의 데이터 셋
   * @param lookup - 한개 column의 데이터 셋의 Lookup
   * @example {
   * rowData = {index: 2, name: "Donut", calories: 452, fat: 25, tableData: {…}}calories: 452fat: 25index: 2name: "Donut"tableData: {id: 1}__proto__: Object
   * columnDef = {title: "번호", field: "index", tableData: {…}}
   * }
   */
  getFieldValue = (
    rowData: any[string | number],
    columnDef: any,
    lookup = true
  ) => {
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
      this.filterData();
    }

    if (this.searched === false) {
      this.searchData();
    }

    // if (this.grouped === false && this.isDataType("group")) {
    //   this.groupData();
    // }

    // if (this.treefied === false && this.isDataType("tree")) {
    //   this.treefyData();
    // }

    if (this.sorted === false) {
      this.sortData();
    }

    // if (this.paged === false) {
    //   this.pageData();
    // }

    return {
      columns: this.columns,
      currentPage: this.currentPage,
      sortedData: this.sortedData,
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

  filterData = () => {
    this.searched = this.grouped = this.treefied = this.sorted = this.paged = false;

    this.filteredData = [...this.data];

    // filter 기능 핸들러 생성 예정.

    this.filtered = true;
  };

  searchData = () => {
    this.grouped = this.treefied = this.sorted = this.paged = false;

    this.searchedData = [...this.filteredData];

    // search 기능 생성 핸들러 생성 예정.

    this.searched = true;
  };

  isDataType = (type: string) => {
    let dataType = "normal";

    if (this.parentFunc) {
      dataType = "tree";
    } else if (this.columns.find(a => a.tableData.groupOrder > -1)) {
      dataType = "group";
    }

    return type === dataType;
  };

  /**
   * @tutorial - 결과가 -1 이면 DESC, 1 이면 ASC
   * @param a - 첫번째 sort 비교 인자
   * @param b - 두번째 sort 비교 인자
   * @param type - sorting되는 column의 타입
   */
  sort = <K extends number>(
    a: K,
    b: K,
    type?: { [x: number]: string }
  ): number => {
    if (type === "numeric") {
      return a - b;
    } else {
      if (a !== b) {
        if (!a) return -1;
        if (!b) return 1;
      }
      return a < b ? -1 : a > b ? 1 : 0;
    }
  };

  /**
   * @description - 특정 컬럼만 Sorting을 줄 것인지 아니면 모든 컬럼에 솔팅을 주는것인지를 판단하고 Sort 이벤트 실행
   * @param list - Sorting에 필요한 데이터들 > searchedData에서 가져옴. (filteredData -> searchedData)
   * @example list.sort((a,b) => console.log('a', a["index"], 'b', b["index"], 'type', columnDef && columnDef.type)) => 예제 결과 a 2 b 1 type {title: "번호", field: "index", tableData: {…}}
   */
  sortList = <K extends any>(list: K[]) => {
    const columnDef = this.columns.find(_ => _.tableData.id === this.orderBy);
    let result = list;

    if (columnDef && columnDef.costomSort) {
      // ...
    } else {
      result = list.sort(
        this.orderDirection === "desc"
          ? (a, b) =>
              this.sort(
                this.getFieldValue(b, columnDef),
                this.getFieldValue(a, columnDef),
                columnDef && columnDef.type
              )
          : (a, b) =>
              this.sort(
                this.getFieldValue(a, columnDef),
                this.getFieldValue(b, columnDef),
                columnDef && columnDef.type
              )
      );
    }

    return result;
  };

  sortData = () => {
    this.paged = false;

    if (this.isDataType("group")) {
      // ...
    } else if (this.isDataType("tree")) {
      // ...
    } else if (this.isDataType("normal")) {
      this.sortedData = [...this.searchedData];
      if (this.orderBy != -1) {
        this.sortedData = this.sortList(this.sortedData);
      }
    }

    this.sorted = true;
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
