import React, { useCallback, useState, useEffect } from "react";
import Progress from "./Proress";

const callFakeAPI = (delay: number) =>
  new Promise(resolve => {
    console.log("1");
    setTimeout(resolve, delay);
    console.log("2");
  });

const NProgress = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await callFakeAPI(1000);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Progress isAnimating={isLoading} />
      <h1>{isLoading ? "Loading..." : "Loaded!!"}</h1>
    </>
  );
};

export default NProgress;
