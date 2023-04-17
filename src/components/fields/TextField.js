import React from "react";

export default function TextField(props) {
  const { fieldName, instruction, required, register } = { ...props };

  return (
    <div>
      <label htmlFor={`${fieldName}-input`}>{instruction}</label>
      <textarea
        id={`${fieldName}-input`}
        className="form form-textarea"
        name={fieldName}
        {...register(fieldName, { required: required })}
      />
    </div>
  );
}
