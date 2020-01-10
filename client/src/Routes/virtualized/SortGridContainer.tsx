import React, { useState } from "react";
import { AutoSizer, MultiGrid, GridCellProps } from "react-virtualized";
import styled from "styled-components";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { CSS } from "./";

export type SortGridContainerProps = {
  gridStyles: CSS;
};

const SortGridContainer: React.FC<SortGridContainerProps> = ({ gridStyles }) => {
  const [count, setCount] = useState({ rowCount: 50, columnCount: headerColumns.length });
  const [dataCollection, setDataCollection] = useState<{ rows: any[] }>({ rows: [] });

  const cellRenderer = ({ columnIndex, rowIndex, key, style }: GridCellProps) => {
    if (rowIndex === 0) {
      return (
        <>
          <Block
            key={key}
            className={`hover`}
            style={{
              ...style
            }}>
            <Block>
              {`Col${columnIndex}`}
              <FaAngleUp />
            </Block>
          </Block>
        </>
      );
    } else {
      return (
        <>
          <Block key={key} style={{ ...style }}>
            {`${rowIndex}, ${columnIndex}`}
          </Block>
        </>
      );
    }
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
            columnCount={count.columnCount}
            rowHeight={40}
            rowCount={count.rowCount}
            enableFixedColumnScroll={false}
            enableFixedRowScroll={false}
            style={gridStyles.STYLE}
            styleBottomLeftGrid={gridStyles.STYLE_BOTTOM_LEFT_GRID}
            styleTopLeftGrid={gridStyles.STYLE_TOP_LEFT_GRID}
            styleTopRightGrid={gridStyles.STYLE_TOP_RIGHT_GRID}
          />
        )}
      </AutoSizer>
    </>
  );
};

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &.hover {
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }
`;

const headerColumns = [
  {
    name: "id",
    displayName: "No.",
    width: 30
  },
  {
    name: "title",
    displayName: "제목",
    width: 100
  },
  {
    name: "jobTitle",
    displayName: "직업 제목",
    width: 100
  },
  {
    name: "jobType",
    displayName: "직업 종류",
    width: 80
  },
  {
    name: "jobDescriptor",
    displayName: "직업 설명",
    width: 80
  }
];

export default SortGridContainer;
