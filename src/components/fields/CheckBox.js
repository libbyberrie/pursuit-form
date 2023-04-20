import React from "react";

export default function Checkbox(props) {
  const {
    fieldName,
    instruction,
    options,
    required,
    disabled,
    detail,
    register,
  } = {
    ...props,
  };
  console.dir(register);
  const optionButtons = options.map((entry, index) => {
    return (
      <div key={index} className="flex items-center justify-start">
        <input
          type="checkbox"
          id={`${fieldName}-${index}`}
          className="form form-checkbox mr-2 h-8 w-8 rounded-xl transition-all duration-300 border-pursuit-green hover:bg-pursuit-green-light  active:bg-pursuit-green-dark bg-transparent checked:bg-pursuit-green checked:border-pursuit-green-light"
          name={fieldName}
          value={entry}
          {...register(fieldName, {
            required: required && "This field is required",
            disabled: disabled,
          })}
        />
        <label className="text-base" htmlFor={`${fieldName}-${index}`}>
          {entry}
        </label>
      </div>
    );
  });
  return (
    <>
      <fieldset
        required={required}
        className=" border-pursuit-green-light border-4 rounded-md p-4 pb-8"
      >
        <legend className="text-lg leading-tight font-semibold bg-white p-4 ">
          {required && <span>*</span>}
          {instruction}
          {detail && (
            <span className="detail text-sm text-zinc-600">
              <br />
              {detail}
            </span>
          )}
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 md:gap-4 lg:gap-6">
          {optionButtons}
        </div>
      </fieldset>
    </>
  );
}
