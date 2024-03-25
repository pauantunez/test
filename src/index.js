import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import TagManager from "react-gtm-module";

import "./i18n";

const tagManagerArgs = {
  gtmId: "GTM-TFQTQZ3",
};

TagManager.initialize(tagManagerArgs);

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <React.Fragment>
      <App />
    </React.Fragment>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
