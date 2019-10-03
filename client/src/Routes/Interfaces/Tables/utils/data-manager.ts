import { Column } from "../types";

// export default class DataManager {
//   setDataManager = (data: any) => {
//     let selectedCount = 0;

//     data = data.map((row: any, index: number) => {
//       row.tableData = { ...row.tableData, id: index };
//       if (row.tableData.checked) {
//         selectedCount++;
//       }

//       return row;
//     });

//     // const filtered = false;

//     return data;
//   };

//   setColumnsManager = (columns: any[]) => {
//     columns = columns.map((columnDef, index) => {
//       columnDef.tableData = {
//         columnOrder: index,
//         filterValue: columnDef.defaultFilter,
//         groupOrder: columnDef.defaultGroupOrder,
//         groupSort: columnDef.defaultGroupSort || "asc",
//         ...columnDef.tableData,
//         id: index
//       };
//       return columnDef;
//     });
//     return columns;
//   };

//   getFieldValue = (rowData: any[string | number], columnDef: any, lookup: boolean = true) => {
//     debugger;

//     return "getFieldValue test";
//   };
// }

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
  columnDef: any,
  lookup: boolean = true
) => {
  let value =
    columnDef.field && typeof rowData[columnDef.field] !== "undefined"
      ? rowData[columnDef.field]
      : byString(rowData, columnDef.field);

  //     if (columnDef.lookup && lookup) {
  //   value = columnDef.lookup[value];
  // }

  return value;
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
