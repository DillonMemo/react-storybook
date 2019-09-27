import React, { useState } from "react";
import xlsx from "xlsx";

// Material UI
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  FormControlLabel,
  Switch
} from "@material-ui/core";

// Utils
import { CsvToJson } from "../../utils/ConvertCSV";
import FileInput from "../MyUI/Inputs/FileInput";

interface IProps {
  children?: string;
  stickyHeader?: boolean;
  dense?: boolean;
  onClick?: (e: any) => void;
}

type Column = { title: string; field: string };

const ReadFileTable: React.FunctionComponent<IProps> = props => {
  const [dense, setDense] = useState<boolean>(false);

  const [columns, setColumns] = useState<Column[]>([
    { title: "No.", field: "no" },
    { title: "시리얼", field: "serial" }
  ]);
  const [data, setData] = useState<any[]>();

  const classes = useStyles();

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (event.target.files) {
      const File = event.target.files[0];
      const FileName = File.name;

      reader.readAsArrayBuffer(event.target.files[0]);

      reader.onload = e => {
        const result = new Uint8Array((e as any).target.result);
        const wb = xlsx.read(result, { type: "array" });
        wb.SheetNames.map((d, index) => {
          const toCSV = xlsx.utils.sheet_to_csv(wb.Sheets[d]);

          const toJson: any[] = JSON.parse(CsvToJson(toCSV));

          // 마지막 쓰레기 배열 제거
          toJson.pop();
          if (data) {
            setData(data.concat(toJson));
          } else {
            setData(toJson);
          }
        });
      };
    }
  };

  console.log("column", columns, typeof columns);
  console.log("data", data, typeof data);

  return (
    <div className={classes.wrapper}>
      <h3 onClick={props.onClick}>{props.children}</h3>
      <div style={{ width: "100%" }}>
        <FileInput
          Name="ReadExcel"
          Id="ReadExcel"
          Accept=".xls, .xlsx"
          WrapperBackgroundColor="#dfe6e9"
          labelColor="black"
          labelOpacity={1}
          onChange={handleChange}
        />
      </div>
      <section style={{ width: "100%" }}>
        <Paper className={classes.root}>
          <Table
            className={classes.table}
            size={dense ? "small" : "medium"}
            stickyHeader={true}>
            <TableHead>
              <TableRow>
                <TableCell align="center">No.</TableCell>
                <TableCell align="center">시리얼</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">1</TableCell>
                <TableCell align="center">123456</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">123457</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">3</TableCell>
                <TableCell align="center">123458</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">4</TableCell>
                <TableCell align="center">123459</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">5</TableCell>
                <TableCell align="center">123460</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">6</TableCell>
                <TableCell align="center">123461</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">7</TableCell>
                <TableCell align="center">123462</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">8</TableCell>
                <TableCell align="center">123463</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">9</TableCell>
                <TableCell align="center">123464</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="center">10</TableCell>
                <TableCell align="center">123465</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
        <FormControlLabel
          style={{ marginTop: 10, marginLeft: 0 }}
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense Padding"
        />
      </section>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      overflowX: "auto"
    },
    root: {
      width: "100%",
      marginTop: 10,
      overflowX: "auto",
      height: 200
    },
    table: {
      minWidth: 100
    }
  })
);

export default ReadFileTable;
