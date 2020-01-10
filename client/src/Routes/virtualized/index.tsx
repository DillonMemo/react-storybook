import React, { CSSProperties } from "react";
import styled from "styled-components";

import MultiGridContainer from "./MultiGridContainer";
import SortGridContainer from "./SortGridContainer";

export type CSS = {
  STYLE: CSSProperties;
  STYLE_BOTTOM_LEFT_GRID: CSSProperties;
  STYLE_TOP_LEFT_GRID: CSSProperties;
  STYLE_TOP_RIGHT_GRID: CSSProperties;
};
export type VirtualizedProps = {};

const Virtualized: React.FC<VirtualizedProps> = ({}) => {
  const gridStyle: CSS = {
    STYLE: {
      border: "1px solid #ddd"
    },
    STYLE_BOTTOM_LEFT_GRID: {
      borderRight: "2px solid #aaa",
      backgroundColor: "#f7f7f7"
    },
    STYLE_TOP_LEFT_GRID: {
      borderBottom: "2px solid #aaa",
      borderRight: "2px solid #aaa",
      fontWeight: "bold"
    },
    STYLE_TOP_RIGHT_GRID: {
      borderBottom: "2px solid #aaa",
      fontWeight: "bold"
    }
  };
  return (
    <Block>
      <SectionBlock style={{ width: "100%" }}>
        <div>
          <b>Multi Grid</b>
        </div>
        <MultiGridContainer gridStyles={gridStyle} />
      </SectionBlock>
      <SectionBlock style={{ width: "50%" }}>
        <div>
          <b>Sort</b>
        </div>
        <SortGridContainer gridStyles={gridStyle} />
      </SectionBlock>
    </Block>
  );
};

const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SectionBlock = styled.section`
  margin: 10px 0;
`;

export default Virtualized;
