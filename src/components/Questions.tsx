import { navigate } from "raviger";
import React, { useEffect, useState } from "react";
import { getLocalForms, saveFormData } from "./Form";
import Select from "./Inputs/Select";
import Text from "./Inputs/Text";
import { formData, OptionType, SelectTypes, TextTypes } from "./model";

const Questions = (props: { id: any; qno: any }) => {
  const [form, setForm] = useState<formData>();

  useEffect(() => {
    const _form = getLocalForms().find((form) => form.id === props.id);
    if (_form) {
      setForm(_form);
    }
  }, [props.id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (form) saveFormData(form, props.id);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [form, props.id]);

  if (!form) return <div>Error finding form!</div>;
  return (
    <div>
      <div className="">
        <div className="text-2xl">
          <h1 className="p-4 border-gray-200 border-b ">{form?.title}</h1>
        </div>
        <div className="w-full my-8">
          <div className="flex w-full justify-between items-end">
            <span className="w-full text-lg px-2">
              {form?.formFields[props.qno]?.label}
            </span>
          </div>
          {form?.formFields[props.qno]?.type === "select" ||
          form?.formFields[props.qno]?.type === "radio" ||
          form?.formFields[props.qno]?.type === "checkbox" ||
          form?.formFields[props.qno]?.type === "multiselect" ? (
            <Select
              type={form?.formFields[props.qno]?.type as SelectTypes}
              value={form?.formFields[props.qno]?.value}
              label={form?.formFields[props.qno]?.label}
              changeHandler={(
                e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
              ) => {
                setForm({
                  ...form,
                  formFields: form.formFields.map((item, idx) => {
                    if (idx === Number(props.qno)) {
                      return { ...item, value: e.target.value };
                    }
                    return item;
                  }),
                });
              }}
              options={form?.formFields[props.qno]?.options as OptionType[]}
            />
          ) : form?.formFields[props.qno]?.type === "text" ||
            form?.formFields[props.qno]?.type === "email" ||
            form?.formFields[props.qno]?.type === "password" ||
            form?.formFields[props.qno]?.type === "date" ||
            form?.formFields[props.qno]?.type === "textarea" ? (
            <Text
              type={form?.formFields[props.qno]?.type as TextTypes}
              value={form?.formFields[props.qno]?.value}
              label={form?.formFields[props.qno]?.label}
              changeHandler={(
                e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setForm({
                  ...form,
                  formFields: form.formFields.map((item, idx) => {
                    if (idx === Number(props.qno)) {
                      return { ...item, value: e.target.value };
                    }
                    return item;
                  }),
                });
              }}
              placeholder={form?.formFields[props.qno]?.label}
            />
          ) : (
            <></>
          )}
          {/* <input
            className="border-2 border-gray-200 rounded-lg p-2 m-2 w-full"
            type={form?.formFields[props.qno]?.type}
            value={form?.formFields[props.qno]?.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setForm({
                ...form,
                formFields: form.formFields.map((item, idx) => {
                  if (idx === Number(props.qno)) {
                    return { ...item, value: e.target.value };
                  }
                  return item;
                }),
              });
            }}
            placeholder={form?.formFields[props.qno]?.label}
          /> */}
        </div>

        <div className="flex justify-center gap-2">
          <button
            className="bg-red-600 disabled:bg-gray-600 text-white rounded-lg p-2 m-2 w-full"
            onClick={() =>
              navigate(`/preview/${props.id}/${Number(props.qno) - 1}`)
            }
            disabled={props.qno <= 0}
          >
            Prev
          </button>
          {form?.formFields && props.qno >= form.formFields.length - 1 ? (
            <button className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full">
              Submit
            </button>
          ) : (
            <button
              className="bg-blue-600 text-white rounded-lg p-2 m-2 w-full"
              onClick={() =>
                navigate(`/preview/${props.id}/${Number(props.qno) + 1}`)
              }
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questions;
