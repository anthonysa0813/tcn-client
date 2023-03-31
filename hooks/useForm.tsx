import React, { useState } from "react";

const useForm = <T extends Object>(initialState: T) => {
  const [form, setForm] = useState(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return {
    form,
    onChange,
    ...form,
  };
};

export default useForm;
