export default class DataManager {
  data = [];
  columns = [];

  constructor() {}

  setData(data: any) {
    console.log(data);
    // this.selectedCount = 0;

    // this.data = data.map((row, index) => {
    //     row.tableData = {...row.tableData, id: index};

    //     if(row.tableData.checked) {

    //     }
    // })
  }

  setColumns(columns: any) {
    console.log(columns);
  }
}
