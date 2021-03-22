import * as Yup from 'yup';
import i18n from '@i18next';
import { isBrowser } from 'react-device-detect';

const t = i18n.getLazyT;

export const RegexValidators = Object.freeze({
  address: /^[0-9a-zA-Z\.,\-#\'/ ]*$/,
  city: /^[A-Za-z\ ]+$/,
  email: /^([A-Za-z_\-.]|\d)+@([A-Za-z\-]|\d)+(\.[A-Za-z\d]+)+$/,
  loginAndEmail: /^([A-Za-z_\-.]|\d)+$|^([A-Za-z_\-.]|\d)+@([A-Za-z\-]|\d)+(\.[A-Za-z]+)+$/,
  name: /^[a-zA-Z][a-zA-Z '-]*$/,
  password: /^(?=.*\d)(?=.*[A-z]).*$/,
  numbersOnly: /^\d+$/,
  alphaWithSpaceAndApostropheOnly: /^[A-Za-z' ]+$/,
  alphaOnly: /^[A-Za-z]+$/,
  postcode: /^(\d|[A-z]| )+$/,
  numberCard: /^(?:(4\d{3}|((5[1-5]|2[2-7])\d{2}))\s?(\d{4}\s?){2}(\d{1,4}\s?)(\d{3})?|(3[47]\d{2}\s?\d{6}\s?\d{5}))$/,
  cvcCard: /^\d{3,4}$/,
  monthCard: /^([1-9]|0[1-9]|1[012])$/,
  yearCard: /^(19|[2-9]\d)$/,
  bankName: /^[0-9a-zA-Z\.,\-\/\(\)/ ]*$/,
  pin: /^\d{4}$/,
  swift: /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/,
});

export const FieldValidators = {
  requiredString: Yup.string().required(t('This field is required')).typeError(t('Value must be a string')),
  requiredNumber: Yup.number().required(t('This field is required')).typeError(t('Value must be a number')),
  notRequiredString: Yup.string().notRequired(),
  notRequiredNumber: Yup.number().notRequired(),
  firstName: Yup.string()
    .matches(RegexValidators.name, t('Include latin characters, dash and apostrophe only'))
    .required(t('Please enter your first name'))
    .max(40, t('Maximum length symbols')),
  lastName: Yup.string()
    .matches(RegexValidators.name, t('Include latin characters, dash and apostrophe only'))
    .required(t('Please enter your last name'))
    .max(45, t('Maximum length symbols')),
  name: Yup.string().matches(RegexValidators.name, t('Invalid value')).required(t('This field is required')),
  email: Yup.string()
    .email(t('Invalid email address'))
    .required(t('Please enter your email'))
    .max(80, t('Maximum length symbols')),
  numbers: Yup.string().matches(RegexValidators.numbersOnly, t('Invalid value')).required(t('This field is required')),
  phone: Yup.string()
    .matches(RegexValidators.numbersOnly, t('Invalid value'))
    .required(t('Please enter your phone number'))
    .min(6, t('Minimum length numbers'))
    .max(20, t('Maximum length numbers')),
  company: Yup.string()
    .matches(RegexValidators.name, t('Invalid value'))
    .required(t('This field is required'))
    .max(40, t('Maximum length characters')),
  loginAndEmail: Yup.string()
    .matches(RegexValidators.loginAndEmail, t('Invalid value'))
    .required(t('This field is required')),
  alphaWithSpaceAndApostropheOnly: Yup.string()
    .matches(RegexValidators.alphaWithSpaceAndApostropheOnly, t('Invalid value'))
    .required(t('This field is required')),
  password: Yup.string()
    .matches(RegexValidators.password, t('Password should contain digits and letters'))
    .min(8, t('Minimum length symbols'))
    .max(40, t('Maximum length symbols'))
    .required(t('Please enter password')),
  street: Yup.string()
    .matches(RegexValidators.address, isBrowser ? t('Invalid address') : t('Invalid address mobile'))
    .required(t('Please enter street name and number'))
    .max(100, t('Maximum length symbols')),
  city: Yup.string()
    .matches(RegexValidators.city, t('Please include latin characters only'))
    .required(t('Please enter city'))
    .max(40, t('Maximum length symbols')),
  postcode: Yup.string()
    .matches(RegexValidators.postcode, t('Please include latin characters and digits only'))
    .max(20, t('Maximum length symbols')),
  beneficiaryName: Yup.string()
    .matches(RegexValidators.bankName, t('Enter numbers, latin characters and -.,/() only'))
    .required(t('Please enter beneficiary name'))
    .max(100, t('Name characters count restriction')),
  bankName: Yup.string()
    .matches(RegexValidators.bankName, t('Enter numbers, latin characters and -.,/() only'))
    .required(t('Please enter bank name'))
    .max(100, t('Bank Name characters count restriction')),
  accountNumber: Yup.string()
    .matches(RegexValidators.numbersOnly, t('Please include only numbers'))
    .required(t('Please enter account number'))
    .max(100, isBrowser ? t('Maximum length symbols') : t('Bank Account Number count restriction')),
  swift: Yup.string()
    .matches(RegexValidators.swift, t('Invalid SWIFT Code'))
    .required(t('Please enter swift code'))
    .min(8, t('Minimum length symbols'))
    .max(11, t('Maximum length symbols')),
  iban: Yup.string()
    .matches(RegexValidators.postcode, t('Please include latin characters and digits only'))
    .max(50, t('IBAN characters count restriction')),
  branch: Yup.string().matches(RegexValidators.bankName, t('Enter numbers, latin characters and -.,/() only')),
};
export const CustomFieldValidators = {
  country: Yup.object()
    .shape({
      name: FieldValidators.requiredString,
      code: FieldValidators.requiredString,
      phoneCode: FieldValidators.requiredString,
    })
    .required(t('Please enter country')),
};
