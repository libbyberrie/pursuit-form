/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNetlifyForms } from "../hooks/use-netlify-forms";

import Radio from "../fields/Radio";
import Checkbox from "../fields/CheckBox";
import TextField from "../fields/TextField";
import FileUpload from "../fields/FileUpload";

export default function Form() {
  const { watch, register, handleSubmit } = useForm();
  const { sendIt, responseMessage, sentStatus } = useNetlifyForms();

  const onSubmit = (data, e) => {
    e.preventDefault();
    sendIt(data, e);
  };

  const learningAgreementValue = watch("work-plan-approval");
  const accessibilityValue = watch("adjustments-required");

  const reasonRequirement = useMemo(() => {
    switch (learningAgreementValue) {
      case "no":
        return true;
      default:
        return false;
    }
  }, [learningAgreementValue]);
  const accessibilityRequirement = useMemo(() => {
    switch (accessibilityValue) {
      case "yes":
        return true;
      default:
        return false;
    }
  }, [accessibilityValue]);

  const showOnValue = useMemo(
    () => ({
      planned: reasonRequirement
        ? "opacity-[100%] h-[100%] max-h-[500px]"
        : "opacity-[0%] max-h-[0px] pointer-events-none",
      accessibility: accessibilityRequirement
        ? "opacity-[100%] h-[100%] max-h-[500px]"
        : "opacity-[0%] max-h-[0px] pointer-events-none",
    }),
    [accessibilityRequirement, reasonRequirement]
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-10 p-4"
        method="POST"
        netlify="true"
        encType="multipart/form-data"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        name="registration-request"
        id="registration-request"
      >
        <input type="hidden" name="form-name" value="registration-request" />
        <input type="hidden" name="Content-Type" value="multipart/form-data" />

        <Radio
          fieldName="work-plan-approval"
          instruction="This course is identified in my Work Plan and Learning Agreement"
          options={["yes", "no"]}
          required={true}
          register={register}
        />
        <div
          className={`flex flex-col gap-y-10 transition-all duration-300 ease-in-out ${showOnValue.planned}`}
          aria-hidden={!reasonRequirement}
        >
          <Checkbox
            fieldName="reasons"
            instruction="I am attending this session because"
            detail="(tick all that apply)"
            options={[
              "It will help me develop the skills and knowledge required for my current role",
              "It will help me develop the skills and knowledge for a possible future role/body of work",
              "It was identified as a need during my performance management discussions",
              "My manager recommended that I attend",
              "I am interested in the content",
            ]}
            required={reasonRequirement}
            disabled={!reasonRequirement}
            register={register}
          />
          <TextField
            fieldName="aims"
            instruction="What would you like to achieve as a result of your attendance?"
            detail="For example, 'I would like to learn to write better emails to improve my communication skills'."
            required={false}
            disabled={!reasonRequirement}
            register={register}
          />
        </div>

        <Radio
          fieldName="adjustments-required"
          instruction="Do you require adjustments or additions to the session delivery to support your participation?"
          detail="For example, hearing loop or wheelchair access."
          options={["yes", "no"]}
          required={false}
          register={register}
        />
        <div
          className={`transition-all duration-300 ease-in-out ${showOnValue.accessibility}`}
          aria-hidden={!accessibilityRequirement}
        >
          <TextField
            fieldName="accessibility-details"
            instruction="Please provide details of your requirements."
            required={accessibilityRequirement}
            disabled={!accessibilityRequirement}
            register={register}
          />
        </div>
        <FileUpload
          instruction="Please upload any supporting documentation to support your registration request"
          detail="Hold shift or control to select multiple documents. Accepted file formats are .txt, .doc, .docx and .zip"
          fieldName="documentation"
          required="false"
          register={register}
        />
        <div
          id="response-zone"
          className="flex flex-col items-center justify-center gap-6"
        >
          <input
            type="submit"
            className="px-8 py-3 text-2xl rounded-3xl text-semibold bg-pursuit-green-light text-pursuit-green border-4 border-pursuit-green hover:bg-pursuit-green-dark hover:text-white disabled:grayscale disabled:opacity-70 disabled:pointer-events-none"
            disabled={sentStatus && sentStatus != "unsent"}
          />
          {responseMessage}
        </div>
      </form>
    </>
  );
}
