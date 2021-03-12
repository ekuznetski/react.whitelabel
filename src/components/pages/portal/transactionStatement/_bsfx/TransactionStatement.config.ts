import { ETransactionTypes as _ETransactionTypes } from '@domain/enums';
import i18n from '@i18next';
import { config as _config } from '@pages/portal/transactionStatement/TransactionStatement.config';
import moment from 'moment';

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
