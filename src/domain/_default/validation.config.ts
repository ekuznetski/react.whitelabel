import * as Yup from 'yup';
export const RegexValidators = Object.freeze({
  address: /^(\d|[A-z]|\.|,|-|#|'|\/| )+$/,
  city: /^[A-Za-z\ ]+$/,
  email: /^([A-Za-z_\-.]|\d)+@([A-Za-z\-]|\d)+(\.[A-Za-z\d]+)+$/,
  loginAndEmail: /^([A-Za-z_\-.]|\d)+$|^([A-Za-z_\-.]|\d)+@([A-Za-z\-]|\d)+(\.[A-Za-z]+)+$/,
  name: /^[a-zA-Z][a-zA-Z .,'-]*$/,
  password: /^(?=.*\d)(?=.*[A-z]).*$/,
  numbersOnly: /^\d+$/,
  alphaWithSpaceAndApostropheOnly: /^[A-Za-z' ]+$/,
  alphaOnly: /^[A-Za-z]+$/,
  postcode: /^(\d|[A-z]| )+$/,
  numberCard: /^(?:(4\d{3}|((5[1-5]|2[2-7])\d{2}))\s?(\d{4}\s?){2}(\d{1,4}\s?)(\d{3})?|(3[47]\d{2}\s?\d{6}\s?\d{5}))$/,
  cvcCard: /^\d{3,4}$/,
  monthCard: /^([1-9]|0[1-9]|1[012])$/,
  yearCard: /^(19|[2-9]\d)$/,
  pin: /^\d{4}$/,
  swift: /^([a-zA-Z]){4}([a-zA-Z]){2}([0-9a-zA-Z]){2}([0-9a-zA-Z]{3})?$/,
});

export const FieldValidators = {
  requiredString: Yup.string().required('This field is required').typeError('Value must be a string'),
  requiredNumber: Yup.number().required('This field is required').typeError('Value must be a number'),
  notRequiredString: Yup.string().notRequired(),
  notRequiredNumber: Yup.number().notRequired(),
  name: Yup.string().matches(RegexValidators.name, 'Invalid value').required('This field is required'),
  email: Yup.string().email('Invalid email').required('This field is required'),
  numbers: Yup.string().matches(RegexValidators.numbersOnly, 'Invalid value').required('This field is required'),
  phone: Yup.string().matches(RegexValidators.numbersOnly, 'Invalid value').required('This field is required')
  .min(6, 'Minimum length ${min} numbers')
  .max(20, 'Maximum length ${max} numbers'),
  company: Yup.string().matches(RegexValidators.name, 'Invalid value').required('This field is required')
  .max(40, 'Maximum length ${max} characters'),
  loginAndEmail: Yup.string()
    .matches(RegexValidators.loginAndEmail, 'Invalid value')
    .required('This field is required'),
  alphaWithSpaceAndApostropheOnly: Yup.string()
    .matches(RegexValidators.alphaWithSpaceAndApostropheOnly, 'Invalid value')
    .required('This field is required'),
  password: Yup.string()
    .matches(RegexValidators.password, 'Password should contain digits and letters')
    .min(8, 'Minimum length ${max} symbols')
    .max(40, 'Maximum length ${max} symbols')
    .required('This field is required'),
  street: Yup.string().matches(RegexValidators.address, 'Invalid value').required('This field is required')
  .max(100, 'Maximum length ${max} characters'),
  city: Yup.string().matches(RegexValidators.city, 'Invalid value').required('This field is required'),
  postcode: Yup.string().matches(RegexValidators.postcode, 'Invalid zip code'),
  swift: Yup.string()
    .matches(RegexValidators.swift, 'Invalid SWIFT Code')
    .required('This field is required')
    .max(45, 'Name must not exceed ${max} characters'),
};
export const CustomFieldValidators = {
  country: Yup.object()
    .shape({
      name: FieldValidators.requiredString,
      code: FieldValidators.requiredString,
      phoneCode: FieldValidators.requiredString,
    })
    .required('This field is required'),
};
