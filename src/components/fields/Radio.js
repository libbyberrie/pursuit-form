import React, { forwardRef } from "react";

const Radio = forwardRef(function Radio(props, ref) {
  const { fieldName, instruction, options, required } = { ...props };

  const optionButtons = options.map((entry, index) => {
    return (
      <div key={index}>
        <input
          type="radio"
          id={`${fieldName}-${index}`}
          className="form form-radio"
          name={fieldName}
          value={entry}
          ref={ref}
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
});

export default Radio;
