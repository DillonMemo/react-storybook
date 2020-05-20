/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import mdx from "./Icons.mdx";
import Icons from "./Icons";

export default {
  title: "Styleguide|Icons",
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Gallery = () => {
  return (
    <div>
      <div css={wrapper}>
        <Icons name="Activity" />
        <Icons name="Airplay" />
        <Icons name="AlertCircle" />
        <Icons name="AlertOctagon" />
        <Icons name="AlertTriangle" />
        <Icons name="AlignCenter" />
        <Icons name="AlignJustify" />
        <Icons name="AlignLeft" />
        <Icons name="AlignRight" />
      </div>
    </div>
  );
};

const wrapper = css`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  border: 1px solid #efefef;
`;
