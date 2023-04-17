import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* Netlify needs a html output of the form as well as the react form, 
    in order to get the forms to show up, as React is rendering this client-side.
    This hidden markup is used to ensure the JSX version of the form is detected in Netlify */}
    <form
      name="Registration request"
      netlify
      data-netlify="true"
      enc-type="multipart/form-data"
      netlify-honeypot="bot-field"
      hidden
    >
      <input type="radio" name="work-plan-approval" />
      <input type="checkbox" name="reasons" />
      <textarea name="aims" />
      <input type="radio" name="adjustments-required" />
      <textarea name="accessibility-details" />
      <input type="file" name="documentation" />
    </form>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
