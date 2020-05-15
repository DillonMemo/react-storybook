/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export interface ButtonProps {
  /** 버튼 안의 내용 */
  children: React.ReactNode;
  /** 클릭했을 때 호출할 함수 */
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 버튼의 생김새를 설정 합니다. */
  theme?:
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "error";
  /** 버튼의 크기를 설정 합니다. */
  size?: "small" | "default" | "medium" | "big";
}

/**
 * 용도에 맞는 `Button` 컴포넌트를 사용 하시기 바랍니다.
 *
 * - `theme` props로 *용도* 설정이 가능 합니다.
 * - `onClick` props로 설정하여 버튼이 클릭했을 때 호출 할 함수를 지정 할 수 있습니다.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  theme = "default",
  size = "small",
}) => {
  return (
    <button css={[style, themes[theme], sizes[size]]} onClick={onClick}>
      {children}
    </button>
  );
};

const style = css`
  outline: none;
  border: none;
  box-sizing: border-box;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:focus {
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
`;

const themes = {
  default: css`
    background: #3d3d3d;
    color: white;
    &:hover {
      background: #5b5b5b;
    }
    &:active {
      background: #1f1f1f;
    }
  `,
  primary: css`
    background: #0070f3;
    color: white;
    &:hover {
      background: #2681ec;
    }
    &:active {
      background: #0056bc;
    }
  `,
  secondary: css`
    background: #e9ecef;
    color: #343a40;
    &:hover {
      background: #f1f3f5;
    }
    &:active {
      background: #dee2e6;
    }
  `,
  tertiary: css`
    background: none;
    color: #3d3d3d;
    &:hover {
      background: #e3e3e3;
    }
    &:active {
      background: #b3b3b3;
    }
  `,
  success: css`
    background: #20c997;
    color: white;
    &:hover {
      background: #38d9a9;
    }
    &:active {
      background: #12b886;
    }
  `,
  warning: css`
    background: #f5a623;
    color: white;
    &:hover {
      background: #f8bb57;
    }
    &:active {
      background: #f39800;
    }
  `,
  error: css`
    background: #e00;
    color: white;
    &:hover {
      background: #e55858;
    }
    &:active {
      background: #be0000;
    }
  `,
};

const sizes = {
  small: css`
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
  `,
  default: css`
    height: 2rem;
    font-size: 0.875rem;
    padding: 0 1rem;
  `,
  medium: css`
    height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  big: css`
    height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `,
};

export default Button;
