/* eslint-disable no-unused-vars */
import React, { useMemo, useState } from "react";
import { useForm, register, errors } from "react-hook-form";
import { useMailtrapSender } from "../hooks/use-mailtrap-sender";

import Radio from "../fields/Radio";
import Checkbox from "../fields/CheckBox";
import TextField from "../fields/TextField";
import TextBox from "../fields/TextBox";
import FileUpload from "../fields/FileUpload";

export default function Form() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { sendIt, responseMessage, sentStatus } = useMailtrapSender();

  const onSubmit = (data, e) => {
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
        ? "opacity-[100%] h-[100%] max-h-[2000px] md:max-h-[700px] pb-8"
        : "opacity-[0%] max-h-[0px] pointer-events-none",
      accessibility: accessibilityRequirement
        ? "opacity-[100%] h-[100%] max-h-[2000px] md:max-h-[700px] w-full md:w-[85%] xl:w-[90%] pb-8"
        : "opacity-[0%] max-h-[0px] pointer-events-none w-full md:w-[85%] xl:w-[90%]",
    }),
    [accessibilityRequirement, reasonRequirement]
  );

  const errorClasses =
    "absolute -bottom-2 left-1/2 text-red-600 translate-y-full transition-all opacity-0 duration-200 -translate-x-1/2";

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 p-4 md:pl-8 items-start justify-center"
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
        <div className="flex flex-col lg:flex-row gap-4 w-full md:w-[90%]">
          <div className="relative flex-1">
            <span
              className={`${errorClasses} ${
                errors["full-name"] && "opacity-100"
              }`}
              aria-hidden={!errors["full-name"]}
            >
              {errors["full-name"] && errors["full-name"].message}
            </span>
            <TextBox
              type="text"
              fieldName="full-name"
              instruction="Your name"
              required={true}
              register={register}
            />
          </div>
          <div className="relative flex-1">
            <span
              className={`${errorClasses} ${errors["email"] && "opacity-100"}`}
              aria-hidden={!errors["email"]}
            >
              {errors["email"] && errors["email"].message}
            </span>
            <TextBox
              type="email"
              fieldName="email"
              instruction="Email address"
              required={true}
              register={register}
            />
          </div>
        </div>
        <div className="relative">
          <span
            className={`${errorClasses} ${
              errors["work-plan-approval"] && "opacity-100"
            }`}
            aria-hidden={!errors["work-plan-approval"]}
          >
            {errors["work-plan-approval"] &&
              errors["work-plan-approval"].message}
          </span>

          <Radio
            fieldName="work-plan-approval"
            instruction="This course is identified in my Work Plan and Learning Agreement"
            options={["yes", "no"]}
            required={true}
            register={register}
          />
        </div>
        <div
          className={`flex flex-col w-full md:w-[85%] xl:w-[90%] gap-y-10 -my-3 pb-6 transition-all duration-400 ease-in-out ${showOnValue.planned}`}
          aria-hidden={!reasonRequirement}
        >
          <div className="relative">
            <span
              className={`${errorClasses} ${
                errors["reasons"] && "opacity-100"
              } bottom-6`}
              aria-hidden={!errors["reasons"]}
            >
              {errors["reasons"] && errors["reasons"].message}
            </span>

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
          </div>

          <TextField
            fieldName="aims"
            instruction="What would you like to achieve as a result of your attendance?"
            detail="For example, 'I would like to learn to write better emails to improve my communication skills'."
            required={false}
            disabled={!reasonRequirement}
            register={register}
          />
        </div>
        <div className="relative md:w-[85%] xl:w-[90%]">
          <span
            className={`${errorClasses} ${
              errors["adjustments-required"] && "opacity-100"
            }`}
            aria-hidden={!errors["adjustments-required"]}
          >
            {errors["adjustments-required"] &&
              errors["adjustments-required"].message}
          </span>
          <Radio
            fieldName="adjustments-required"
            instruction="Do you require adjustments or additions to the session delivery to support your participation?"
            detail="For example, hearing loop or wheelchair access."
            options={["yes", "no"]}
            required={true}
            register={register}
          />
        </div>
        <div
          className={`transition-all duration-400 -my-3 ease-in-out ${showOnValue.accessibility}`}
          aria-hidden={!accessibilityRequirement}
        >
          <div className="relative">
            <span
              className={`${errorClasses} ${
                errors["accessibility-details"] && "opacity-100"
              } bottom-6`}
              aria-hidden={!errors["accessibility-details"]}
            >
              {errors["accessibility-details"] &&
                errors["accessibility-details"].message}
            </span>
            <TextField
              fieldName="accessibility-details"
              instruction="Please provide details of your requirements."
              required={accessibilityRequirement}
              disabled={!accessibilityRequirement}
              register={register}
            />
          </div>
        </div>
        <div className="w-full md:w-80%">
          <FileUpload
            instruction="Please upload any supporting documentation to support your registration request"
            detail="Hold shift or control to select multiple documents. Accepted file formats are .txt, .doc, .docx and .zip"
            fieldName="documentation"
            required={false}
            register={register}
          />
        </div>

        <div
          id="response-zone"
          className="flex flex-col items-start justify-center gap-6"
        >
          {responseMessage}
          <input
            type="submit"
            className="px-8 py-3 text-2xl rounded-full text-semibold bg-pursuit-green text-white border-2 border-pursuit-green hover:bg-pursuit-green-dark hover:scale-110 transition-all disabled:grayscale disabled:opacity-70 disabled:pointer-events-none"
            disabled={sentStatus && sentStatus !== "unsent"}
          />
        </div>
      </form>
    </>
  );
}
