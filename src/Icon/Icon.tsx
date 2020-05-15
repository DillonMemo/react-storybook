/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Icons from "../Utils/svg";

export interface IconProps {
  /** `Icon` 컴포넌트의 내용 */
  children?: React.ReactNode;
  /** `Icon` 선택 */
  name: "Activity" | "Airplay" | "AlertCircle" | "AlertCircleFill" | "Search";
  /** `Icon` 색상 선택 */
  color?: string;
  /** `Icon` size 조절 */
  size?: number;
  /** `Icon` 배경색 선택
   *
   * | 일부 `Icon`은 배경색이 정확하지 않을 수 있습니다.
   */
  fill?: string;
}

/**
 * Icon 컴포넌트 목록 입니다.
 *
 * - `name` props로 필요한 *아이콘*을 지정 할 수 있습니다.
 * - `color` props로 *아이콘*의 *색상*을 변경 할 수 있습니다.
 * - `size` props로 *아이콘*의 *크기*를 조절 할 수 있습니다.
 * - `fill` props로 *아이콘*의 *배경색*을 변경 할 수 있습니다.
 *      - 일부 아이콘은 배경색의 변경이 정확하지 않을 수 있습니다.
 */
const Icon: React.FC<IconProps> = ({
  children,
  name,
  color = "black",
  size = 16,
  fill,
}) => {
  const DrawIcon = Icons[name];
  return (
    <div css={List}>
      <div className="item">
        <button className="icon-btn">
          <div>
            <DrawIcon color={color} size={size} />
          </div>
          <div>
            <p>{name}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

const List = css`
  flex-grow: 0;
  flex-basis: 25%;
  min-width: 0px;

  .item {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    position: relative;
    min-width: 1px;
    max-width: 100%;
    height: 100px;
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #fff;

    .icon-btn {
      color: #000;
      width: 100%;
      height: 100%;
      user-select: none;
      cursor: pointer;
      margin: 0;
      padding: 0;
      border-width: initial;
      border-style: none;
      border-color: initial;
      border-image: initial;
      transition: backgrond-color 0.1s ease-in-out 0s,
        box-shadow 0.1s ease-in-out 0s;
      background-color: #fff;
      font-family: Inter;

      &:hover {
        background-color: #fafafa;
      }

      &:focus {
        box-shadow: 0 0 1px 1px #eaeaea;
        outline: none;
      }
    }
  }
`;

export default Icon;
