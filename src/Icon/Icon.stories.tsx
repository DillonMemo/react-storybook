/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Icon from "./Icon";

export default {
  title: "components|Icon",
  component: Icon,
};

export const Default = () => {
  return (
    <div css={Container}>
      <Icon name="Activity" size={24} />
      <Icon name="Airplay" size={24} />
      <Icon name="AlertCircle" size={24} />
      <Icon name="AlertCircleFill" size={24} color="white" />
      <Icon name="Search" size={24} />
    </div>
  );
};

Default.story = {
  name: "Default",
};

export const Color = () => {
  return <Icon name="Activity" color="blue" />;
};

Color.story = {
  name: "Color",
};

export const Size = () => {
  return <Icon name="Activity" size={32} />;
};

Size.story = {
  name: "Size",
};

const Container = css`
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
`;
