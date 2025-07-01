import type { FormField } from "../components/common/FormFields";

interface FieldOptions {
  disableEmail?: boolean;
}

export const baseUserFields = (
  form: any,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  options: FieldOptions = {}
): FormField[] => {
  const fields: FormField[] = [
    { name: "firstName", label: "First Name", value: form.firstName, onChange: handleChange, required: true },
    { name: "lastName", label: "Last Name", value: form.lastName, onChange: handleChange, required: true },
    { name: "address", label: "Address", value: form.address, onChange: handleChange, required: true },
    { name: "phoneNumber", label: "Phone Number", value: form.phoneNumber, onChange: handleChange, required: true },
    { name: "username", label: "Username", value: form.username, onChange: handleChange, required: true },
    {
      name: "email",
      type: "email",
      label: "Email",
      value: form.email,
      onChange: options.disableEmail? () => {} : handleChange,
      required: true
    },
  ];

  return fields;
};

export const passwordFields = (
  password: string,
  confirmPassword: string,
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
): FormField[] => [
  {
    name: "password",
    type: "password",
    label: "Password",
    value: password,
    onChange: handleChange,
    required: true,
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    value: confirmPassword,
    onChange: (e) => setConfirmPassword(e.target.value),
    required: true,
    showError: password !== confirmPassword,
  },
];
