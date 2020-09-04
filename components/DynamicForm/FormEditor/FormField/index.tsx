import React, { FC, Dispatch } from "react";
import { Typography, Box, BoxProps } from "@xcorejs/ui";
import StringField from "./StringField";
import SlateEditor from "components/DynamicForm/DocumentEditor/SlateEditor";
import { FieldType, FieldConfig } from "./data";

interface Props {
  name: string;
  value: any;
  set: Dispatch<any>;
  config: FieldType | FieldConfig;
}

const FormField: FC<Props & BoxProps> = ({ name, value, set, config: c, ...props }) => {
  const config = getConfig(c, name);

  const field = () => {
    switch (config.type) {
      case "string": return <StringField value={value} set={set} config={config as any} />;
      case "richtext": return <SlateEditor value={value} set={set} />;
      default: return <>:(</>;
    }
  };

  return (
    <Box {...props} mx="2rem">
      <Typography as={"label" as any} lineHeight={2}>{capitalize(config.label)}</Typography>
      {field()}
    </Box>
  );
};

export default FormField;

const getConfig = (config: FieldType | FieldConfig, label: string) =>
  typeof config === "string"
    ? {
      type: config,
      label
    }
    : {
      ...config,
      label: config.label ?? label
    };

const capitalize = (s: string) => s.split("-").map(_cap);
const _cap = (s: string) => s[0].toLocaleUpperCase() + s.slice(1);
