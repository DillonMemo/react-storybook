/** @jsx jsx */
import Map from "./Map";
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import Axios from "axios";

import Icons from "../Utils/svg";

// const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`;

//             if (query) {
//               const data: SearchType[] = await Axios({
//                 method: "GET",
//                 url,
//                 headers: {
//                   Authorization: "KakaoAK d96ff2a8efb355716d764d1be22bdb6f",
//                 },
//               })
//                 .then((res) => res.data.documents)
//                 .catch((error) => console.log(error));

//               if (data.length > 0) {
//                 setSearchData(data);
//               }
//             } else {
//               setSearchData([]);
//             }
declare global {
  interface Window {
    kakao: any;
  }
}

export default {
  title: "components|Map",
  component: Map,
};

export type SearchType = {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
  value: string;
  label: string;
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
          level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 컨트롤을 생성합니다.
        const mapTypeControl = new kakao.maps.MapTypeControl();
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        map.setZoomable(false);

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
      <div css={container}>
        <span>Autocomplete Demo</span>
        <div
          css={autocomplete}
          role="combobox"
          aria-owns="ex-list-box"
          aria-haspopup="listbox"
          // aria-expanded={suggestions.status}
          aria-expanded={true}
        ></div>
      </div>
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

const { sm, md, lg, xl } = {
  sm: "@media (min-width: 576px)",
  md: "@media (min-width: 768px)",
  lg: "@media (min-width: 992px)",
  xl: "@media (min-width: 1200px)",
};

const container = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5% 5rem 5%;

  ${sm} {
    padding-left: 10%;
    padding-right: 10%;
  }
  ${md} {
    padding-left: 12.5%;
    padding-right: 12.5%;
  }
  ${lg} {
    padding-left: 15%;
    padding-right: 15%;
  }
`;

const title = css`
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
  ${sm} {
    font-size: 2rem;
  }
`;

const subtitle = css`
  margin: 0 0 2.5rem;
`;

const autocomplete = css`
  display: inline-block;
`;

const input = css`
  padding: 0.9rem 1.15rem;
  width: 15rem;
  border: 1px solid #bbb;
  border-radius: 8px;
  outline: none;
  line-height: 1.2;
  ${sm} {
    width: 20rem;
  }
`;

const inputError = css`
  border: 1px solid red;
  color: red;
`;

const inputNoBottomRadius = css`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const listBox = css`
  position: absolute;
  margin: 0;
  padding: 0;
  max-height: 60%;
  overflow-y: auto;
  border: 1px solid #bbb;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  list-style-type: none;
  text-align: left;
`;

const listItem = css`
  padding: 0.75rem 1.15rem;
  width: 15rem;
  cursor: pointer;
  ${sm} {
    width: 20rem;
  }
`;

const subText = css`
  color: #8c8c8c;
`;

const listItemDarken = css`
  background: #eee;
`;
