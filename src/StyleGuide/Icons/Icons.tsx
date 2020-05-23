/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import elementToJSXString from "react-element-to-jsx-string";
import CopyToClipboard from "react-copy-to-clipboard";

interface IconsProps {
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

export const Activity: React.FC<IconsProps> = ({ color, size = 24, fill }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
    >
      <g
        fill={"none"}
        stroke={"black"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M4 16h7l3 13l4-26l3 13h7" />
      </g>
    </svg>
  );
};

export const Airplay: React.FC<IconsProps> = ({ color, size = 24, fill }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        d="M21.75 2.203H2.25a1.5 1.5 0 0 0-1.5 1.5v13.922a1.5 1.5 0 0 0 1.5 1.5h3.584l1.167-1.5h-4.75V3.703h19.5v13.922h-4.75l1.167 1.5h3.584a1.5 1.5 0 0 0 1.5-1.5V3.703a1.5 1.5 0 0 0-1.5-1.5z"
        fill="black"
      />
      <path
        d="M4.633 23.25h14.735l-7.367-9.472zm3.067-1.5l4.3-5.528l4.3 5.528z"
        fill="black"
      />
    </svg>
  );
};

export const AlertCircle: React.FC<IconsProps> = ({
  color,
  size = 24,
  fill,
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#626262"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </g>
    </svg>
  );
};

export const AlertOctagon: React.FC<IconsProps> = ({
  color,
  size = 24,
  fill,
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#626262"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </g>
    </svg>
  );
};

export const AlertTriangle: React.FC<IconsProps> = ({
  color,
  size = 24,
  fill,
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#626262"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </g>
    </svg>
  );
};

export const AlignCenter: React.FC<IconsProps> = ({
  color,
  size = 24,
  fill,
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#626262"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 10H6" />
        <path d="M21 6H3" />
        <path d="M21 14H3" />
        <path d="M18 18H6" />
      </g>
    </svg>
  );
};

export const AlignJustify: React.FC<IconsProps> = ({
  color,
  size = 24,
  fill,
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#626262"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 10H3" />
        <path d="M21 6H3" />
        <path d="M21 14H3" />
        <path d="M21 18H3" />
      </g>
    </svg>
  );
};

export const AlignLeft: React.FC<IconsProps> = ({ color, size = 24, fill }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#626262"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M17 10H3" />
        <path d="M21 6H3" />
        <path d="M21 14H3" />
        <path d="M17 18H3" />
      </g>
    </svg>
  );
};

export const AlignRight: React.FC<IconsProps> = ({
  color,
  size = 24,
  fill,
}) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="#626262"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 10H7" />
        <path d="M21 6H3" />
        <path d="M21 14H3" />
        <path d="M21 18H7" />
      </g>
    </svg>
  );
};
export interface defaultProps {
  /** `Icon` 선택 */
  name:
    | "Activity"
    | "Airplay"
    | "AlertCircle"
    | "AlertOctagon"
    | "AlertTriangle"
    | "AlignCenter"
    | "AlignJustify"
    | "AlignLeft"
    | "AlignRight"
    | "Search";
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

export default ({ name, color, size, fill }: defaultProps) => {
  const Element =
    name === "Activity"
      ? Activity({ color, size, fill })
      : name === "Airplay"
      ? Airplay({ color, size, fill })
      : name === "AlertCircle"
      ? AlertCircle({ color, size, fill })
      : name === "AlertOctagon"
      ? AlertOctagon({ color, size, fill })
      : name === "AlertTriangle"
      ? AlertTriangle({ color, size, fill })
      : name === "AlignCenter"
      ? AlignCenter({ color, size, fill })
      : name === "AlignJustify"
      ? AlignJustify({ color, size, fill })
      : name === "AlignLeft"
      ? AlignLeft({ color, size, fill })
      : name === "AlignRight"
      ? AlignRight({ color, size, fill })
      : null;
  return (
    <CopyToClipboard
      text={elementToJSXString(Element)}
      onCopy={() => console.log("copy complete")}
    >
      <div css={wrapper}>
        <button>
          <div>{Element}</div>
          <span>{name}</span>
        </button>
      </div>
    </CopyToClipboard>
  );
};

const wrapper = css`
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-basis: 25%;
  flex-grow: 0;

  > button {
    color: #000;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    outline: none;
    border: none;
    font-family: Inter;
    font-size: 1rem;
    background: transparent;
    transition: backgrond-color 0.1s ease-in-out 0s,
      box-shadow 0.1s ease-in-out 0s;

    &:hover {
      cursor: pointer;
      background: #fafafa;
    }

    &:focus {
      box-shadow: 0 0 1px 1px #eaeaea;
    }
  }
`;
