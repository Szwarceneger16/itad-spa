import i18next from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import i18nextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

const config = {
    lng: 'en',
    fallbackLng: 'en',
    //debug: true,
    ns: ['common'],
    defaultNS: 'common',
    backend: {
      loadPath: 
      '/getTranslation/{{ns}}/{{lng}}.json',
      crossDomain: true,
      requestOptions: {
      mode: 'cors',

    }
    }
    // resources: {
    //   en: {
    //     translation: {
    //       "key": "hello world"
    //     }
    //   }
    // }
  };
// 

i18next
.use(initReactI18next)
  .use(i18nextHttpBackend)
  //.use(i18nextBrowserLanguageDetector)
  .init(config);

export default i18next;