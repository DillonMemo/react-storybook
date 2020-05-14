/** @jsx jsx */
import { jsx, css } from "@emotion/core";

export interface KakaoProps {
  /** Kakao map안의 내용 */
  children: React.ReactNode;
}

/**
 * Kakao map 컴포넌트 예제 입니다.
 */
const Map: React.FC<KakaoProps> = ({ children }) => {
  return <div css={styled}>{children}</div>;
};

const styled = css`
  display: flex;
`;

export default Map;
