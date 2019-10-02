import { Column } from "../types";

export default class DataManager {
  // Init Variable
  selectedCount = 0;

  // row data
  data: any[] = [];
  columns: any[] = [];

  // row data
  pagedData: any[] = [];
  // row data
  renderData: any[] = [];

  filtered = false;

  setData = (data: any) => {
    this.selectedCount = 0;

    this.data = data.map((row: any, index: number) => {
      row.tableData = { ...row.tableData, id: index };
      if (row.tableData.checked) {
        this.selectedCount++;
      }

      return row;
    });

    this.filtered = false;
  };

  setColumns = (columns: any[]) => {
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
  };

  getRenderState = () => {
    return {
      columns: this.columns,
      originalData: this.data,
      renderData: this.renderData
    };
  };
}

export const setDataManager = (data: any) => {
  let selectedCount = 0;

  data = data.map((row: any, index: number) => {
    row.tableData = { ...row.tableData, id: index };
    if (row.tableData.checked) {
      selectedCount++;
    }

    return row;
  });

  // const filtered = false;

  return data;
};

export const setColumnsManager = (columns: any[]) => {
  columns = columns.map((columnDef, index) => {
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
  return columns;
};

export const getFieldValue = (
  rowData: any[string | number],
  columnDef: Column<object>,
  lookup: boolean = true
) => {
  debugger;
  // columnDef.fiel
  // let value = columnDef &&
  //     typeof rowData[columnDef.field] !== "undefined"
  //       ? rowData[columnDef.field]
  //       : byString(rowData, columnDef.field);
  //   if (columnDef.lookup && lookup) {
  //     value = columnDef.lookup[value];
  //   }

  //   return value;
  return "getFieldValue test";
};

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
