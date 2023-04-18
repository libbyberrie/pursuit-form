import React from "react";
import "./LabelAnimation.css";

export default function TextField(props) {
  const { fieldName, instruction, detail, required, disabled, register } = {
    ...props,
  };

  return (
    <div className="dynamic-label group relative z-0 mt-3 rounded-md border-4 cursor-text border-pursuit-green bg-transparent p-0 transition-all">
      <textarea
        id={`${fieldName}-input`}
        className="form form-textarea peer w-full outline-none focus:outline-none peer min-h-[7rem] disabled:cursor-disabled block rounded-md border-none bg-transparent p-4 text-zinc-800 disabled:opacity-20"
        name={fieldName}
        placeholder="&nbsp;"
        {...register(fieldName, { required: required, disabled: disabled })}
      />
      <label
        className="pointer-events-none font-semibold transition-all absolute ease-in-out top-[50%] -translate-y-1/2 left-2  text-zinc-800  -z-1 origin-0 text-base duration-300 drop-shadow-none"
        htmlFor={`${fieldName}-input`}
      >
        <span className="bg-white p-2 text-lg">{instruction}</span>
        {detail && (
          <span className="detail pl-2 -mt-5 block text-sm text-zinc-600 transition-all duration-500">
            <br />
            {detail}
          </span>
        )}
      </label>
    </div>
  );
}
