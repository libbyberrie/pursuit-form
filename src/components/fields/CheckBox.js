import React from "react";

export default function Checkbox(props) {
  const { fieldName, instruction, options, required, register } = { ...props };

  const optionButtons = options.map((entry, index) => {
    return (
      <div key={index}>
        <input
          type="checkbox"
          id={`${fieldName}-${index}`}
          className="form form-checkbox"
          name={fieldName}
          value={entry}
          {...register(fieldName, { required: required })}
        />
        <label htmlFor={`${fieldName}-${index}`}>{entry}</label>
      </div>
    );
  });
  return (
    <>
      <fieldset className="" required={required}>
        <legend>{instruction}</legend>
        <div className="flex flex-row gap-2">{optionButtons}</div>
      </fieldset>
    </>
  );
}
