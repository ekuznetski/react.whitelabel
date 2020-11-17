import i18n from 'i18next';
const t = i18n.getFixedT(i18n.language);

export const config = {
  empStatNgSelectValList: [
    {
      value: 'Travel Agency',
      label: 'Travel Agency',
    },
    {
      value: 'Money Transfer business',
      label: 'Money Transfer business',
    },
    {
      value: 'Gems / Jewellery / Watches',
      label: 'Gems / Jewellery / Watches',
    },
    {
      value: 'Auto Spare parts',
      label: 'Auto Spare parts',
    },
    {
      value: 'Used cars and /or other used vehicles',
      label: 'Used cars and /or other used vehicles',
    },
    {
      value: 'Casinos / Night Clubs / Restaurants',
      label: 'Casinos / Night Clubs / Restaurants',
    },
    {
      value: 'Car rentals, truck rentals, private taxis, small retail shops',
      label: 'Car rentals, truck rentals, private taxis, small retail shops',
    },
    {
      value: 'Government Institution',
      label: 'Government Institution',
    },
    {
      value: 'Auction House',
      label: 'Auction House',
    },
  ],
  ownPropertyOptions: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
  employmentStatusOptions: [
    { label: 'Employed: Financial Services Related', value: 'fin-service' },
    { label: 'Employed', value: 'employed' },
    { label: 'Employed: Other', value: 'employed-other' },
    { label: 'Retired', value: 'retired' },
    { label: 'Self Employed', value: 'self-employed' },
    { label: 'Unemployed', value: 'unemployed' },
    { label: 'Other', value: 'other' },
  ],
  workingFinancialOptions: [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ],
  apprAnnualIncomeOptions: [
    { label: 'Below 50,000', value: 'below-50000' },
    { label: '50,000 to 100,000', value: '50000-to-100000' },
    { label: '100,000 to 250,000', value: '100000-to-250000' },
    { label: '250,000 to 500,000', value: '250000-to-500000' },
    { label: 'Above 500,000', value: 'above-500000' },
  ],
  apprNetWorthOptions: [
    { label: 'Below 250,000', value: 'below-250000' },
    { label: '250,000 to 1,000,000', value: '250000-to-1000000' },
    { label: '1,000,000 to 5,000,000', value: '1000000-to-5000000' },
    { label: 'Above 5,000,000', value: 'above-5000000' },
  ],
  fundsAvailableOptions: [
    { label: 'Below 25,000', value: 'below-25000' },
    { label: '25,000 to 50,000', value: '25000-to-50000' },
    { label: '50,000 to 150,000', value: '50000-to-150000' },
    { label: '150,000 to 300,000', value: '150000-to-300000' },
    { label: 'Above 300,000', value: 'above-300000' },
  ],
  prApprAnnualIncomeOptions: [
    { label: 'Below 50,000', value: 'below-50000' },
    { label: '50,000 to 100,000', value: '50000-to-100000' },
    { label: '100,000 to 250,000', value: '100000-to-250000' },
    { label: '250,000 to 500,000', value: '250000-to-500000' },
    { label: 'Above 500,000', value: 'above-500000' },
  ],
};
