import React, { CSSProperties } from "react";
import styled from "styled-components";
import { MultiGrid, AutoSizer, GridCellProps } from "react-virtualized";

import { CSS } from "./";

export type MultiGridContainerProps = {
  gridStyles: CSS;
};

const MultiGridContainer: React.FC<MultiGridContainerProps> = ({ gridStyles }) => {
  const cellRenderer = ({ columnIndex, rowIndex, key, style }: GridCellProps) => {
    return (
      <>
        <div
          key={key}
          style={{ ...style, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {`${rowIndex}, ${columnIndex}`}
        </div>
      </>
    );
  };

  return (
    <>
      <AutoSizer disableHeight>
        {({ width, height }) => (
          <MultiGrid
            width={width}
            height={300}
            fixedColumnCount={1}
            fixedRowCount={1}
            scrollToColumn={0}
            scrollToRow={0}
            cellRenderer={cellProps => cellRenderer({ ...cellProps })}
            columnWidth={75}
            columnCount={50}
            rowHeight={40}
            rowCount={100}
            enableFixedColumnScroll={false}
            enableFixedRowScroll={false}
            style={gridStyles.STYLE}
            styleBottomLeftGrid={gridStyles.STYLE_BOTTOM_LEFT_GRID}
            styleBottomRightGrid={gridStyles.STYLE_BOTTOM_RIGHT_GRID}
            styleTopLeftGrid={gridStyles.STYLE_TOP_LEFT_GRID}
            styleTopRightGrid={gridStyles.STYLE_TOP_RIGHT_GRID}
          />
        )}
      </AutoSizer>
    </>
  );
};

export default MultiGridContainer;
