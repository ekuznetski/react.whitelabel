import { IFPAnswer, IFPQuestion } from '@domain/interfaces';
import { EFPQuestionView, EFPSteps } from '@domain/enums';
import i18n from 'i18next';

const t = i18n.getFixedT(i18n.language);

export const FPQuestions: IFPQuestion[] = [
  {
    id: 4,
    text: (props) => t('Choose Your Estimated Annual Income', { currencyCode: props?.currencyCode }),
    view: EFPQuestionView.radio,
    answers: [112, 111, 11, 102, 105, 106, 107, 113],
    step: EFPSteps.step1,
  },
  {
    id: 3,
    text: (props) => t('Choose Your Value of Savings and Investments', { currencyCode: props?.currencyCode }),
    view: EFPQuestionView.radio,
    answers: [112, 111, 11, 102, 105, 106, 107, 113],
    step: EFPSteps.step2,
  },
  {
    id: 5,
    text: (props) =>
      t('Choose Your Estimated Amount Available for Trading in the next 12 months', {
        currencyCode: props?.currencyCode,
      }),
    view: EFPQuestionView.radio,
    answers: [112, 111, 11, 102, 105, 106, 107, 113],
    step: EFPSteps.step3,
  },
  {
    id: 6,
    text: () => t('Choose Your Employment Status'),
    view: EFPQuestionView.radioWithIcon,
    answers: [17, 18, 19, 20, 21],
    step: EFPSteps.step4,
  },
  {
    id: {
      '17': '8',
      '18': '11',
      '19': '43',
      '20': null,
      '21': '44',
    },
    text: () => t('Select Industry'),
    view: EFPQuestionView.select,
    answers: [62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 78, 79, 80, 86],
    step: EFPSteps.step5,
  },
  {
    id: {
      '17': '9',
      '18': '12',
      '19': '14',
      '20': '16',
      '21': '18',
    },
    text: () => t('Source of Funds'),
    view: EFPQuestionView.select,
    answers: [82, 83, 84, 85, 86],
    step: EFPSteps.step5,
  },
];
export const FPAnswers: { [key: string]: IFPAnswer } = {
  '94': {
    apiId: 94,
    text: () => t('More than 50 transactions'),
  },

  '93': {
    apiId: 93,
    text: () => t('Between 10 and 50 transactions'),
  },

  '92': {
    apiId: 92,
    text: () => t('Less than 10 transactions'),
  },

  '96': {
    apiId: 96,
    text: (props) => t('More than 100,000', { currencySymbol: props?.currencySymbol }),
  },

  '16': {
    apiId: 16,
    text: (props) => t('Between 10,000 and 100,000', { currencySymbol: props?.currencySymbol }),
  },

  '95': {
    apiId: 95,
    text: (props) => t('Less than 10,000', { currencySymbol: props?.currencySymbol }),
  },

  '112': {
    apiId: 112,
    text: (props) => t('Between 0 and 5,000', { currencySymbol: props?.currencySymbol }),
  },
  '111': {
    apiId: 111,
    text: (props) => t('Between 5,000 and 10,000', { currencySymbol: props?.currencySymbol }),
  },
  '11': {
    apiId: 11,
    text: (props) => t('Between 50,000 and 100,000', { currencySymbol: props?.currencySymbol }),
  },

  '102': {
    apiId: 102,
    text: (props) => t('Between 100,000 and 250,000', { currencySymbol: props?.currencySymbol }),
  },

  '105': {
    apiId: 105,
    text: (props) => t('Between 250,000 and 500,000', { currencySymbol: props?.currencySymbol }),
  },

  '106': {
    apiId: 106,
    text: (props) => t('Between 500,000 and 1000,000', { currencySymbol: props?.currencySymbol }),
  },

  '107': {
    apiId: 107,
    text: (props) => t('More than 1,000,000', { currencySymbol: props?.currencySymbol }),
  },
  '113': {
    apiId: 113,
    text: (props) => t('More than 500,000', { currencySymbol: props?.currencySymbol }),
  },
  '17': {
    apiId: 17,
    text: () => t('Employed'),
    icon: 'employed',
  },
  '18': {
    apiId: 18,
    text: () => t('Self Employed'),
    icon: 'self_employed',
  },
  '19': {
    apiId: 19,
    text: () => t('Retired'),
    icon: 'retired',
  },
  '20': {
    apiId: 20,
    text: () => t('Student'),
    icon: 'student',
  },
  '21': {
    apiId: 21,
    text: () => t('Unemployed'),
    icon: 'unemployed',
  },
  '62': {
    apiId: 62,
    text: () => t('Financial Services - Banking and Investments'),
  },
  '63': {
    apiId: 63,
    text: () => t('Financial Services - Foreign Exchange'),
  },
  '64': {
    apiId: 64,
    text: () => t('Financial Services - Insurance'),
  },
  '65': {
    apiId: 65,
    text: () => t('Financial Services - Other'),
  },
  '66': {
    apiId: 66,
    text: () => t('Government / Public Sector'),
  },
  '67': {
    apiId: 67,
    text: () => t('Legal'),
  },
  '68': {
    apiId: 68,
    text: () => t('Leisure / Entertainment / Tourism'),
  },
  '69': {
    apiId: 69,
    text: () => t('Manufacturing'),
  },
  '70': {
    apiId: 70,
    text: () => t('Marketing / PR / Advertising'),
  },
  '71': {
    apiId: 71,
    text: () => t('Non Governmental Organisation'),
  },
  '72': {
    apiId: 72,
    text: () => t('Not for Profit - Charity'),
  },
  '73': {
    apiId: 73,
    text: () => t('Pharmaceuticals'),
  },
  '74': {
    apiId: 74,
    text: () => t('Precious Metals / Stones'),
  },
  '78': {
    apiId: 78,
    text: () => t('Technology'),
  },
  '79': {
    apiId: 79,
    text: () => t('Telecommunication'),
  },
  '80': {
    apiId: 80,
    text: () => t('Transport / Logistics'),
  },
  '86': {
    apiId: 86,
    text: () => t('Other'),
    needRemark: true,
  },
  '82': {
    apiId: 82,
    text: () => t('Employment/Salary'),
  },
  '83': {
    apiId: 83,
    text: () => t('Pension'),
  },
  '84': {
    apiId: 84,
    text: () => t('Family/ Partner'),
  },
  '85': {
    apiId: 85,
    text: () => t('Bank Loan'),
  },
  '87': {
    apiId: 87,
    text: () => t('Yes'),
  },
  '88': {
    apiId: 88,
    text: () => t('No'),
  },
};
