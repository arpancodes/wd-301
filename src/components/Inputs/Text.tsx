import React, { HtmlHTMLAttributes } from "react";
import { TextTypes } from "../model";

interface TextInputProps {
  type: TextTypes;
  value: string;
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder: string;
  label: string;
}
const Text = ({
  type,
  value,
  changeHandler,
  placeholder,
  label,
}: TextInputProps) => {
  return (
    <label>
      {type === "textarea" ? (
        <textarea
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          value={value}
          onChange={changeHandler}
          placeholder={placeholder}
          rows={5}
        ></textarea>
      ) : (
        <input
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          type={type}
          value={value}
          onChange={changeHandler}
          placeholder={placeholder}
        />
      )}
    </label>
  );
};

export default Text;
