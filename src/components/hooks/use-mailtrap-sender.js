import React, { useMemo, useState } from "react";
export function useMailtrapSender() {
  const [sentStatus, setSentStatus] = useState("unsent");
  const [responseData, setResponseData] = useState();
  function sendIt(data, event) {
    console.log("sent to hook successfully");
    setSentStatus("sending");

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
          sendEmail(event);
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

    console.log("we are gonna send an email now");
    console.dir(data);

    const templateId = "template_5f9my3a";
    window.emailjs
      .send("service_67ywmvb", templateId, this)
      .then((res) => {
        console.log("Email successfully sent!");
        console.dir(res);
      })
      .catch((err) => console.error(err));
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
