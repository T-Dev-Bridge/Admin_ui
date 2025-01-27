import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, kr } from "./languages";

const resources = {
  kr: {
    translation: kr,
  },
  en: {
    translation: en,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "kr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
