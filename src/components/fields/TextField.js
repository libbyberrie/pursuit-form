import React from "react";
import "./DynamicLabels.css";

export default function TextField(props) {
  const { fieldName, instruction, detail, required, disabled, register } = {
    ...props,
  };

  return (
    <div className="dynamic-label group relative z-0 mt-3 rounded-md border-4 cursor-text border-pursuit-green-light bg-transparent p-0 transition-all">
      <textarea
        id={`${fieldName}-input`}
        className="form form-textarea peer w-full outline-none focus:outline-none peer  min-h-[8rem] md:min-h-[7rem] disabled:cursor-disabled block rounded-md border-none bg-transparent p-4 text-zinc-800 disabled:opacity-20"
        name={fieldName}
        placeholder="&nbsp;"
        {...register(fieldName, {
          required: "This field is required",
          disabled: disabled,
        })}
      />
      <label
        className="pointer-events-none font-semibold transition-all absolute ease-in-out top-[50%] -translate-y-1/2 left-2  text-zinc-800  -z-1 origin-0 text-base duration-300 drop-shadow-none"
        htmlFor={`${fieldName}-input`}
      >
        <span className="bg-white md:p-2 text-base md:text-lg">
          {required && <span>*</span>}
          {instruction}
        </span>
        {detail && (
          <span className="detail md:pl-2 -mt-5 block text-xs md:text-sm text-zinc-600 transition-all duration-500">
            <br />
            {detail}
          </span>
        )}
      </label>
    </div>
  );
}
