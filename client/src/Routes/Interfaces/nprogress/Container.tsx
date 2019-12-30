import * as React from "react";
import styled from "styled-components";

type ContainerProps = {
  animationDuration: number;
  isFinished: boolean;
};
const Container: React.FC<ContainerProps> = ({ children, isFinished, animationDuration }) => (
  <Block isFinished={isFinished} animationDuration={animationDuration}>
    {children}
  </Block>
);

const Block = styled.div`
  opacity: ${(props: ContainerProps) => (props.isFinished ? 0 : 1)};
  pointer-events: none;
  transition: opacity ${(props: ContainerProps) => props.animationDuration}ms linear;
`;

export default Container;
