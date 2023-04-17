import React from "react";

export default function FileUpload(props) {
  const { fieldName, instruction, required, register } = { ...props };

  return (
    <div>
      <label htmlFor={`${fieldName}-file`}>{instruction}</label>
      <input
        type="file"
        id={`${fieldName}-file`}
        className="form form-input"
        name={fieldName}
        accept=".doc,.docx,.zip,.txt,.pdf"
        multiple={true}
        {...register(fieldName, { required: required })}
      />
    </div>
  );
}
