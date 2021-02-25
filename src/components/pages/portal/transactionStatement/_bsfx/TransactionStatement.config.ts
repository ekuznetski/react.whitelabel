import i18n from '@i18next';
import moment from 'moment';
import { config as _config } from '@pages/portal/transactionStatement/TransactionStatement.config';

const t = i18n.getLazyT;

export const config = {
  ..._config,
  recentTransactionsFilter: [
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
