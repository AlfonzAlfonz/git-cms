export type FieldType = "string" | "richtext";

export type FieldConfig =
  & StringFieldConfig
  & RichtextFieldConfig;

export interface BaseFieldConfig {
  type: FieldType;
  label: string;
}

export interface StringFieldConfig extends BaseFieldConfig {
  type: "string";
  as: "input" | "textarea";
}

export interface RichtextFieldConfig extends BaseFieldConfig {
  type: "string";
  as: "input" | "textarea";
}
