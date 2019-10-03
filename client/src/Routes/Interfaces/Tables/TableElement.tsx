import React, { useState } from "react";
import { Paper, Table } from "@material-ui/core";
import { IProps } from "./types";
import { defaultProps } from "./utils/default-props";
import { setColumnsManager, setDataManager } from "./utils/data-manager";

const isRemoteData = (props: IProps<object>) => !Array.isArray(props.data);

const TableElement: React.FunctionComponent<IProps<object>> = props => {
  const getProps = (props: IProps<object>) => {
    const calculatedProps = { ...props };
    if (TableElement.defaultProps) {
      calculatedProps.components = {
        ...TableElement.defaultProps.components,
        ...calculatedProps.components
      };
      // calculatedProps.icon 나중에 Set
      calculatedProps.options = {
        ...TableElement.defaultProps.options,
        ...calculatedProps.options
      };
    }

    return calculatedProps;
  };
  props = getProps(props);
  console.log("TableElement props", props);

  const [columns, setColumns] = useState(setColumnsManager(props.columns));
  const [originalData, setOriginalData] = useState(
    isRemoteData(props) ? [] : setDataManager(props.data)
  );

  return (
    <div>
      <h1>YapTV 공용 Table Component 라이브러리</h1>
      <Paper
        style={{
          maxHeight: props.options && props.options.maxBodyHeight,
          overflowY: "auto"
        }}>
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
              components={props.components}
              Localization={
                props.localization && {
                  ...props.localization.body
                }
              }
              originalData={originalData}
              options={props.options}
            />
          )}
        </Table>
      </Paper>
    </div>
  );
};

TableElement.defaultProps = defaultProps;

export default TableElement;
// export default (props: IProps<object>) => <TestTable {...props} />;
