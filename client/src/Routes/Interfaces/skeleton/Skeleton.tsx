import React from "react";
import styled from "styled-components";

export type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  flex?: number;
  isRadius?: boolean;
};

const Skeleton: React.FC<SkeletonProps> = ({ width, height, flex, isRadius = false }) => {
  return <SkeletonBlock style={{ width, height, flex }} isRadius={isRadius} />;
};

const SkeletonBlock = styled.div`
  display: inline-block;
  background: #efefef;
  border-radius: ${(props: SkeletonProps) => (props.isRadius ? "50%" : "0")};
  animation: pulse 1.25s ease-in-out infinite;
  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }

  & + & {
    margin-left: 0.25em;
  }
`;

export default Skeleton;
