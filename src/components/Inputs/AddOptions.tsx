import React from "react";
import { OptionType } from "../model";

type AddOptionProps = {
  options: OptionType[];
  optionAddHandler: (options: OptionType[], option: OptionType) => OptionType[];
  optionRemoveHandler: (
    options: OptionType[],
    option: OptionType
  ) => OptionType[];
  optionChangeHandler: (
    options: OptionType[],
    option: OptionType,
    value: string
  ) => OptionType[];
  stateSetFunction: (options: OptionType[]) => void;
};
const AddOptions = (props: AddOptionProps) => {
  return (
    <div className="w-full mx-auto">
      {props.options.map((option) => {
        return (
          <div>
            <input
              className="border-2 border-gray-200 rounded-lg p-2 mx-2 w-full"
              type="text"
              value={option.value}
              placeholder="Option Value"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                props.stateSetFunction(
                  props.optionChangeHandler(
                    props.options,
                    option,
                    e.target.value
                  )
                )
              }
            />
            <button
              className="w-1/5 text-red-500 float-right mb-4"
              onClick={() =>
                props.stateSetFunction(
                  props.optionRemoveHandler(props.options, option)
                )
              }
            >
              Remove
            </button>
          </div>
        );
      })}
      <button
        className="p-2 border rounded-md mt-4"
        onClick={() =>
          props.stateSetFunction(
            props.optionAddHandler(props.options, {
              id: Number(new Date()),
              value: "",
            })
          )
        }
      >
        Add Option
      </button>
    </div>
  );
};

export default AddOptions;
