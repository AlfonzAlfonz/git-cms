import React, { FC, useMemo, useState, Dispatch } from "react";
import { Box, Flex, Strong, Em, BoxProps } from "@xcorejs/ui";
import { TextEditorStyle } from "../TextEditor";
import { Slate, Editable, withReact } from "slate-react";
import { createEditor, Node } from "slate";

interface Props {
  value: Node[];
  set: Dispatch<Node[]>;
}

const SlateEditor: FC<Props> = ({ value, set }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Box {...TextEditorStyle}>
      <Flex borderBottom="1px solid lightgrey" mt="-1rem" mx="-.5rem" mb="1rem">
        <Box {...ButtonStyle}><Strong>B</Strong></Box>
        <Box {...ButtonStyle}><Em>I</Em></Box>
        <Box p="1rem" color="lightgrey" _after={{ content: "'|'" }} />
        <Box {...ButtonStyle}>a</Box>
        <Box {...ButtonStyle}>Text</Box>
      </Flex>
      <Slate editor={editor} value={value} onChange={set}>
        <Editable />
      </Slate>
    </Box>
  );
};

export default SlateEditor;

const ButtonStyle: BoxProps = {
  p: "1rem",
  cursor: "pointer"
};
