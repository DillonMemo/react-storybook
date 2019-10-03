import React, { useState, useEffect } from "react";
import { Paper, Table } from "@material-ui/core";
import { IProps, Query, QueryResult } from "./types";
import { defaultProps } from "./utils/default-props";
import { setColumnsManager, setDataManager } from "./utils/data-manager";

const isRemoteData = (props?: IProps<object>) =>
  !Array.isArray(props && props.data);

const useRequest = (callback: Function) => {
  const [state, setState] = useState({ isLoading: false });

  useEffect(() => {});
};

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

  const onChangeOrder = (
    orderBy: number,
    orderDirection: typeof query.orderDirection
  ) => {
    const newOrderBy = orderDirection === "" ? -1 : orderBy;
    setRenderState(state => ({
      ...state,
      orderBy: orderBy,
      orderDirection: orderDirection,
      currentPage: 0,
      sorted: false
    }));

    if (isRemoteData()) {
      const _query = { ...query };
      _query.page = 0;
      _query.orderBy = columns.find(a => a.tableData.id === newOrderBy);
      _query.orderDirection = orderDirection;
      onQueryChange(_query, () => {});
    }
  };

  const onQueryChange = (_query: typeof query, callback: Function) => {
    _query = { ...query, ..._query };

    // setState(state => ({ isLoading: true }));

    // useEffect(() => {
    //   (props.data as ((query: Query<object>) => Promise<QueryResult<object>>))(
    //     _query
    //   ).then(result => {
    //     _query.totalCount = result.totalCount;
    //     _query.page = result.page;
    //     setOriginalData(setDataManager(result.data));
    //     setState(state => ({ isLoading: false }));
    //     setQuery(_query);
    //   });
    // }, [callback && callback()]);
  };
  props = getProps(props);
  console.log("TableElement props", props);

  // render states
  const [state, setState] = useState({ isLoading: props.isLoading });
  const [columns, setColumns] = useState(setColumnsManager(props.columns));
  const [originalData, setOriginalData] = useState(
    isRemoteData(props) ? [] : setDataManager(props.data)
  );
  const [showAddRow, setShowAddRow] = useState<boolean>(false);

  // render states
  const [renderState, setRenderState] = useState({
    orderBy: -1,
    orderDirection: "",
    currentPage: 0,
    sorted: false,
    searchText: ""
  });

  // query states
  const [query, setQuery] = useState<Query<object>>({
    filters: columns
      .filter(a => a.tableData.filterValue)
      .map(a => ({
        column: a,
        operator: "=",
        value: a.tableData.filterValue
      })),
    orderBy: columns.find(a => a.tableData.id === renderState.orderBy),
    orderDirection: renderState.orderDirection as "" | "asc" | "desc",
    page: 0,
    pageSize:
      props.options && props.options.pageSize ? props.options.pageSize : 5,
    search: renderState.searchText,
    totalCount: 0
  });

  useEffect(() => {}, [renderState]);

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
              columns={props.columns}
              sorting={props.options.sorting}
              onChangeOrder={onChangeOrder}
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
