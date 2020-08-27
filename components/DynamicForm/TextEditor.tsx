import React, { FC } from "react";
import { EditorProps } from ".";
import { Box, BoxProps } from "@xcorejs/ui";

export const TextEditorStyle: BoxProps = {
  width: "100%",
  minHeight: "400px",
  border: "1px solid lightgrey",
  p: "1rem",
  fontFamily: "rubik"
};

const TextEditor: FC<EditorProps> = ({ value, setValue }) => {
  return (
    <Box
      as="textarea"
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
      {...TextEditorStyle}
    />
  );
};

export default TextEditor;
