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
        const [lat, lng] = [37.52586, 127.0439657];

        let container = document.getElementById("kakaoMap");
        let options = {
          center: new kakao.maps.LatLng(lat, lng),
          level: 9,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 컨트롤을 생성합니다.
        const mapTypeControl = new kakao.maps.MapTypeControl();
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 지도 확대, 축소 기능 끄기
        const zoomDisable = document.getElementById("zoomDisable");
        if (zoomDisable) {
          zoomDisable.addEventListener("click", () => {
            map.setZoomable(false);
          });
        }
        // 지도 확대, 축소 기능 켜기
        const zoomEnable = document.getElementById("zoomEnable");
        if (zoomEnable) {
          zoomEnable.addEventListener("click", () => {
            map.setZoomable(true);
          });
        }
      });
    };
  }, []);
  return (
    <div>
      <div id="kakaoMap" css={MapContents} />
      <div css={FormGroup}>
        <button id="zoomDisable">지도 확대/축소 끄기</button>
        <button id="zoomEnable">지도 확대/축소 켜기</button>
      </div>
    </div>
  );
};

Kakao.story = {
  name: "kakao",
};

const MapContents = css`
  width: 100%;
  height: 500px;
`;

const FormGroup = css`
  margin-top: 1rem;

  & > button {
    outline: none;
    user-select: button;
    cursor: pointer;
    padding: 7px 12px;
    margin: 0 6px 4px 0;
    border: 1px solid #dbdbdb;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);

    &:hover {
      background: #fcfcfc;
      border: 1px solid #c1c1c1;
    }
  }
`;
