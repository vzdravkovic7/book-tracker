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
      onChange: options.disableEmail ? () => {} : handleChange,
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

export const baseBookFields = (
  form: any,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
): FormField[] => [
  { name: "title", label: "Title", value: form.title, onChange: handleChange, required: true },
  { name: "author", label: "Author", value: form.author, onChange: handleChange, required: true },
  { name: "genre", label: "Genre", value: form.genre, onChange: handleChange, required: true },
  { name: "rating", label: "Rating (1-5)", value: form.rating?.toString() ?? "", onChange: handleChange, required: false },
];

export const dateCompletedField = (
  form: any,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
): FormField => ({
  name: "dateCompleted",
  label: "Date Completed",
  value: form.dateCompleted ?? "",
  onChange: handleChange,
  required: false,
  type: "date",
});
