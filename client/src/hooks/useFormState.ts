import { useState } from "react";

type FormState<T> = {
  form: T;
  setForm: React.Dispatch<React.SetStateAction<T>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useFormState<T extends Record<string, any>>(initialState: T): FormState<T> {
  const [form, setForm] = useState<T>(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { form, setForm, handleChange };
}
