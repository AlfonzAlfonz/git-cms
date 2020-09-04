import React, { FC, useMemo } from "react";
import { createEditor, Node } from "slate";
import { withReact } from "slate-react";
import { useJSON } from "utils/useJSON";

import { EditorProps } from "..";
import SlateEditor from "./SlateEditor";

export const DocumentEditor: FC<EditorProps> = ({ value, setValue }) => {
  const [editorValue, setEditorValue] = useJSON<Node[]>(value, setValue);

  return <SlateEditor value={editorValue} set={setEditorValue} />;
};
