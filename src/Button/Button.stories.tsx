/** @jsx jsx */
import Button from "./Button";
import { jsx, css } from "@emotion/core";

export default {
  title: "components|Button",
  component: Button,
};

export const button = () => {
  return <Button theme="default">BUTTON</Button>;
};

button.story = {
  name: "Default",
};

export const brandButton = () => {
  return <Button theme="brand">BRAND</Button>;
};

brandButton.story = {
  name: "Brand",
};

export const primaryButton = () => {
  return <Button theme="primary">PRIMARY</Button>;
};

primaryButton.story = {
  name: "Primary",
};

export const secondaryButton = () => {
  return <Button theme="secondary">SECONDARY</Button>;
};

secondaryButton.story = {
  name: "Secondary",
};

export const tertiaryButton = () => {
  return <Button theme="tertiary">TERTIARY</Button>;
};

tertiaryButton.story = {
  name: "Tertiary",
};

export const successButton = () => {
  return <Button theme="success">SUCCESS</Button>;
};

successButton.story = {
  name: "Success",
};

export const warningButton = () => {
  return <Button theme="warning">WARNING</Button>;
};

warningButton.story = {
  name: "Warning",
};

export const errorButton = () => {
  return <Button theme="error">ERROR</Button>;
};

errorButton.story = {
  name: "Error",
};

const buttonWrapper = css`
  .description {
    margin-bottom: 0.5rem;
  }
  & > div + div {
    margin-top: 2rem;
  }
`;

export const sizes = () => {
  return (
    <div css={buttonWrapper}>
      <div>
        <div className="description">Small</div>
        <Button size="small">BUTTON</Button>
      </div>
      <div>
        <div className="description">Default</div>
        <Button size="default">BUTTON</Button>
      </div>
      <div>
        <div className="description">Medium</div>
        <Button size="medium">BUTTON</Button>
      </div>
      <div>
        <div className="description">Big</div>
        <Button size="big">BUTTON</Button>
      </div>
    </div>
  );
};
