import React, { useState } from "react";
import { Paper, Table } from "@material-ui/core";
import { IProps } from "./types";
import { defaultProps } from "./utils/default-props";
import { setColumnsManager, setDataManager } from "./utils/data-manager";

const isRemoteData = (props: IProps<object>) => !Array.isArray(props.data);

const TestTable: React.FunctionComponent<IProps<object>> = props => {
  console.log("TestTable props", props);

  const [columns, setColumns] = useState(setColumnsManager(props.columns));
  const [originalData, setOriginalData] = useState(
    isRemoteData(props) ? [] : setDataManager(props.data)
  );

  return (
    <div>
      <h1>YapTV 공용 Table Component 라이브러리</h1>
      <Paper>
        <Table stickyHeader={props.stickyHeader}>
          {props.options && props.options.header && props.components && (
            <props.components.Header
              components={props.components}
              columns={props.columns}
              sorting={props.options.sorting}
            />
          )}
          {props.components && (
            <props.components.Body
              columns={columns}
              originalData={originalData}
              options={props.options}
              Localization={
                props.localization && {
                  ...props.localization.body
                }
              }
            />
          )}
        </Table>
      </Paper>
    </div>
  );
};

TestTable.defaultProps = defaultProps;

export default TestTable;
// export default (props: IProps<object>) => <TestTable {...props} />;
