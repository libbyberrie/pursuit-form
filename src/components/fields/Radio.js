import React from "react";

export default function Radio(props) {
  const { fieldName, instruction, options, required } = { ...props };
  console.dir(options);

  const optionButtons = options.map((entry, index) => {
    return (
      <div key={index}>
        <input
          type="radio"
          id={`${fieldName}-${index}`}
          className="form form-radio"
          name={fieldName}
          value={entry}
        />
        <label htmlFor={`${fieldName}-${index}`}>{entry}</label>
      </div>
    );
  });
  return (
    <>
      <fieldset className="outline outline-black py-12" required={required}>
        <legend>{instruction}</legend>
        <div className="flex flex-row gap-2">{optionButtons}</div>
      </fieldset>
    </>
  );
}
