import React, { FC } from "react";
import { EditorConfig } from "utils/dotconfig";
import { useLocalStorage } from "utils/useLocalStorage";

import TextEditor from "./TextEditor";
import { DocumentEditor } from "./DocumentEditor";

export type EditorProps = {
  value: string;
  setValue: (v: string) => unknown;
  config: EditorConfig;
};

const DynamicForm: FC<{file: string; filename: string; config: EditorConfig}> = ({ filename, file, config }) => {
  const [value, setValue] = useLocalStorage("file://" + filename, file);

  switch (config.type) {
    case "text": return <TextEditor value={value} setValue={setValue} config={config} />;
    case "document": return <DocumentEditor value={value} setValue={setValue} config={config} />;
    default: return <>Invalid editor</>;
  }
};

export default DynamicForm;
