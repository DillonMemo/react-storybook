import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return (
    <div
      style={{
        display: "block",
        position: "fixed",
        right: 15,
        top: 15,
        zIndex: 1031
      }}>
      <Spin />
    </div>
  );
};

const spinKeyFrames = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Spin = styled.div`
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid rgb(34, 153, 221);
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: ${spinKeyFrames} 0.4s linear infinite;
`;

export default Spinner;
