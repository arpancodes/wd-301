export type TextTypes = "text" | "email" | "password" | "textarea" | "date";
export type SelectTypes = "select" | "radio" | "checkbox" | "multiselect";
export type OptionType = {
  id: number;
  value: string;
};

export type TextField = {
  id: number;
  label: string;
  value: string;
  type: TextTypes;
}

export type SelectField = {
  id: number;
  label: string;
  value: string | string[];
  type: SelectTypes;
  options: OptionType[];
};

export type formField = SelectField | TextField;

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}
