import React, { useState, useMemo, useCallback } from "react";
import { TableCell, TableRow, Paper, Table, TableHead, TableBody } from "@material-ui/core";
import { CSSProperties } from "@material-ui/styles";
import { MdCheckBoxOutlineBlank, MdIndeterminateCheckBox, MdCheckBox } from "react-icons/md";

import { Column, IProps, Query, QueryResult } from "./types";
import { byString } from "./utils/data-manager";

const isRemoteData = (props?: IProps<object>) => !Array.isArray(props && props.data);

const defaultColumns = [
  {
    title: "No.",
    field: "index"
  },
  {
    title: "유효",
    field: "name",
    type: "boolean"
  },
  {
    title: "신규 시리얼 No.",
    field: "SerialNumbers"
  }
];
const setDefaultColumns = (columns: any[]) => {
  console.log("setDefaultColumns :", columns);
  return columns.map((columnDef, index) => {
    columnDef.tableData = {
      columnOrder: index,
      filterValue: columnDef.defaultFilter,
      groupOrder: columnDef.defaultGroupOrder,
      groupSort: columnDef.defaultGroupSort || "asc",
      ...columnDef.tableData,
      id: index
    };
    return columnDef;
  });
};

const defaultData = [
  {
    index: "1",
    name: true,
    SerialNumbers: "12345"
  },
  {
    index: "2",
    name: false,
    SerialNumbers: "12346"
  },
  {
    index: "3",
    SerialNumbers: "12347"
  }
];
const setDefaultData = (
  data: object[] | ((query: Query<object>) => Promise<QueryResult<object>>)
) => {
  console.log("setDefaultData :", data);
  let selectedCount = 0;

  return (data as any[]).map((row, index) => {
    row.tableData = { ...row.tableData, id: index };
    if (row.tableData.checked) {
      selectedCount++;
    }
    return row;
  });
};

const Demo = () => {
  const [columns, setColumns] = useState(useMemo(() => setDefaultColumns(defaultColumns), []));
  const [data, setData] = useState<any[]>(useMemo(() => setDefaultData(defaultData), []));
  const [word, setWord] = useState("");

  const handleClick = useCallback(() => {
    const addData = setDefaultData([...data, { index: data.length + 1, SerialNumbers: word }]);
    // const addData = setDefaultData([...data, { index: (data.length + 1).toString(), SerialNumbers: word }];
    console.log("handleClick :", addData);

    setData(addData);
    setWord("");
  }, [word]);

  return (
    <>
      <input
        type="text"
        name="serialNumberTxt"
        id="serialNumberTxt"
        value={word}
        onChange={useCallback(({ target: { value } }) => setWord(value), [word])}
        placeholder="Serial Number"
      />
      <button onClick={handleClick}>+</button>
      <div style={{ width: "50%" }}>
        <TestTable columns={columns} data={data} />
      </div>
    </>
  );
};

const getFieldValue = (rowData: any[string | number], columnDef: any, lookup = true) => {
  let value =
    columnDef.field && typeof rowData[columnDef.field] !== "undefined"
      ? rowData[columnDef.field]
      : byString(rowData, columnDef.field);

  // if (columnDef.lookup && lookup) {
  //   value = columnDef.lookup[value];
  // }

  return value;
};

interface ITableProps {
  columns: Column<any>[];
  data: any[];
}

const TestTable: React.FunctionComponent<ITableProps> = props => {
  const renderHeader = useMemo(() => {
    console.log("renderHeader", props.columns);
    return props.columns
      .filter(columnDef => !columnDef.hidden && !(columnDef.tableData.groupOrder > -1))
      .sort((a, b) =>
        a.tableData && b.tableData ? a.tableData.columnOrder - b.tableData.columnOrder : 0
      )
      .map((columnDef, index) => {
        let content = columnDef.title;

        return (
          <TableCell key={index} padding={true ? "default" : "none"} style={{ fontSize: "1em" }}>
            {content}
          </TableCell>
        );
      });
  }, [props.columns]);

  const renderBody = useMemo(() => {
    try {
      // const onClickHandler = (rowData: any) => (event: React.MouseEvent<unknown>) => {
      //   alert(JSON.stringify(rowData));
      // };
      const onClickHandler = (rowData: any) => (e: React.MouseEvent<unknown>) => {
        alert(JSON.stringify(rowData));
      };

      const getRenderValue = (columnDef: Column<any>, rowData: any, value: string) => {
        if (columnDef.emptyValue !== undefined && (value === undefined || value === null)) {
          // Get EmptyValue
          if (typeof columnDef.emptyValue === "function") {
            return columnDef.emptyValue(rowData);
          } else {
            return columnDef.emptyValue;
          }
        }
        if (columnDef.type === "boolean") {
          const style: CSSProperties = {
            textAlign: "left",
            verticalAlign: "middle",
            width: 20,
            height: 20
          };
          const element =
            value === undefined ? (
              <></>
            ) : Boolean(value) ? (
              <MdCheckBox />
            ) : (
              <MdIndeterminateCheckBox />
            );
          return element;
        } else {
          return value;
        }
      };

      return props.data.map((rowData, idx) => {
        if (rowData.tableData && rowData.tableData.editing) {
        } else {
          console.log(`${idx}번째 RowData :`, rowData);
          return (
            <TableRow
              key={rowData.tableData ? `key-${rowData.tableData.id}` : `not found tableData`}
              hover
              onClick={onClickHandler(rowData)}>
              {props.columns
                .filter(
                  columnDef =>
                    !columnDef.hidden &&
                    !(columnDef.tableData && columnDef.tableData.groupOrder > -1)
                )
                .sort((a, b) =>
                  a.tableData && b.tableData ? a.tableData.groupOrder - b.tableData.groupOrder : 0
                )
                .map((columnDef, index) => {
                  const value = getFieldValue(rowData, columnDef);
                  console.log(`${idx}의 ${index}번째 :`, value);
                  return (
                    <TableCell
                      key={`Cell-${rowData.tableData &&
                        rowData.tableData.id}-${columnDef.tableData && columnDef.tableData.id}`}
                      style={{ fontSize: "1em" }}>
                      {getRenderValue(columnDef, rowData, value)}
                    </TableCell>
                  );
                })}
            </TableRow>
          );
        }
      });
    } catch (error) {
      console.error("renderBody error \n", error);
      throw error;
    }
  }, [props.data]);

  return (
    <Paper>
      <Table stickyHeader>
        {props.columns && (
          <TableHead>
            <TableRow>{renderHeader}</TableRow>
          </TableHead>
        )}
        {props.data && <TableBody>{renderBody}</TableBody>}
      </Table>
    </Paper>
  );
};

export default Demo;
