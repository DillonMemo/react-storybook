/** @jsx jsx */
import Map from "./Map";
import { useEffect } from "react";
import { jsx, css } from "@emotion/core";

declare global {
  interface Window {
    kakao: any;
  }
}

export default {
  title: "components|Map",
  component: Map,
};

export const Kakao = () => {
  useEffect(() => {
    const kakaoScript = document.createElement("script");
    kakaoScript.async = true;
    kakaoScript.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=cb0650b56e203d39821e036987a506b2&autoload=false";
    document.head.appendChild(kakaoScript);

    kakaoScript.onload = () => {
      console.log("kakao", kakao);
      kakao.maps.load(() => {
        debugger;
        const [lat, lng] = [37.52586, 127.0439657];

        let container = document.getElementById("kakaoMap");
        let options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 9,
        };

        const map = new window.kakao.maps.Map(container, options);
      });
    };
  }, []);
  return <div id="kakaoMap" css={MapContents}></div>;
};

const MapContents = css`
  width: 100%;
  height: 500px;
`;

Kakao.story = {
  name: "kakao",
};
