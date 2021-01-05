import { ELanguage } from '@domain/enums';
// import { env } from '@env';
import i18n from '@i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import pagesMeta from './locale/pagesMeta';
import en from './locale/en';

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: {
      loadPath: 'locale/{{lng}}.json',
    },
    resources: {
      en: {
        translation: en,
        meta: pagesMeta,
      },
    },
    ns: ['translation', 'meta'],
    defaultNS: 'translation',
    lng: ELanguage.en,
    fallbackLng: {
      en: [ELanguage.en],
      default: [ELanguage.en],
    },
    // debug: !env.PRODUCTION,
    keySeparator: ':',
    react: {
      wait: true,
    },
  });

export default i18n;
