import React, { useCallback, useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNProgress } from "@tanem/react-nprogress";

import { FETCHPHOTOS, PhotosState } from "../../../modules/samplephotos";
import { RootState } from "../../../modules";
import Progress from "./Proress";

const callFakeAPI = (delay: number) =>
  new Promise(resolve => {
    setTimeout(resolve, delay);
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
