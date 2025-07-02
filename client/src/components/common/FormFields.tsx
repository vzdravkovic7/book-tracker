import React from "react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

type FieldType = "text" | "email" | "password" | "number" | "date";

export interface FormField {
  name: string;
  label: string;
  type?: FieldType;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  showError?: boolean;
}

interface Props {
  fields: FormField[];
}

const FormFields: React.FC<Props> = ({ fields }) => {
  return (
    <>
      {fields.map((field) => {
        if (field.type === "password") {
          return (
            <PasswordInput
              key={field.name}
              name={field.name}
              label={field.label}
              value={String(field.value)}
              onChange={field.onChange}
              required={field.required}
              showError={field.showError}
            />
          );
        }

        return (
          <TextInput
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={field.value}
            onChange={field.onChange}
            required={field.required}
          />
        );
      })}
    </>
  );
};

export default FormFields;
