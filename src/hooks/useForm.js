import { useState } from "react";

export function useForm(initialState) {
  const [values, setValues] = useState(initialState);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...initialState });
    setShowSuccess(true);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    showSuccess,
    closeSuccess: () => setShowSuccess(false),
  };
}
