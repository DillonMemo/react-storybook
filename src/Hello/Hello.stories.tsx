import React from "react";
import Hello from "./Hello";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import mdx from "./Hello.mdx";

export default {
  title: "components|example/Hello",
  component: Hello,
  decorators: [withKnobs],
  parameters: {
    componentSubtitle: '"안녕하세요"라고 보여주는 컴포넌트',
    docs: {
      page: mdx,
    },
  },
};

export const hello = () => {
  const big = boolean("big", false);
  const name = text("name", "Storybook");

  return (
    <Hello
      name={name}
      big={big}
      onHello={action("onHello")}
      onBye={action("onBye")}
    />
  );
};
export const standard = () => <Hello name="Storybook" />;
export const big = () => <Hello name="Storybook" big />;
