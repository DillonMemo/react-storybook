import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Paper, Table } from "@material-ui/core";
import { IProps, Query, QueryResult, Column } from "./types";
import { defaultProps } from "./utils/default-props";
import DataManager from "./utils/data-manager";

const isRemoteData = (props?: IProps<object>) => !Array.isArray(props && props.data);

// const useStateWithCallback<S> = (initialState: any, callback: Function) => {
//   const [state, setState] = useState(initialState);

//   useEffect(() => callback(state), [state, callback]);

//   return [state, setState];
// };

const TableElement: React.FunctionComponent<IProps<object>> = props => {
  const dataManager = new DataManager();

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

  const setDataManagerFields = (props: IProps<object>, isInit: boolean) => {
    let defaultSortColumnIndex = -1;
    let defaultSortDirection = "";

    if (props) {
      defaultSortColumnIndex = props.columns.findIndex(a => a.defaultSort);
      defaultSortDirection =
        defaultSortColumnIndex > -1 ? props.columns[defaultSortColumnIndex].defaultSort : "";
    }

    dataManager.setColumns(props.columns);

    if (isRemoteData(props)) {
    } else {
      dataManager.setData(props.data);
    }

    // sorting
  };

  const onChangeOrder = (orderBy: number, orderDirection: typeof query.orderDirection) => {
    debugger;
    const newOrderBy = orderDirection === "" ? -1 : orderBy;

    dataManager.changeOrder(newOrderBy, orderDirection);

    if (isRemoteData(props)) {
      const _query = { ...query };
      _query.page = 0;
      (_query.orderBy as any) = renderState.columns.find(
        a => a.tableData && a.tableData.id === newOrderBy
      );
      _query.orderDirection = orderDirection;
    } else {
      setRenderState(dataManager.getRenderState());
    }
  };

  props = getProps(props);
  setDataManagerFields(props, true);
  const [renderState, setRenderState] = useState(dataManager.getRenderState());
  console.log("TableElement props", props);

  // query states
  const [query, setQuery] = useState<Query<object>>({
    filters: renderState.columns
      .filter(a => a.tableData && a.tableData.filterValue)
      .map(a => ({
        column: a,
        operator: "=",
        value: a.tableData && a.tableData.filterValue
      })),
    orderBy: renderState.columns.find(a => a.tableData && a.tableData.id === renderState.orderBy),
    orderDirection: renderState.orderDirection as "" | "asc" | "desc",
    page: 0,
    pageSize: props.options && props.options.pageSize ? props.options.pageSize : 5,
    search: renderState.searchText,
    totalCount: 0
  });

  return (
    <div>
      <h1>{props.title}</h1>
      <Paper
        style={{
          maxHeight: props.options && props.options.maxBodyHeight,
          overflowY: "auto"
        }}>
        <Table stickyHeader={props.stickyHeader}>
          {props.options && props.options.header && props.components && (
            <props.components.Header
              components={props.components}
              columns={renderState.columns}
              sorting={props.options.sorting}
              orderBy={renderState.orderBy}
              orderDirection={renderState.orderDirection}
              onChangeOrder={onChangeOrder}
            />
          )}
          {props.components && (
            <props.components.Body
              columns={renderState.columns}
              components={props.components}
              Localization={
                props.localization && {
                  ...props.localization.body
                }
              }
              originalData={renderState.originalData}
              options={props.options}
              getFieldValue={dataManager.getFieldValue}
            />
          )}
        </Table>
      </Paper>
    </div>
  );
};

TableElement.defaultProps = defaultProps;

export default TableElement;
