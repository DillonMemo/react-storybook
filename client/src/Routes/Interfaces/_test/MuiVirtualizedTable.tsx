import React from "react";
import {
  AutoSizer,
  Table,
  ColumnSizer,
  Column,
  TableHeaderProps,
  TableCellProps
} from "react-virtualized";
import { Data } from ".";
import { TableCell } from "@material-ui/core";
import { MdModeEdit } from "react-icons/md";

interface ColumnData {
  dataKey: string;
  flexGrow?: number;
  label: string;
  type?: string | "numeric";
  width: number;
}

interface Row {
  index: number;
}

interface IProps {
  columns: ColumnData[];
  headerHeight?: number;
  onRowClick?: () => void;
  rowCount: number;
  rowGetter: (row: Row) => Data;
  rowheight?: number;
}
const MuiVirtualizedTable: React.FunctionComponent<IProps> = props => {
  const headerRenderer = (headerProps: TableHeaderProps): JSX.Element => {
    return (
      <TableCell
        component="div"
        className={``}
        variant="head"
        style={{
          height: 48,
          display: "flex",
          flex: 1,
          boxSizing: "border-box",
          alignItems: "center",
          fontWeight: "bold"
        }}
        align={"center"}>
        <span>{headerProps.label}</span>
      </TableCell>
    );
  };

  const cellRenderer = (cellProps: TableCellProps): JSX.Element => {
    return (
      <TableCell
        component="div"
        variant="body"
        style={{
          height: 48,
          display: "flex",
          flex: 1,
          boxSizing: "border-box",
          alignItems: "center"
        }}
        align={"center"}>
        {cellProps.cellData}
      </TableCell>
    );
  };
  return (
    <AutoSizer>
      {({ width, height }) => (
        <>
          <Table
            ref="Table"
            width={width}
            height={height - 48}
            headerHeight={48}
            rowHeight={props.rowheight ? props.rowheight : 48}
            rowCount={props.rowCount}
            rowGetter={props.rowGetter}
            rowClassName={({ index }) => {
              return index !== -1 ? "tableRowHover" : "";
            }}
            onRowClick={info => console.log(info)}>
            <Column
              label="Id"
              dataKey="id"
              width={50}
              headerRenderer={headerProps => headerRenderer({ ...headerProps })}
              cellRenderer={cellProps => cellRenderer({ ...cellProps })}
            />
            {props.columns.map((data, index) => {
              const { label, dataKey, width, type, flexGrow } = data;

              return (
                <Column
                  label={label}
                  dataKey={dataKey}
                  width={width}
                  flexGrow={flexGrow}
                  headerRenderer={headerProps => headerRenderer({ ...headerProps })}
                  cellRenderer={cellProps => cellRenderer({ ...cellProps })}
                />
              );
            })}
            <Column
              label={``}
              dataKey={``}
              width={80}
              headerRenderer={headerProps => (
                <TableCell
                  component="div"
                  className={``}
                  variant="head"
                  style={{
                    height: 48,
                    display: "flex",
                    flex: 1,
                    boxSizing: "border-box",
                    alignItems: "center",
                    fontWeight: "bold"
                  }}
                  align={"center"}></TableCell>
              )}
              cellRenderer={cellProps => (
                <TableCell
                  component="div"
                  className={``}
                  variant="head"
                  style={{
                    height: 48,
                    display: "flex",
                    flex: 1,
                    boxSizing: "border-box",
                    alignItems: "center",
                    fontWeight: "bold"
                  }}
                  align={"center"}>
                  <button
                    type="button"
                    className={`baseBtn doneBtn colorInherit`}
                    onClick={() =>
                      alert(`${cellProps.rowIndex} : ${JSON.stringify(cellProps.rowData)}`)
                    }>
                    <MdModeEdit key={cellProps.rowIndex} style={{ width: 20, height: 20 }} />
                  </button>
                </TableCell>
              )}
            />
          </Table>
          <div
            style={{
              height: 48,
              width,
              flex: "flex",
              boxSizing: "border-box",
              alignItems: "center"
            }}>
            <span>TEST</span>
          </div>
        </>
      )}
    </AutoSizer>
  );
};

export default MuiVirtualizedTable;
