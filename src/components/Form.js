import React from "react";
import { Controller, useForm } from "react-hook-form";
import Radio from "./fields/Radio";

export default function Form() {
  const { watch, control, handleSubmit } = useForm();
  function onSubmit(data) {
    console.dir("did the thing");
    alert(JSON.stringify(data));
  }

  const learningPlanStatus = watch("planned");

  return (
    <>
      <h2>HELLO</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="planned"
          control={control}
          rules={{ required: true }}
          render={({ field }) => {
            return (
              <Radio
                fieldName="planned"
                instruction="This course is identified in my Work Plan and Learning Agreement"
                options={["yes", "no"]}
              />
            );
          }}
        />
      </form>
      <button type="submit">submit</button>
    </>
  );
}
