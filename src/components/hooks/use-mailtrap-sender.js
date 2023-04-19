import React, { useMemo, useState } from "react";
import JSZip from "jszip";
export function useMailtrapSender() {
  const [sentStatus, setSentStatus] = useState("unsent");
  const [responseData, setResponseData] = useState();

  function zipIt(fileInput) {
    const zip = new JSZip();

    fileInput.forEach((file) => zip.file(file.name, file));

    zip.generateAsync({ type: "blob" }).then((blob) => {
      const zippedFiles = new File([blob], "submission-zip.zip", {
        lastModified: Date.now(),
        type: "application/zip",
      });
      return zippedFiles;
    });
  }

  function sendIt(data, event) {
    console.log("sent to hook successfully");
    setSentStatus("sending");

    const emailData = {
      fullname: "name",
      plan: data["work-plan-approval"],
      reasons: data.reasons.join(", "),
      aims: data.aims,
      adjustments: data["adjustments-required"],
      details: data["accessibility-details"],
      doczip: zipIt(data.documentation),
    };
    // const filteredData = data.fromEntries(
    //   data.entries.filter(([_, v]) => v != null)
    // );
    // console.dir(filteredData);
    fetch("/", {
      method: "POST",
      body: new FormData(event.target),
    })
      .then((response) => {
        if (response && response.status === 200) {
          setSentStatus("success");
          console.log("we are gonna send an email now");
          console.dir(data);

          const templateId = "template_5f9my3a";
          window.emailjs
            .send("service_67ywmvb", templateId, emailData)
            .then((res) => {
              console.log("Email successfully sent!");
              console.dir(res);
            })
            .catch((err) => console.error(err));
        } else {
          setSentStatus("error");
        }
        console.dir(data);
        setResponseData(response);
      })
      .catch((error) => {
        setSentStatus("error");
        console.log(error);
      });
  }

  const waiting = (
    <div className="bg-yellow-200 border-4 rounded-md p-12 text-center border-yellow-500 text-yellow-700">
      Processing...
    </div>
  );
  const successMessage = (
    <div className="bg-lime-200 border-4 rounded-md p-12 text-center border-lime-500 text-lime-700">
      Your application has been succcessfully submitted. Thank you!
    </div>
  );
  const awBeans = (
    <div className="bg-rose-200 border-4 rounded-md p-12 text-center border-rose-500 text-rose-700">
      Something went wrong.
      {responseData && (
        <span> Netlify's servers returned a {responseData.status}. </span>
      )}
      Please contact your administrator.
    </div>
  );
  const validateMePlease = (
    <div className="bg-rose-200 border-4 rounded-md p-12 text-center border-rose-500 text-rose-700">
      This will be replaced with a better error message eventually!
    </div>
  );

  const responseMessage = useMemo(() => {
    switch (sentStatus) {
      case "sending":
        return waiting;
      case "success":
        return successMessage;
      case "error":
        return awBeans;
      case "validation":
        return validateMePlease;
      default:
        return <></>;
    }
    //I have to ignore the exhaustive dependencies for this line here - if i fulfill the linter it just goes into an endless loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awBeans]);

  return { sendIt, responseMessage, sentStatus };
}
