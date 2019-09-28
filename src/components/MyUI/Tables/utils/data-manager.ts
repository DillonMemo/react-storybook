export default class DataManager {
  selectedCount: number = 0;

  data: any[] = [];
  columns: any[] = [];

  constructor() {}

  setData(data: any[]) {
    this.selectedCount = 0;

    this.data = data.map((row: any, index: number) => {
      row.tableData = { ...row.tableData, id: index };
      if (row.tableData.checked) {
        this.selectedCount++;
      }
      return row;
    });
  }

  setColumns(columns: any[]) {
    this.columns = columns.map((columnDef: any, index: number) => {
      columnDef.tableData = {};
    });
  }
}
