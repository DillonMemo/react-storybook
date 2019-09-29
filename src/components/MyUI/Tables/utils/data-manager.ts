import { Column } from ".";

export default class DataManager {
  selectedCount: number = 0;

  data: any[] = [];
  columns: any[] = [];

  filtered: boolean = false;

  constructor() {}

  /**
   * Data 설정
   * @param data - init Data field
   */
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

  /**
   * Columns 설정
   * @param columns - init Columns field
   */
  setColumns = (columns: Column<object>[]) => {
    this.columns = columns.map((columnDef: any, index: number) => {
      columnDef.tableData = {
        columnOrder: index,
        filterValue: columnDef.defaultFilter,
        groupOrder: columnDef.defaultGroupOrder,
        groupSort: columnDef.defaultGroupSort || "asc",
        ...columnDef.tableData,
        id: index
      };
      return columnDef.tableData;
    });
  };

  getRenderState = () => {
    return {
      columns: this.columns,
      data: this.data
    };
  };
}
