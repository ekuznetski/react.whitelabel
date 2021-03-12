import { ETransactionTypes } from '@domain/enums';
import i18n from '@i18next';
import moment from 'moment';

const t = i18n.getLazyT;

export const config = {
  operationTypes: [
    { label: t('Deposits'), value: ETransactionTypes.deposits },
    { label: t('Withdrawals'), value: ETransactionTypes.withdrawal },
    { label: t('Trades'), value: ETransactionTypes.trades },
  ],
  recentTransactionsFilter: [
    {
      label: t('Last 20 Transactions'),
      value: [moment('1.1.2000').startOf('month'), moment()],
    },
    {
      label: t('This Month Transactions'),
      value: [moment().startOf('month'), moment()],
    },
    {
      label: t('Last Month Transactions'),
      value: [moment().subtract(1, 'months').startOf('month'), moment().subtract(1, 'months').endOf('month')],
    },
  ],
};
