import React from "react";
import "./DynamicLabels.css";

export default function Radio(props) {
  const { fieldName, instruction, options, required, detail, register } = {
    ...props,
  };

  const optionButtons = options.map((entry, index) => {
    return (
      <div key={index}>
        <input
          type="radio"
          id={`${fieldName}-${index}`}
          className="form form-radio peer w-8 h-8 mr-2  checked:bg-pursuit-green-dark"
          name={fieldName}
          value={entry}
          onChange={(e) => {
            e.target.setAttribute("aria-invalid", !e.target.reportValidity);
          }}
          {...register(fieldName, { required: "This field is required" })}
        />
        <label
          className="text-xl text-zinc-500 peer-checked:text-zinc-800  peer-indeterminate:text-zinc-600 transition-all duration-200"
          htmlFor={`${fieldName}-${index}`}
        >
          {entry}
        </label>
      </div>
    );
  });
  return (
    <>
      <fieldset
        className="flex flex-col-reverse group items-start justify-center gap-4 dynamic-label"
        required={required}
      >
        <legend className="text-zinc-800 font-semibold mx-auto mb-2 peer-invalid:text-rose-600">
          {instruction}
          {detail && (
            <span className="detail text-sm text-zinc-600">
              <br />
              {detail}
            </span>
          )}
        </legend>
        <div className="flex flex-row gap-4">{optionButtons}</div>
      </fieldset>
    </>
  );
}
