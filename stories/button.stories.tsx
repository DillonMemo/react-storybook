import { storiesOf } from "@storybook/react";
import * as React from "react";
import Button from "../src/components/Button";
import { linkTo } from "@storybook/addon-links";
import { action } from "@storybook/addon-actions";

storiesOf("Button", module)
  .add("First", () => (
    <Button onClick={linkTo("Button", "Second")}>Hello Button</Button>
  ))
  .add(
    "Second",
    () => (
      <Button onClick={action("clicked")}>
        <span role="img" aria-label="so cool">
          😀 😎 👍 💯
        </span>
      </Button>
    ),
    { notes: "A very simple component" }
  );
