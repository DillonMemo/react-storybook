import React, { ChangeEvent, MouseEvent, useRef } from "react";
import styled from "styled-components";

interface IProps {
  ClassName?: string;
  Id?: string;
  Name?: string;
  Accept?: string;
  WrapperBackgroundColor?: string;
  labelColor?: string;
  labelOpacity?: number;
  onChange?: (e: any) => void;
}

const FileInput: React.FunctionComponent<IProps> = props => {
  const wrapper = useRef<HTMLDivElement>(null);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.value) return;

    const value = e.currentTarget.value.replace(/^.*[\\\/]/, "");

    (wrapper.current as HTMLDivElement).className += " -chosen";

    if ((wrapper.current as HTMLDivElement).children.item(2)) {
      ((wrapper.current as HTMLDivElement).children.item(
        2
      ) as HTMLSpanElement).innerText = value;
    }

    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <DivWrapper
      ref={wrapper}
      style={{ backgroundColor: props.WrapperBackgroundColor }}>
      <Input
        type="file"
        className={props.ClassName}
        name={props.Name}
        id={props.Id}
        accept={props.Accept}
        onChange={handleChange}
      />
      <Button className="button">Choose</Button>
      <Label
        className="label"
        style={{ color: props.labelColor, opacity: props.labelOpacity }}>
        No file selected
      </Label>
    </DivWrapper>
  );
};

const DivWrapper = styled.div`
  display: inline-block;
  text-align: left;
  background: #fff;
  padding: 16px;
  width: 450px;
  position: relative;
  border-radius: 3px;

  :hover > .button {
    background: dodgerblue;
    color: white;
  }

  &.-chosen > .label {
    opacity: 1;
  }
`;
const Input = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 10;
  cursor: pointer;
`;
const Button = styled.span`
  display: inline-block;
  cursor: pointer;
  background: #eee;
  padding: 8px 16px;
  border-radius: 2px;
  margin-right: 8px;
`;
const Label = styled.span`
  color: #333;
  white-space: nowrap;
  opacity: 0.3;
`;

export default FileInput;
