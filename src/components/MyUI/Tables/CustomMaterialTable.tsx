import React, { useState, Children } from "react";

/* Material Table Components */
import Table from "@material-ui/core/Table";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";

import { defaultProps } from "./utils/default-props";
import { MaterialTableProps } from "./utils";

interface IProps<RowData extends object> {
  columns: Column<RowData>[];
  data: any;
}

interface Column<RowData extends object> {
  disableClick?: boolean;
  field?: keyof RowData;
  filtering?: boolean;
  filterPlaceholder?: string;
  filterCellStyle?: React.CSSProperties;
  grouping?: boolean;
  headerStyle?: React.CSSProperties;
  hidden?: boolean;
  initialEditValue?: any;
  lookup?: object;
  editable?:
    | "always"
    | "onUpdate"
    | "onAdd"
    | "never"
    | ((columnDef: Column<RowData>, rowData: RowData) => boolean);
  removable?: boolean;
  title?: string | React.ReactElement<any>;
  type?:
    | "string"
    | "boolean"
    | "numeric"
    | "date"
    | "datetime"
    | "time"
    | "currency";
}

export default (props: any) => (
  <CustomMaterialTable {...props} ref={props.tableRef} />
);

const CustomMaterialTable: React.FunctionComponent<IProps<object>> = props => {
  console.log("props", props);
  return (
    <div>
      <h1>Custom Material Table</h1>
    </div>
  );
};

CustomMaterialTable.defaultProps = defaultProps;

// export default CustomMaterialTable;

// const test = ((props: MaterialTableProps)=> <CustomMaterialTable {...props} ref={props.tableRef} />)

// const Demo = () => {
//   const [data, setData] = useState([
//     {
//       id: 1,
//       name: "A1",
//       surname: "B",
//       isMarried: true,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 0,
//       sex: "Male",
//       type: "adult",
//       insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
//       time: new Date(1900, 1, 1, 14, 23, 35)
//     },
//     {
//       id: 2,
//       name: "A2",
//       surname: "B",
//       isMarried: false,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 34,
//       sex: "Female",
//       type: "adult",
//       insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
//       time: new Date(1900, 1, 1, 14, 23, 35),
//       parentId: 1
//     },
//     {
//       id: 3,
//       name: "A3",
//       surname: "B",
//       isMarried: true,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 34,
//       sex: "Female",
//       type: "child",
//       insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
//       time: new Date(1900, 1, 1, 14, 23, 35),
//       parentId: 1
//     },
//     {
//       id: 4,
//       name: "A4",
//       surname: "Dede",
//       isMarried: true,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 34,
//       sex: "Female",
//       type: "child",
//       insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
//       time: new Date(1900, 1, 1, 14, 23, 35),
//       parentId: 3
//     },
//     {
//       id: 5,
//       name: "A5",
//       surname: "C",
//       isMarried: false,
//       birthDate: new Date(1987, 1, 1),
//       birthCity: 34,
//       sex: "Female",
//       type: "child",
//       insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
//       time: new Date(1900, 1, 1, 14, 23, 35)
//     },
//     {
//       id: 6,
//       name: "A6",
//       surname: "C",
//       isMarried: true,
//       birthDate: new Date(1989, 1, 1),
//       birthCity: 34,
//       sex: "Female",
//       type: "child",
//       insertDateTime: new Date(2018, 1, 1, 12, 23, 44),
//       time: new Date(1900, 1, 1, 14, 23, 35),
//       parentId: 5
//     }
//   ]);

//   const [columns, setColumns] = useState([
//     { title: "Adı", field: "name", filterPlaceholder: "Adı filter" },
//     { title: "Soyadı", field: "surname", initialEditValue: "test" },
//     { title: "Evli", field: "isMarried", type: "boolean" },
//     { title: "Cinsiyet", field: "sex", disableClick: true, editable: "onAdd" },
//     { title: "Tipi", field: "type", removable: false, editable: "never" },
//     { title: "Doğum Yılı", field: "birthDate", type: "date" },
//     {
//       title: "Doğum Yeri",
//       field: "birthCity",
//       lookup: { 34: "İstanbul", 0: "Şanlıurfa" }
//     },
//     { title: "Kayıt Tarihi", field: "insertDateTime", type: "datetime" },
//     { title: "Zaman", field: "time", type: "time" }
//   ]);

//   return (
//     <div>
//       <CustomMaterialTable columns={columns} data={data} />
//     </div>
//   );
// };
