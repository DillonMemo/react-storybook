import React from "react";
import { TableCell } from "@material-ui/core";

interface IProps {}

const Table_Cell: React.FunctionComponent<IProps> = props => {
  console.log("Table_Cell props", props);
  return <TableCell>test</TableCell>;
};

Table_Cell.defaultProps = {};

export default Table_Cell;
