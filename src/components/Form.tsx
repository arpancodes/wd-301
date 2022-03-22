import { navigate } from "raviger";
import React, { useEffect, useRef } from "react";
import AddOptions from "./Inputs/AddOptions";
import {
  formData,
  formField,
  OptionType,
  SelectTypes,
  TextTypes,
} from "./model";

const formFields: formField[] = [
  { id: 1, label: "First Name", type: "text", value: "" },
  { id: 2, label: "Last Name", type: "text", value: "" },
  { id: 3, label: "Email", type: "email", value: "" },
  { id: 4, label: "Date of Birth", type: "date", value: "" },
];

export const getLocalForms: () => formData[] = () => {
  const localForms = localStorage.getItem("forms");
  if (localForms) {
    return JSON.parse(localForms);
  } else {
    return [];
  }
};

const intialState: (formId: number) => formData = (formId) => {
  const localForms = getLocalForms();
  const form = localForms.find((form) => form.id === formId);
  if (form) {
    return form;
  }

  const newForm = {
    id: formId,
    title: "Untitled Form",
    formFields: formFields,
  };
  saveLocalForms([...localForms, newForm]);
  return newForm;
};

const saveLocalForms = (formData: formData[]) => {
  localStorage.setItem("forms", JSON.stringify(formData));
};

export const saveFormData = (formData: formData, formId: number) => {
  const localForms = getLocalForms();
  const updatedForms = localForms.map((form) => {
    return form.id === formId ? formData : form;
  });
  saveLocalForms(updatedForms);
};

export default function Form(props: { formId: number }) {
  const [formState, setFormState] = React.useState<formData>(() =>
    intialState(props.formId)
  );
  const [newField, setNewField] = React.useState<formField>({
    id: Number(Date.now()),
    label: "",
    type: "text",
    value: "",
  });
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const oldTitle = document.title;
    document.title = `Form Builder`;
    titleRef.current?.focus();
    return () => {
      document.title = oldTitle;
    };
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      saveFormData(formState, props.formId);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [formState, props.formId]);

  const optionAddHandler = (options: OptionType[], newOption: OptionType) => {
    const newOptions = [...options, newOption];
    return newOptions;
  };

  const optionRemoveHandler = (options: OptionType[], option: OptionType) => {
    const newOptions = options.filter((opt) => opt.id !== option.id);
    return newOptions;
  };

  const optionChangeHandler = (
    options: OptionType[],
    option: OptionType,
    value: string
  ) => {
    const newOptions = options.map((opt) => {
      return opt.id === option.id ? { ...opt, value } : opt;
    });
    return newOptions;
  };

  const clearFormCB = () => {
    setFormState({
      ...formState,
      formFields: formState.formFields.map((field) => ({
        ...field,
        value: "",
      })),
    });
  };

  return (
    <div className="flex flex-col  items-center">
      <input
        type="text"
        value={formState.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFormState({ ...formState, title: e.target.value });
        }}
        className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
        placeholder="Form Title"
        ref={titleRef}
      />
      <div className="flex w-full">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
        >
          Close Form
        </button>
        <button
          onClick={clearFormCB}
          className="bg-gray-600 text-white rounded-lg p-2 m-2 w-full"
        >
          Clear Form
        </button>
      </div>
      {formState.formFields.map((field) => (
        <React.Fragment key={field.id}>
          <div>
            <span className="w-full text-sm px-2">Field Name</span>
            <input
              className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
              type={"text"}
              value={field.label}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFormState({
                  ...formState,
                  formFields: formState.formFields.map((item) => {
                    if (item.id === field.id) {
                      return { ...item, label: e.target.value };
                    }
                    return item;
                  }),
                });
              }}
              placeholder={field.label}
            />
            <span className="w-full text-sm px-2">Field Type</span>
            <select
              className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
              value={field.type}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setFormState({
                  ...formState,
                  formFields: formState.formFields.map((item) => {
                    const type = e.target.value as SelectTypes | TextTypes;
                    if (item.id === field.id) {
                      if (
                        type === "select" ||
                        type === "radio" ||
                        type === "checkbox" ||
                        type === "multiselect"
                      ) {
                        return { ...item, type, options: [] };
                      }
                      return { ...item, type } as formField;
                    }
                    return item;
                  }),
                });
              }}
            >
              <option value={"text"}>Text</option>
              <option value={"email"}>Email</option>
              <option value={"date"}>Date</option>
              <option value={"password"}>Password</option>
              <option value={"textarea"}>Text Area</option>
              <option value={"select"}>Dropdown</option>
              <option value={"radio"}>Radio Button</option>
              <option value={"checkbox"}>Checkbox</option>
              <option value={"multiselect"}>Multi-Select Dropdown</option>
            </select>
            {field.type &&
            (field.type === "select" ||
              field.type === "radio" ||
              field.type === "checkbox" ||
              field.type === "multiselect") &&
            field.options ? (
              <AddOptions
                options={field.options}
                optionAddHandler={optionAddHandler}
                optionRemoveHandler={optionRemoveHandler}
                stateSetFunction={(options: OptionType[]) =>
                  setFormState({
                    ...formState,
                    formFields: formState.formFields.map((item) => {
                      if (item.id === field.id) {
                        return { ...item, options };
                      }
                      return item;
                    }),
                  })
                }
                optionChangeHandler={optionChangeHandler}
              />
            ) : (
              <></>
            )}
          </div>
          <button
            className="bg-red-600 text-white rounded-lg p-2 m-2"
            onClick={() =>
              setFormState(() => {
                const newState = formState.formFields.filter(
                  (item) => item.id !== field.id
                );
                return { ...formState, formFields: newState };
              })
            }
          >
            Remove
          </button>
        </React.Fragment>
      ))}
      {/* Button to add Form Item */}
      <div className="flex w-full justify-between items-end">
        <input
          type="text"
          value={newField.label}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewField({ ...newField, label: e.target.value })
          }
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          placeholder="Add New Field"
        />
        <select
          className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
          value={newField?.type}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            const type = e.target.value as SelectTypes | TextTypes;
            if (
              type === "select" ||
              type === "radio" ||
              type === "checkbox" ||
              type === "multiselect"
            ) {
              return setNewField({ ...newField, type, options: [] });
            }
            return setNewField({ ...newField, type } as formField);
          }}
        >
          <option value={"text"}>Text</option>
          <option value={"email"}>Email</option>
          <option value={"date"}>Date</option>
          <option value={"password"}>Password</option>
          <option value={"textarea"}>Text Area</option>
          <option value={"select"}>Dropdown</option>
          <option value={"radio"}>Radio Button</option>
          <option value={"checkbox"}>Checkbox</option>
          <option value={"multiselect"}>Multi-Select Dropdown</option>
        </select>
        <button
          className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
          onClick={() => {
            let newFormField;
            if (
              newField.type === "select" ||
              newField.type === "radio" ||
              newField.type === "checkbox" ||
              newField.type === "multiselect"
            ) {
              newFormField = {
                id: Number(Date.now()),
                label: newField?.label,
                value: newField?.type === "multiselect" ? [] : "",
                type: newField?.type,
                options: newField?.options,
              };
            } else if (
              newField.type === "text" ||
              newField.type === "email" ||
              newField.type === "password" ||
              newField.type === "textarea" ||
              newField.type === "date"
            ) {
              newFormField = {
                id: Number(Date.now()),
                label: newField?.label,
                value: newField?.value,
                type: newField?.type,
              };
            } else return;

            setFormState({
              ...formState,
              formFields: [
                ...(formState.formFields as formField[]),
                newFormField,
              ],
            });
            setNewField({
              id: Number(Date.now()),
              label: "",
              type: "text",
              value: "",
            });
          }}
        >
          Add Field
        </button>
      </div>
      {newField.type &&
      (newField.type === "select" ||
        newField.type === "radio" ||
        newField.type === "checkbox" ||
        newField.type === "multiselect") &&
      newField.options ? (
        <AddOptions
          options={newField.options}
          optionAddHandler={optionAddHandler}
          optionRemoveHandler={optionRemoveHandler}
          stateSetFunction={(options: OptionType[]) =>
            setNewField({ ...newField, options })
          }
          optionChangeHandler={optionChangeHandler}
        />
      ) : (
        <></>
      )}
      <button
        className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
        onClick={() => {
          saveFormData(formState, props.formId);
        }}
      >
        Save
      </button>
    </div>
  );
}
