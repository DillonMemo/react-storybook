import React from "react";
import { Column, Table, AutoSizer } from "react-virtualized";
import { Paper } from "@material-ui/core";

import MuiVirtualizedTable from "./MuiVirtualizedTable";

export interface Data {
  calories: number;
  carbs: number;
  dessert: string;
  fat: number;
  id: number;
  protein: number;
}
type Sample = [string, number, number, number, number];

const sample: Sample[] = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9]
];

const rows: Data[] = [];

for (let i = 0; i < 30000; i++) {
  const renderSelection: Sample = sample[Math.floor(Math.random() * sample.length)];
  const createData = (
    id: number,
    dessert: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
  ): Data => ({ id, dessert, calories, fat, carbs, protein });
  rows.push(createData(i, ...renderSelection));
}

const columns = [
  {
    width: 200,
    flexGrow: 1.0,
    label: "Dessert",
    dataKey: "dessert"
  },
  {
    width: 120,
    label: "Calories\u00A0(g)",
    dataKey: "calories",
    type: "numeric"
  },
  {
    width: 120,
    label: "Fat\u00A0(g)",
    dataKey: "fat",
    type: "numeric"
  },
  {
    width: 120,
    label: "Carbs\u00A0(g)",
    dataKey: "carbs",
    type: "numeric"
  },
  {
    width: 120,
    label: "Protein\u00A0(g)",
    dataKey: "protein",
    type: "numeric"
  }
];

const VirtualizedTable = () => {
  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <MuiVirtualizedTable
        columns={columns}
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
      />
    </Paper>
  );
};

export default VirtualizedTable;
