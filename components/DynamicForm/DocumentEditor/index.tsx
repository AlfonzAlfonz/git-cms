import React, { FC, useEffect, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";

import { EditorProps } from "..";
import { Box, Strong, Flex, Em, BoxProps } from "@xcorejs/ui";
import { TextEditorStyle } from "../TextEditor";

const ButtonStyle: BoxProps = {
  p: "1rem",
  cursor: "pointer"
};

export const DocumentEditor: FC<EditorProps> = ({ value, setValue }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [editorValue, setEditorValue] = useState<Node[]>(() => JSON.parse(value));

  useEffect(() => {
    const id = setInterval(() => setValue(JSON.stringify(editorValue)), 1000);

    return () => {
      clearInterval(id);
    };
  });

  return (
    <Box {...TextEditorStyle}>
      <Flex borderBottom="1px solid lightgrey" mt="-1rem" mx="-.5rem" mb="1rem">
        <Box {...ButtonStyle}><Strong>B</Strong></Box>
        <Box {...ButtonStyle}><Em>I</Em></Box>
        <Box p="1rem" color="lightgrey" _after={{ content: "'|'" }} />
        <Box {...ButtonStyle}>a</Box>
        <Box {...ButtonStyle}>Text</Box>
      </Flex>
      <Slate editor={editor} value={editorValue} onChange={setEditorValue}>
        <Editable />
      </Slate>
    </Box>
  );
};
