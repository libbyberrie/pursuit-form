import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Radio from "./fields/Radio";

export default function Form() {
  const { watch, register, handleSubmit } = useForm();

  const [submitValue, setSubmitValue] = useState();
  const onSubmit = (data) => {
    setSubmitValue(<pre>{JSON.stringify(data, null, 2)}</pre>);
  };

  const learningPlanStatus = watch("planned");
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Radio
          fieldName="planned"
          instruction="This course is identified in my Work Plan and Learning Agreement"
          options={["yes", "no"]}
          required={true}
          register={register}
        />
        <input type="submit" />
      </form>

      <pre>{submitValue}</pre>
    </>
  );
}
