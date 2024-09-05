// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translation files
import hyTranslations from "./locales/hy/translation.json";
import ruTranslations from "./locales/ru/translation.json";

i18n.use(initReactI18next).init({
  lng: "hy", // Default language
  fallbackLng: "hy", // Fallback language if the current language is not available
  resources: {
    hy: {
      translation: hyTranslations,
    },
    ru: {
      translation: ruTranslations,
    },
  },
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

export default i18n;
