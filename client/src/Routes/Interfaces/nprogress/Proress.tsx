import React from "react";
import { useNProgress } from "@tanem/react-nprogress";

import Bar from "./Bar";
import Container from "./Container";
import Spinner from "./Spinner";

type ProgressProps = {
  isAnimating: boolean;
};

const Progress: React.FC<ProgressProps> = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating
  });
  return (
    <Container isFinished={isFinished} animationDuration={animationDuration}>
      <Bar progress={progress} animationDuration={animationDuration} />
      <Spinner />
    </Container>
  );
};

export default Progress;
