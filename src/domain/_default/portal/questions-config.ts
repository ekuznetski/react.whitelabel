import { IFPAnswer, IFPQuestion } from '@domain/interfaces';
import { EFPQuestionView, EFPSteps } from '@domain/enums';

export const FPQuestions: IFPQuestion[] = [
  {
    id: 4,
    text: 'Choose Your Estimated Annual Income (USD)',
    view: EFPQuestionView.radio,
    answers: [96, 16, 95, 112, 111, 11, 102, 105, 106, 107, 113],
    step: EFPSteps.step1,
  },
  {
    id: 3,
    text: 'Choose Your Value of Savings and Investments (USD)',
    view: EFPQuestionView.radio,
    answers: [96, 16, 95, 112, 111, 11, 102, 105, 106, 107, 113],
    step: EFPSteps.step2,
  },
  {
    id: 5,
    text: 'Choose Your Estimated Amount Available for Trading in the next 12 months (USD)',
    view: EFPQuestionView.radio,
    answers: [96, 16, 95, 112, 111, 11, 102, 105, 106, 107, 113],
    step: EFPSteps.step3,
  },
  {
    id: 6,
    text: 'Choose Your Employment Status',
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
    text: 'Select Industry',
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
    text: 'Source of Funds',
    view: EFPQuestionView.select,
    answers: [82, 83, 84, 85, 86],
    step: EFPSteps.step5,
  },
];
export const FPAnswers: { [key: string]: IFPAnswer } = {
  '94': {
    apiId: 94,
    text: 'More than 50 transactions',
  },

  '93': {
    apiId: 93,
    text: 'Between 10 and 50 transactions',
  },

  '92': {
    apiId: 92,
    text: 'Less than 10 transactions',
  },

  '96': {
    apiId: 96,
    text: 'More than 100,000',
  },

  '16': {
    apiId: 16,
    text: 'Between 10,000 and 100,000',
  },

  '95': {
    apiId: 95,
    text: 'Less than 10,000',
  },

  '112': {
    apiId: 112,
    text: 'Between 0 and 5,000',
  },
  '111': {
    apiId: 111,
    text: 'Between 5,000 and 10,000',
  },
  '11': {
    apiId: 11,
    text: 'Between 50,000 and 100,000',
  },

  '102': {
    apiId: 102,
    text: 'Between 100,000 and 250,000',
  },

  '105': {
    apiId: 105,
    text: 'Between 250,000 and 500,000',
  },

  '106': {
    apiId: 106,
    text: 'Between 500,000 and 1000,000',
  },

  '107': {
    apiId: 107,
    text: 'More than 1,000,000',
  },
  '113': {
    apiId: 113,
    text: 'More than 500,000',
  },
  '17': {
    apiId: 17,
    text: 'Employed',
    icon: 'employed',
  },
  '18': {
    apiId: 18,
    text: 'Self Employed',
    icon: 'self_employed',
  },
  '19': {
    apiId: 19,
    text: 'Retired',
    icon: 'retired',
  },
  '20': {
    apiId: 20,
    text: 'Student',
    icon: 'student',
  },
  '21': {
    apiId: 21,
    text: 'Unemployed',
    icon: 'unemployed',
  },
  '62': {
    apiId: 62,
    text: 'Financial Services - Banking and Investments',
  },
  '63': {
    apiId: 63,
    text: 'Financial Services - Foreign Exchange',
  },
  '64': {
    apiId: 64,
    text: 'Financial Services - Insurance',
  },
  '65': {
    apiId: 65,
    text: 'Financial Services - Other',
  },
  '66': {
    apiId: 66,
    text: 'Government / Public Sector',
  },
  '67': {
    apiId: 67,
    text: 'Legal',
  },
  '68': {
    apiId: 68,
    text: 'Leisure / Entertainment / Tourism',
  },
  '69': {
    apiId: 69,
    text: 'Manufacturing',
  },
  '70': {
    apiId: 70,
    text: 'Marketing / PR / Advertising',
  },
  '71': {
    apiId: 71,
    text: 'Non Governmental Organisation',
  },
  '72': {
    apiId: 72,
    text: 'Not for Profit - Charity',
  },
  '73': {
    apiId: 73,
    text: 'Pharmaceuticals',
  },
  '74': {
    apiId: 74,
    text: 'Precious Metals / Stones',
  },
  '78': {
    apiId: 78,
    text: 'Technology',
  },
  '79': {
    apiId: 79,
    text: 'Telecommunication',
  },
  '80': {
    apiId: 80,
    text: 'Transport / Logistics',
  },
  '86': {
    apiId: 86,
    text: 'Other',
    needRemark: true,
  },
  '82': {
    apiId: 82,
    text: 'Employment/Salary',
  },
  '83': {
    apiId: 83,
    text: 'Pension',
  },
  '84': {
    apiId: 84,
    text: 'Family/ Partner',
  },
  '85': {
    apiId: 85,
    text: 'Bank Loan',
  },
  '87': {
    apiId: 87,
    text: 'Yes',
  },
  '88': {
    apiId: 88,
    text: 'No',
  },
};
