import React, { FC, Dispatch } from "react";
import styled from "styled-components";
import { StringFieldConfig } from "./data";
import { TextEditorStyle } from "components/DynamicForm/TextEditor";

interface Props {
  value: string;
  set: Dispatch<string>;

  config: StringFieldConfig;
}

const StringField: FC<Props> = ({ value, set, config }) => {
  return config.as !== "textarea"
    ? <InputStyle value={value} onChange={e => set(e.target.value)} />
    : <TextareStyle value={value} onChange={e => set(e.target.value)} />
  ;
};

export default StringField;

const InputStyle = styled.input`
  padding: 1rem;
  font-size: 1.6rem;
  width: 100%;
`;

const TextareStyle = styled.textarea({
  ...TextEditorStyle as any,
  resize: "vertical",
  padding: "1rem",
  lineHeight: 1.5
});
