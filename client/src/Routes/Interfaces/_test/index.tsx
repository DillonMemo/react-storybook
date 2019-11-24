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

  return (
    <>
      <Paper style={{ height: 400, width: "100%", marginTop: 20 }}>
        <MuiVirtualizedTable
          headerHeight={48}
          rowHeight={48}
          list={lists}
          updateData={(data: List[]) => setLists(data)}
          columns={cols}
        />
      </Paper>
    </>
  );
};

export default VirtualizedTable;
