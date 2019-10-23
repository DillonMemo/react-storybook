import React, { useState } from "react";
import xlsx from "xlsx";

import TableElement from "../Tables/TableElement";
import FileInput from "../Inputs/FileInput";
import { LinearProgress } from "@material-ui/core";

interface IProps {}
interface IDataProps {
  index: string;
  SerialNumbers: string;
}

const Test: React.FunctionComponent<IProps> = props => {
  // Data Table variable
  const columns = [
    {
      title: "No.",
      field: "index"
    },
    {
      title: "유효",
      field: "name"
    },
    {
      title: "신규 시리얼 No.",
      field: "SerialNumbers"
    }
  ];
  const [dataSet, setDataSet] = useState<IDataProps[]>([
    {
      index: "1",
      SerialNumbers: "12345"
    },
    {
      index: "2",
      SerialNumbers: "12346"
    },
    {
      index: "3",
      SerialNumbers: "12347"
    },
    {
      index: "4",
      SerialNumbers: "12348"
    },
    {
      index: "5",
      SerialNumbers: "12349"
    },
    {
      index: "6",
      SerialNumbers: "12350"
    },
    {
      index: "7",
      SerialNumbers: "12351"
    },
    {
      index: "8",
      SerialNumbers: "12352"
    },
    {
      index: "9",
      SerialNumbers: "12353"
    },
    {
      index: "10",
      SerialNumbers: "12354"
    },
    {
      index: "11",
      SerialNumbers: "12355"
    },
    {
      index: "12",
      SerialNumbers: "12356"
    },
    {
      index: "13",
      SerialNumbers: "12357"
    }
  ]);
  const [percentage, setPercentage] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    try {
      const Files = e.currentTarget.files;
      if (Files) {
        debugger;
        const File = Files[0];
        const FileName = File.name;

        reader.readAsArrayBuffer(Files[0]);

        reader.onload = e => {
          const result = new Uint8Array((e as any).currentTarget.result);
          const wb = xlsx.read(result, { type: "array" });
          wb.SheetNames.map((d, index) => {
            let toCSV = xlsx.utils.sheet_to_csv(wb.Sheets[d]);
            if (toCSV.includes("No.,시리얼 등록")) {
              toCSV = toCSV.replace("No.,시리얼 등록", "index,SerialNumbers");
            }
            let toJson: any[] = JSON.parse(CsvToJson(toCSV));
            toJson.pop();

            if (dataSet) {
              setDataSet([...dataSet, ...toJson]);
            } else {
              setDataSet(toJson);
            }
          });
        };
      }
    } catch (error) {
      console.error("handleFileChange error \n", error);
      throw error;
    }
  };

  const handlePercentageChange = async (): Promise<void> => {};
  return (
    <div>
      <FileInput Id="ReadExcel" Name="ReadExcel" Accept=".xls, .xlsx" onChange={handleFileChange} />
      <TableElement
        columns={columns}
        data={dataSet}
        stickyHeader
        options={{
          sorting: true,
          maxBodyHeight: "65vh",
          isProgress: true,
          tableFontSize: "1em",
          tablePadding: "20px 10px"
        }}
      />
      <LinearProgress variant="determinate" value={percentage} style={{ height: 15 }} />
    </div>
  );
};

const CsvToJson = (file: string): any => {
  const lines = file.split("\n");

  const result = [];

  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    const obj: any = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }

    result.push(obj);
  }

  const resultString = JSON.stringify(result);
  return resultString;
};

export default Test;
