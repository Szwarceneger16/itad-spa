import i18next from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';
import i18nextHttpBackend from 'i18next-http-backend';
import { initReactI18next } from "react-i18next";

const config = {
  lng: 'en',
  fallbackLng: 'en',
  //debug: true,
  ns: ['common'],
  defaultNS: 'common',
    backend: {
      
      crossDomain: true,
      requestOptions: {
        mode: 'cors',
      },
      backends: [
        LocalStorageBackend,  // primary
        i18nextHttpBackend               // fallback
      ],
      backendOptions: [{
          prefix: 'i18next_res_',
          expirationTime: 7*24*60*60*1000,
          defaultVersion: 'en',
          store: window.sessionStorage

        }, {

          loadPath: '/getTranslation/{{ns}}/{{lng}}.json' // xhr load path for my own fallback
        }]
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
.use(Backend)
  // .use(i18nextHttpBackend)
  //.use(i18nextBrowserLanguageDetector)
  .init(config);

export default i18next;