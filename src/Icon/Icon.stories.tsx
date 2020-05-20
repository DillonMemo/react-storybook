/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import Icon from "./Icon";

export default {
  title: "components|Icon",
  component: Icon,
};

export const Default = () => {
  return (
    <div>
      <Icon name="Activity" size={24} />
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
