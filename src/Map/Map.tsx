/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export interface MapProps {
  /** map안의 내용 */
  children: React.ReactNode;
}

/**
 * Kakao map 컴포넌트 예제 입니다.
 */
const Map: React.FC<MapProps> = ({ children }) => {
  return <div css={styled}>{children}</div>;
};

const styled = css`
  display: flex;
`;

export default Map;
