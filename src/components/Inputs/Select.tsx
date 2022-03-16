import React from "react";
import { OptionType, SelectTypes } from "../model";

interface SelectInputProps {
  type: SelectTypes;
  value: string | string[];
  changeHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  label: string;
  options: OptionType[];
}

const Select = ({
  type,
  value,
  changeHandler,
  label,
  options,
}: SelectInputProps) => {
  return (
    <div>
      {type === "select" ? (
        <select
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          value={value}
          onChange={changeHandler}
        >
          <option value="">Select an Option</option>
          {options.map((op) => {
            return (
              <option key={op.id} value={op.value}>
                {op.value}
              </option>
            );
          })}
        </select>
      ) : type === "radio" ? (
        options.map((option) => (
          <label key={option.id}>
            <input
              type={type}
              value={option.value}
              name={label}
              onChange={changeHandler}
            />
            {option.value}
          </label>
        ))
      ) : type === "checkbox" ? (
        options.map((option) => (
          <label key={option.id}>
            <input
              type={type}
              value={option.value}
              name={label}
              onChange={changeHandler}
            />
            {option.value}
          </label>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Select;
