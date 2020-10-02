import { env } from '@domain';
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: !env.PRODUCTION,
    backend: {
      loadPath: `./locale/{{lng}}.json`,
    },
    keySeparator: ':',
  });

export default i18n;
