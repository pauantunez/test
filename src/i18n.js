import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import common_deDE from "./translations/deDE/common.json";

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend

  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .use(LanguageDetector)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'deDE',
    debug: process.env.NODE_ENV !== 'production',
    interpolation: { escapeValue: false },
    detection: {
      order: ["path"]
    },
    resources: {
      "de-DE": {
        translations: common_deDE
      },
      deDE: {
        translations: common_deDE
      },
      de: {
        translations: common_deDE
      },
    },
    ns: ["translations"],
    defaultNS: "translations",
  });


export default i18n;
