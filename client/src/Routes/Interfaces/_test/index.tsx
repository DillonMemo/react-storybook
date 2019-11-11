import React, { useState, useMemo } from "react";
import { Paper } from "@material-ui/core";
import Faker from "faker";

import MuiVirtualizedTable from "./MuiVirtualizedTable";
import { values } from "d3";

// Data - 1
export interface List {
  id: number | string;
  product: string;
  productMaterial: string;
  isEdit?: boolean;
}
type listSample = [number, string, string];
const list: List[] = [];
for (let i = 0; i < 30000; i++) {
  list.push({
    id: i,
    product: Faker.commerce.product(),
    productMaterial: Faker.commerce.productMaterial(),
    isEdit: false
  });
}

export interface ColumnData {
  dataKey: string;
  flexGrow?: number;
  label: string;
  type?: string | "numeric";
  width: number;
  editable?: boolean;
  sortable?: boolean;
  tableData: {
    columnOrder: number;
    id: number;
  };
}

let listColumns: any[] = [
  {
    width: 120,
    label: "ID",
    dataKey: "id",
    type: "numeric"
  },
  {
    width: 200,
    flexGrow: 1.0,
    label: "Product",
    dataKey: "product",
    editable: true
  },
  {
    width: 200,
    flexGrow: 1.0,
    label: "ProductMaterial",
    dataKey: "productMaterial",
    editable: true
  }
];

const setColumns = (columns: any[]): ColumnData[] => {
  return listColumns.map((columnDef, index) => ({
    ...columnDef,
    sortable: true,
    tableData: {
      ...columnDef.tableData,
      columnOrder: index,
      id: index
    }
  }));
};

const VirtualizedTable = () => {
  const [cols, setCols] = useState<ColumnData[]>(useMemo(() => setColumns(listColumns), []));
  const [lists, setLists] = useState<List[]>(useMemo(() => list, []));

  /**
   * Applies updates to an card in th collection
   * @param id - row data id
   * @param updates - 업데이트할 property와 value
   */
  const rowUpdate = (
    id: string | number,
    updates: { prop: string; value: string | number } | any
  ) => {
    console.log("update", id, updates);

    // defining method variables
    let collection = undefined;

    let index = lists.findIndex(data => data.id === id);

    // 찾은 index 검사
    if (index !== -1) {
      if (Object.keys(updates).length > 2) {
        console.log("update", updates);

        let newData = Object.assign(lists[index], updates);

        collection = [...lists.slice(0, index), { ...newData }, ...lists.slice(index + 1)];
      } else {
        // prop, value 업데이트
        let { prop, value } = updates;

        // 업데이트 적용
        collection = [
          ...lists.slice(0, index),
          { ...lists[index], [prop]: value },
          ...lists.slice(index + 1)
        ];
      }

      console.log("rowUpdate", collection);

      setLists(collection);
    }
  };

  const sorting = (orderBy: number, orderDirection: "asc" | "desc" | "") => {
    const getValue = (rowData: any[string | number], columnDef: ColumnData) => {
      let value =
        columnDef.dataKey && typeof rowData[columnDef.dataKey] !== "undefined"
          ? rowData[columnDef.dataKey]
          : "";
      return value;
    };
    let result = lists.sort();

    if (orderBy !== -1) {
      const columnDef: ColumnData = cols.find(col => col.tableData.id === orderBy)!;

      result = lists.sort(
        orderDirection === "desc"
          ? (a, b) => sort(getValue(b, columnDef), getValue(a, columnDef), columnDef.type)
          : (a, b) => sort(getValue(a, columnDef), getValue(b, columnDef), columnDef.type)
      );
    }

    setLists(result);
  };

  /**
   * @tutorial - 결과가 -1 이면 DESC, 1 이면 ASC
   * @param a - 첫번째 sort 비교 인자
   * @param b - 두번째 sort 비교 인자
   * @param type - sorting되는 column의 타입
   */
  const sort = <K extends number>(a: any, b: K, type?: { [x: number]: string }): number => {
    if (type === "numeric") {
      return a - b;
    } else {
      if (a !== b) {
        if (!a) return -1;
        if (!b) return 1;
      }
    }
    return a < b ? -1 : a > b ? 1 : 0;
  };

  return (
    <>
      <Paper style={{ height: 400, width: "100%", marginTop: 20 }}>
        <MuiVirtualizedTable
          headerHeight={48}
          rowHeight={48}
          list={lists}
          columns={cols}
          rowUpdate={rowUpdate}
          sorting={sorting}
        />
      </Paper>
    </>
  );
};

export default VirtualizedTable;
