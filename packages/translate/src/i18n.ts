import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Basic i18n configuration
i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        // Add translations here
      },
    },
  },
})

export default i18n
