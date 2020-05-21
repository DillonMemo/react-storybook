/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useState } from "react";
import Autocomplete from "./Autocomplete";

export default {
  title: "components|Autocomplete",
};

export const Default = () => {
  return (
    <div css={wrapper}>
      <Autocomplete />
    </div>
  );
};

Default.story = {
  name: "Default",
};

const wrapper = css`
  height: 500px;
`;
