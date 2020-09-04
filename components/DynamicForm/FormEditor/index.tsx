import { Stack } from "@xcorejs/ui";
import React, { FC } from "react";
import { useJSON } from "utils/useJSON";

import { EditorProps } from "..";
import FormField from "./FormField";

const FormEditor: FC<EditorProps> = ({ value, setValue, config }) => {
  const [formValue, setFormValue] = useJSON<Record<string, any>>(value, setValue);

  return (
    <Stack gap="3rem" direction="column">
      {Object.keys(formValue).map(k => (
        <FormField
          key={k}
          name={k}
          value={formValue[k]}
          set={v => setFormValue(s => ({ ...s, [k]: v }))}
          config={(config as any).fields[k]}
        />
      ))}
    </Stack>
  );
};

export default FormEditor;
