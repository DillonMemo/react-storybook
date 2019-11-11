import React, { useState, useMemo } from "react";
import { Column, Table, AutoSizer } from "react-virtualized";
import update from "immutability-helper";
import { Paper } from "@material-ui/core";
import Faker from "faker";

import MuiVirtualizedTable from "./MuiVirtualizedTable";

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
const listColumns = [
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

const VirtualizedTable = () => {
  const [lists, setLists] = useState<List[]>(useMemo(() => list, []));
  /**
   * Applies updates to an card in th collection
   * @param id - row data id
   * @param updates - 업데이트할 property와 value
   */
  const rowUpdate = (id: string | number, updates: { prop: string; value: string | number }) => {
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
  return (
    <>
      <Paper style={{ height: 400, width: "100%", marginTop: 20 }}>
        <MuiVirtualizedTable
          headerHeight={48}
          rowHeight={48}
          list={lists}
          columns={listColumns}
          rowUpdate={rowUpdate}
        />
      </Paper>
    </>
  );
};

export default VirtualizedTable;
