import React, { useState, Children, useEffect } from "react";

/* Material Table Components */
import Table from "@material-ui/core/Table";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import LinearProgress from "@material-ui/core/LinearProgress";

import { defaultProps } from "./utils/default-props";
import { CustomTableProps } from "./utils";
import DataManager from "./utils/data-manager";

const dataManager = new DataManager();

const getProps = (
  props: React.PropsWithChildren<CustomTableProps<object>>
): CustomTableProps<object> => {
  const calculatedProps = { ...props };
  // calculatedProps.components = { ...CustomMaterialTable.defaultProps.components, ...calculatedProps.components};
  console.log("calculatedProps", calculatedProps);

  if (calculatedProps.editable) {
    // 행 추가 이벤트
    if (calculatedProps.editable.onRowAdd) {
      // ...
    }
  }

  return calculatedProps;
};

const isRemoteData = (
  props: React.PropsWithChildren<CustomTableProps<object>>
) => !Array.isArray(props.data);

/**
 *
 * @param props - 컴포넌트 props
 * @param isInit - Paging, Order init 여부
 */
const setDataManagerFields = (
  props: React.PropsWithChildren<CustomTableProps<object>>,
  isInit: boolean
): void => {
  let defaultSortColumnIndex: number = -1;
  let defaultSortDirection: string | undefined = "";

  if (props) {
    defaultSortColumnIndex = props.columns.findIndex(a => a.defaultSort);
    defaultSortDirection =
      defaultSortColumnIndex > -1
        ? props.columns[defaultSortColumnIndex].defaultSort
        : "";
  }

  // Set Column
  dataManager.setColumns(props.columns);
  debugger;
  if (isRemoteData(props)) {
  } else {
    dataManager.setData(props.data);
  }
};

const CustomMaterialTable: React.FunctionComponent<
  CustomTableProps<object>
> = props => {
  const calculatedProps = getProps(props);
  setDataManagerFields(calculatedProps, true);
  // const renderState = dataManager.getRenderState();

  const [data, setData] = useState<any[]>([]);
  const [renderState, setRenderState] = useState<CustomTableProps<object>>({
    ...dataManager.getRenderState()
  });
  const [showAddRow, setShowAddRow] = useState<boolean>(false);

  // useEffect(() => {
  //   setRenderState(dataManager.getRenderState());
  // }, [renderState]);

  console.log("renderState", renderState.columns);

  return (
    <div>
      <h1>Custom Material Table</h1>
      {/* <props.components.Container style={{position: 'relative', ...props.style}}></props.components.Container> */}
    </div>
  );
};

CustomMaterialTable.defaultProps = defaultProps;

export default (props: any) => (
  <CustomMaterialTable {...props} ref={props.tableRef} />
);
