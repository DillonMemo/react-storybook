/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import reactElementToJSXString from "react-element-to-jsx-string";

interface IconProps {
  color?: string;
  size?: number;
  fill?: string;
}

const Activity: React.FC<IconProps> = ({ color, size, fill }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      css={style}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
    >
      <g
        fill={fill || "none"}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M4 16h7l3 13l4-26l3 13h7" />
      </g>
    </svg>
  );
};

const Airplay: React.FC<IconProps> = ({ color, size, fill }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    width={size}
    height={size}
    css={style}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 24 24"
  >
    <path
      d="M21.75 2.203H2.25a1.5 1.5 0 0 0-1.5 1.5v13.922a1.5 1.5 0 0 0 1.5 1.5h3.584l1.167-1.5h-4.75V3.703h19.5v13.922h-4.75l1.167 1.5h3.584a1.5 1.5 0 0 0 1.5-1.5V3.703a1.5 1.5 0 0 0-1.5-1.5z"
      fill={color}
    />
    <path
      d="M4.633 23.25h14.735l-7.367-9.472zm3.067-1.5l4.3-5.528l4.3 5.528z"
      fill={color}
    />
  </svg>
);

const AlertCircle: React.FC<IconProps> = ({ color, size, fill }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    width={size}
    height={size}
    css={style}
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 512 512"
  >
    <path
      d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z"
      fill={fill || "none"}
      stroke={color}
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    <path
      d="M250.26 166.05L256 288l5.73-121.95a5.74 5.74 0 0 0-5.79-6h0a5.74 5.74 0 0 0-5.68 6z"
      fill={fill || "none"}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <path d="M256 367.91a20 20 0 1 1 20-20a20 20 0 0 1-20 20z" fill={color} />
  </svg>
);

const AlertCircleFill: React.FC<IconProps> = ({ color, size, fill }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    shapeRendering="geometricPrecision"
    css={style}
  >
    <circle cx="12" cy="12" r="10" fill={fill} />
    <path d="M12 8v4" stroke={color} />
    <path d="M12 16h.01" stroke={color} />
  </svg>
);

const Search: React.FC<IconProps> = ({ color, size, fill }) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={size}
      height={size}
      css={style}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
    >
      <path
        d="M30 28.59L22.45 21A11 11 0 1 0 21 22.45L28.59 30zM5 14a9 9 0 1 1 9 9a9 9 0 0 1-9-9z"
        fill={color}
      />
    </svg>
  );
};

const style = css`
  transform: rotate(360deg);
`;

interface Props {
  [key: string]: React.FC<IconProps>;
}

const Icon: Props = {
  Activity,
  Airplay,
  AlertCircle,
  AlertCircleFill,
  Search,
};

export default Icon;
