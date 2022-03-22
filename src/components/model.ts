export type TextTypes = "text" | "email" | "password" | "textarea" | "date";
export type SelectTypes = "select" | "radio" | "checkbox" | "multiselect";
export type OptionType = {
  id: number;
  value: string;
};
export type InputTypes = TextTypes | SelectTypes;

export type formField = {
  id: number;
  label: string;
  value: string | string[];
  type: InputTypes;
  options?: OptionType[];
};

export interface formData {
  id: number;
  title: string;
  formFields: formField[];
}
