import React, { useMemo, useState } from "react";
import JSZip from "jszip";
export function useMailtrapSender() {
  const [sentStatus, setSentStatus] = useState("unsent");
  const [responseData, setResponseData] = useState();

  function sendToEmailJs(data, event, files) {
    setSentStatus("sending");

    const formatReasons =
      typeof data.reasons === Array && data.reasons.length > 1
        ? data.reasons.join(", ")
        : data.reasons;
    const emailData = {
      fullname: data["full-name"],
      email: data["email"],
      plan: data["work-plan-approval"],
      reasons: formatReasons,
      aims: data.aims,
      adjustments: data["adjustments-required"],
      details: data["accessibility-details"],
    };
    files ? (emailData.doczip = files) : (emailData.doczip = null);

    fetch("/", {
      method: "POST",
      body: new FormData(event.target),
    })
      .then((response) => {
        if (response && response.status === 200) {
          const templateId = "template_5f9my3a";
          window.emailjs
            .send("service_67ywmvb", templateId, emailData)
            .then((res) => {
              // console.log("Email successfully sent!");
              // console.dir(emailData);
              // console.dir(res);
              setSentStatus("success");
            })
            .catch((err) => console.error(err));
        } else {
          setSentStatus("error");
        }
        setResponseData(response);
      })
      .catch((error) => {
        setSentStatus("error");
        console.log(error);
      });
  }

  function sendIt(data, event) {
    if (!data.documentation) {
      sendToEmailJs(data, event);
    } else {
      const zip = new JSZip();
      const fileArray = [...data.documentation];
      fileArray.forEach((file) => zip.file(file.name, file));

      zip.generateAsync({ type: "base64" }).then((filestring) => {
        sendToEmailJs(data, event, filestring);
      });
    }
  }

  const waiting = (
    <div className="bg-yellow-200 border-4 rounded-md p-6 text-center border-yellow-500 text-yellow-700">
      Processing...
    </div>
  );
  const successMessage = (
    <div className="bg-lime-200 border-4 rounded-md p-6 text-center border-lime-500 text-lime-700">
      Your application has been succcessfully submitted. Thank you!
    </div>
  );
  const awBeans = (
    <div className="bg-rose-200 border-4 rounded-md p-6 text-center border-rose-500 text-rose-700">
      Something went wrong. Please contact your administrator.
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
      default:
        return <></>;
    }
    //I have to ignore the exhaustive dependencies lint rule for this line here - if i fulfill the linter it just goes into an endless loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [awBeans]);

  return { sendIt, responseMessage, sentStatus };
}
