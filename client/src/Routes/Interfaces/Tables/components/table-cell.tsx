import React, { MouseEvent } from "react";
import { TableCell, Icon } from "@material-ui/core";
import { Column } from "../types/index";
import { Check, Remove } from "@material-ui/icons";
import { CSSProperties } from "@material-ui/styles";

interface IProps {
  cellProps?: { readonly [x: string]: any; children?: React.ReactNode };
  columnDef: Column<object>;
  size?: "small" | "medium" | undefined;
  value?: string | Date;
  rowData?: object;
}

const Table_Cell: React.FunctionComponent<IProps> = props => {
  console.log("Table_Cell props", props);
  const getRenderValue = () => {
    console.log(props.columnDef.type);
    if (
      props.columnDef.emptyValue !== undefined &&
      (props.value === undefined || props.value === null)
    ) {
      return getEmptyValue(props.columnDef.emptyValue);
    }

    if (props.columnDef.render) {
      if (props.rowData) {
        return props.columnDef.render(props.rowData, "row");
      } else {
        return props.columnDef.render(props.value as any, "group");
      }
    } else if (props.columnDef.type === "boolean") {
      const style: CSSProperties = {
        textAlign: "left",
        verticalAlign: "middle",
        width: 48
      };
      if (props.value) {
        // Check
        return <Check style={style} />;
      } else {
        // ThirdStateCheck
        return <Remove style={style} />;
      }
    } else if (props.columnDef.type === "date") {
      if ((props as any).value instanceof Date) {
        // return new Date(
        //   (props.value as Date).setMonth((props.value as Date).getMonth() - 1)
        // ).toLocaleDateString();
        return (props.value as Date).toLocaleDateString();
      } else {
        return props.value;
      }
    } else if (props.columnDef.type === "time") {
      if ((props as any).value instanceof Date) {
        // return new Date(
        //   (props.value as Date).setMonth((props.value as Date).getMonth() - 1)
        // ).toLocaleDateString();
        return (props.value as Date).toLocaleDateString();
      } else {
        return props.value;
      }
    } else if (props.columnDef.type === "datetime") {
      if ((props as any).value instanceof Date) {
        // return new Date(
        //   (props.value as Date).setMonth((props.value as Date).getMonth() - 1)
        // ).toLocaleDateString();
        return (props.value as Date).toLocaleDateString();
      } else {
        return props.value;
      }
    } else if (props.columnDef.type === "currency") {
      const value: number = Number(
        props.value !== undefined ? props.value : "0"
      );
      return getCurrencyValue(props.columnDef.currencySetting, value);
    }

    return props.value;
  };

  const getEmptyValue = (emptyValue: typeof props.columnDef.emptyValue) => {
    if (typeof emptyValue === "function") {
      return (props.columnDef as any).emptyValue(props.rowData);
    } else {
      return emptyValue;
    }
  };

  const getCurrencyValue = (
    currencySetting: typeof props.columnDef.currencySetting,
    value?: number
  ) => {
    if (currencySetting !== undefined) {
      return new Intl.NumberFormat(
        currencySetting.locale !== undefined ? currencySetting.locale : "ko-KR",
        {
          style: "currency",
          currency:
            currencySetting.currencyCode !== undefined
              ? currencySetting.currencyCode
              : "KRW",
          minimumFractionDigits:
            currencySetting.minimumFractionDigits !== undefined
              ? currencySetting.minimumFractionDigits
              : 2,
          maximumFractionDigits:
            currencySetting.maximumFractionDigits !== undefined
              ? currencySetting.maximumFractionDigits
              : 2
        }
      ).format(value !== undefined ? value : 0);
    } else {
      return new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW"
      }).format(value !== undefined ? value : 0);
    }
  };

  // const handleClickCell = (e: MouseEvent<HTMLElement>) => {
  //   if(props.columnDef.disableClick){
  //     e.stopPropagation();
  //   }
  // }

  // const getStyle =() => {
  //   let cellStyle = {};
  //   if(typeof props.columnDef.cellStyle === 'function'){
  //     cellStyle = { ...cellStyle, ...props.columnDef.cellStyle(props.value, props.rowData)};
  //   } else {
  //     cellStyle = {...cellStyle, ...props.columnDef.cellStyle};
  //   }

  //   if(props.columnDef.disableClick) {
  //     cellStyle.cursor = 'default';
  //   }

  //   return {...props.style, ...cellStyle}
  // }

  return (
    <TableCell
      size={props.size}
      {...props.cellProps}
      align={
        ["numeric"].indexOf(
          props.columnDef.type ? props.columnDef.type : ""
        ) !== -1
          ? "right"
          : "left"
      }
      // onClick={handleClickCell}
    >
      {/* {props.children} */}
      {getRenderValue()}
    </TableCell>
  );
};

(Table_Cell.defaultProps as IProps) = {
  columnDef: { tableData: { columnOrder: 0, id: 0 } }
};

export default Table_Cell;
