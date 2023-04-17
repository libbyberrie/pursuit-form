import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import Radio from "../fields/Radio";
import Checkbox from "../fields/CheckBox";
import TextField from "../fields/TextField";
import FileUpload from "../fields/FileUpload";

export default function Form() {
  const { watch, register, handleSubmit } = useForm();
  const [submitValue, setSubmitValue] = useState();

  const onSubmit = (data) => {
    console.dir(data.documentation);
    setSubmitValue(<pre>{JSON.stringify(data, null, 2)}</pre>);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: submitValue,
    })
      .then(() => console.log("Form successfully submitted"))
      .catch((error) => alert(error));
  };

  const learningAgreementValue = watch("work-plan-approval");

  const reasonRequirement = useMemo(() => {
    switch (learningAgreementValue) {
      case "no":
        return true;
      default:
        return false;
    }
  }, [learningAgreementValue]);

  const accessibilityValue = watch("adjustments-required");

  const accessibilityRequirement = useMemo(() => {
    switch (accessibilityValue) {
      case "yes":
        return true;
      default:
        return false;
    }
  }, [accessibilityValue]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 p-4"
        method="POST"
        netlify="true"
        encType="multipart/form-data"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        name="Registration request"
        id="registration-request"
      >
        <input type="hidden" name="form-name" value="enquiry" />

        <Radio
          fieldName="work-plan-approval"
          instruction="This course is identified in my Work Plan and Learning Agreement"
          options={["yes", "no"]}
          required={true}
          register={register}
        />
        <Checkbox
          fieldName="reasons"
          instruction="I am attending this session because (tick all that apply)"
          options={[
            "It will help me develop the skills and knowledge required for my current role",
            "It will help me develop the skills and knowledge for a possible future role/body of work",
            "It was identified as a need during my performance management discussions",
            "My manager recommended that I attend",
            "I am interested in the content",
          ]}
          required={reasonRequirement}
          register={register}
        />
        <TextField
          fieldName="aims"
          instruction="What would you like to achieve as a result of your attendance? For example, 'I would like to learn to write better emails to improve my communication skills'."
          required={false}
          register={register}
        />
        <Radio
          fieldName="adjustments-required"
          instruction="Do you require adjustments or additions to the session delivery to support your participation? For example, hearing loop or wheelchair access"
          options={["yes", "no"]}
          required={false}
          register={register}
        />
        <TextField
          fieldName="accessibility-details"
          instruction="Please provide details of your requirements."
          required={accessibilityRequirement}
          register={register}
        />
        <FileUpload
          instruction="Please upload any supporting documentation to support your registration request"
          fieldName="documentation"
          required="false"
          register={register}
        />
        <input type="submit" />
      </form>

      <pre>{submitValue}</pre>
    </>
  );
}
