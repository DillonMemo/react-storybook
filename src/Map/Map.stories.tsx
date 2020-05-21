/** @jsx jsx */
import Map from "./Map";
import { useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import Axios from "axios";
import Icons from "../Utils/svg";

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
};

export const Kakao = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [searchData, setSearchData] = useState<SearchType[]>();
  const DrawIcon = Icons["Search"];

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

  const handleSearchChange = async (query: string): Promise<void> => {
    setKeyword(query);
    const url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}`;

    if (query) {
      const data: SearchType[] = await Axios({
        method: "GET",
        url,
        headers: {
          Authorization: "KakaoAK d96ff2a8efb355716d764d1be22bdb6f",
        },
      })
        .then((res) => res.data.documents)
        .catch((error) => console.error(error));

      if (data.length > 0) {
        document
          .getElementsByClassName("divider")[0]
          .classList.add("searching");

        setSearchData(data);
      } else {
        document
          .getElementsByClassName("divider")[0]
          .classList.remove("searching");
      }
    } else {
      document
        .getElementsByClassName("divider")[0]
        .classList.remove("searching");

      setSearchData([]);
    }
  };

  (window as any).searchData = searchData;

  return (
    <div>
      <div css={SearchContents}>
        <div className="search">
          <div className="input">
            <input
              type="text"
              value={keyword}
              placeholder="Search"
              onFocus={() => {
                // 검색 입력 박스 포커싱
                document
                  .getElementsByClassName("search")[0]
                  ?.classList.add("focused");

                // 검색 입력 박스 포커싱
                document
                  .getElementsByClassName("divider")[0]
                  .classList.add("focused");

                // 검색 결과 리스트 숨김
                document
                  .getElementsByClassName("search-list")[0]
                  .classList.remove("hide");
              }}
              onBlur={(e) => {
                // 검색 입력 박스 포커싱 해제
                document
                  .getElementsByClassName("search")[0]
                  ?.classList.remove("focused");

                // 검색 입력 박스 포커싱 해제
                document
                  .getElementsByClassName("divider")[0]
                  .classList.remove("focused");

                // 검색 결과 리스트 표시
                // document
                //   .getElementsByClassName("search-list")[0]
                //   .classList.add("hide");
              }}
              onChange={({ target: { value: Value } }) =>
                handleSearchChange(Value)
              }
            />
          </div>
          <span className="icon right">
            <DrawIcon size={21} />
          </span>
        </div>
        <div className="divider"></div>
        <div className="search-list">
          <ul>
            {searchData &&
              searchData.length > 0 &&
              searchData.map((data, index) => (
                <li
                  key={`li-${index}`}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("handleClick", data);
                    document
                      .getElementsByClassName("search-list")[0]
                      .classList.add("hide");
                  }}
                >
                  {data.place_name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div id="kakaoMap" css={MapContents} />
      <div css={FormGroup}>
        <button id="zoomDisable">지도 확대/축소 끄기</button>
        <button id="zoomEnable">지도 확대/축소 켜기</button>
      </div>

      <div>
        <span>Autocomplete Demo</span>
        <div className="search-container"></div>
      </div>
    </div>
  );
};

Kakao.story = {
  name: "kakao",
};

const SearchContents = css`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 300px;

  margin-bottom: 1rem;
  .search {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: initial;
    height: calc(9 * 4px);
    transition: border 0.2s ease 0s, color 0.2s ease 0s;

    border-top: 1px solid #ffccbf;
    border-left: 1px solid #ffccbf;
    border-right: 1px solid #ffccbf;

    &.focused {
      box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
      border-top: 1px solid #fe5127;
      border-left: 1px solid #fe5127;
      border-right: 1px solid #fe5127;
      color: black;
    }

    & > div.input {
      display: block;
      position: relative;
      width: 100%;
      margin: 5px 10px;

      input[type="text"] {
        box-shadow: none;
        box-sizing: border-box;
        display: block;
        font-family: Inter;
        font-size: 14px;
        line-height: 26px;
        width: 100%;
        color: #000;
        text-overflow: ellipsis;
        border-radius: 0px;
        border-width: initial;
        border-style: none;
        border-color: initial;
        padding: 0;
        outline: none;
      }
    }

    & > .icon.right {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5rem;
    }
  }

  .divider {
    border-top: 1px solid #ffccbf;
    position: relative;
    transition: margin 0.2s ease 0s;

    &.focused {
      border-top: 1px solid #fe5127;
      color: black;

      &.searching {
        margin: 0 20px 0 14px;
      }
    }
  }

  .search-list {
    position: absolute;
    background: white;
    z-index: 2;
    top: 38px;
    width: 100%;
    box-shadow: 0 4px 6px 0 rgba(32, 33, 36, 0.28);

    > ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
      border: 1px solid #ddd;

      > li {
        cursor: pointer;
        line-height: 2rem;
        padding-left: 10px;

        &.hover {
          background: #eee;
        }
      }
    }

    &.hide {
      opacity: 0;
      visibility: hidden;
    }
  }
`;

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
