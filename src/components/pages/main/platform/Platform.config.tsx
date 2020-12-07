import i18n from 'i18next';
const t = i18n.getFixedT(i18n.language);

export const config = {
  tableData: {
    headers: [t('Instrument'), t('Sell'), t('Buy'), t('Change percent')],
    rows: [
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
      ['Microsoft', '206.24', '206.46', '2.15'],
    ],
  },
};
