import React, { FC } from "react";
import { EditorConfig } from "utils/dotconfig";
import { useLocalStorage } from "utils/useLocalStorage";

import TextEditor from "./TextEditor";
import { DocumentEditor } from "./DocumentEditor";
import FormEditor from "./FormEditor";

export type EditorProps = {
  value: string;
  setValue: (v: string) => unknown;
  config: EditorConfig;
};

const DynamicForm: FC<{file: string; filename: string; config: EditorConfig}> = ({ filename, file, config }) => {
  const [value, setValue] = useLocalStorage("file://" + filename, file);
  const props = { value, setValue, config };

  switch (config.type) {
    case "text": return <TextEditor {...props} />;
    case "document": return <DocumentEditor {...props} />;
    case "form": return <FormEditor {...props} />;
    default: return <>Invalid editor</>;
  }
};

export default DynamicForm;
