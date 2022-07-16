import { useState } from "react";

export const useForm = (initialForm) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const resetForm = () => {
    setForm(initialForm);
  }

  return { form, handleChange, resetForm, ...form };
};
