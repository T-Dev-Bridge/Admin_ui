import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { es, kr } from "./languages";

const resources = {
  kr: {
    translation: kr,
  },
  es: {
    translation: es,
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
