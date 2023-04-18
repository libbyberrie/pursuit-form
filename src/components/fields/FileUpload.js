import React from "react";

export default function FileUpload(props) {
  const { fieldName, instruction, detail, required, register } = { ...props };

  return (
    <div className="w-4/5 lg:w-3/4 mx-auto flex flex-col items-center justify-center gap-4">
      <label className="font-semibold" htmlFor={`${fieldName}-file`}>
        <span className="text-lg">{instruction}</span>
        {detail && (
          <span className="text-sm text-zinc-600 transition-all duration-500">
            <br />
            {detail}
          </span>
        )}
      </label>
      <input
        type="file"
        id={`${fieldName}-file`}
        className="form form-input relative my-2 block min-w-0 flex-auto rounded border border-pursuit-green-dark bg-clip-padding px-3 py-[0.32rem] text-base text-zinc-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-pursuit-green-light file:px-3 file:py-[0.32rem] file:text-zinc-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-pursuit-green hover:file:text-white focus:border-primary focus:text-zinc-800 focus:outline-none"
        name={fieldName}
        accept=".doc,.docx,.zip,.txt,.pdf"
        multiple={true}
        {...register(fieldName, { required: required })}
      />
    </div>
  );
}
