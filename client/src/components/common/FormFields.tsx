import React from "react";
import TextInput from "./TextInput";
import PasswordInput from "./PasswordInput";

type FieldType = "text" | "email" | "password";

export interface FormField {
  name: string;
  label: string;
  type?: FieldType;
  value: string;
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
      {fields.map((field) =>
        field.type === "password" ? (
          <PasswordInput key={field.name} {...field} />
        ) : (
          <TextInput key={field.name} {...field} />
        )
      )}
    </>
  );
};

export default FormFields;
