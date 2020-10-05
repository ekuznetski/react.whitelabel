export enum ELanguage {
  ar = 'ar',
  cs = 'cs',
  de = 'de',
  en = 'en',
  es = 'es',
  fa = 'fa',
  fr = 'fr',
  hi_IN = 'hi_IN',
  it = 'it',
  pl = 'pl',
  ru = 'ru',
  sv = 'sv',
  vi = 'vi',
  zh = 'zh',
  zh_CN = 'zh_CN',
  zh_HK = 'zh_HK',
}

export enum ELanguageIcon {
  ar = 'are',
  cs = 'cze',
  de = 'deu',
  en = 'gbr',
  es = 'esp',
  fa = 'irn',
  fr = 'fra',
  hi_IN = 'ind',
  it = 'ita',
  pl = 'pol',
  ru = 'rus',
  sv = 'swe',
  vi = 'vi',
  zh = 'chn',
  zh_CN = 'chn',
  zh_HK = 'hk',
}

export const rtlLanguages: ELanguage[] = [ELanguage.ar, ELanguage.fa];

export const LanguagesList = [
  { name: 'Arabic', native: 'عربى', code: ELanguage.ar },
  { name: 'Chinese', native: '繁体中文', code: ELanguage.zh },
  { name: 'Chinese (Simplified)', native: '简体中文', code: ELanguage.zh_CN },
  { name: 'Chinese (Traditional)', native: '繁體中文', code: ELanguage.zh_HK },
  { name: 'Czech', native: 'Čeština', code: ELanguage.cs },
  { name: 'English', native: 'English', code: ELanguage.en },
  { name: 'Farsi', native: 'فارسی', code: ELanguage.fa },
  { name: 'Hindi', native: 'हिन्दी', code: ELanguage.hi_IN },
  { name: 'French', native: 'Français', code: ELanguage.fr },
  { name: 'German', native: 'Deutsch', code: ELanguage.de },
  { name: 'Italian', native: 'Italiano', code: ELanguage.it },
  { name: 'Polish', native: 'Polski', code: ELanguage.pl },
  { name: 'Russian', native: 'Русский', code: ELanguage.ru },
  { name: 'Spanish', native: 'Español', code: ELanguage.es },
  { name: 'Swedish', native: 'Swedish', code: ELanguage.sv },
  { name: 'Vietnamese', native: 'Tiếng Việt', code: ELanguage.vi },
];
export type ILanguagesList = typeof LanguagesList;
