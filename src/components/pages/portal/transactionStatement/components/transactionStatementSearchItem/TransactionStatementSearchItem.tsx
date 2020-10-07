import { Svg } from '@components/shared';
import { MTransactionalStatement } from '@domain/models';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './TransactionStatementSearchItem.scss';

export const TransactionStatementSearchItem = memo(function TransactionStatementSearchItem(
  props: MTransactionalStatement,
) {
  const { t } = useTranslation();

  const cells = [
    { title: t('Account Number'), name: 'trade_account', context: props.trade_account },
    {
      title: t('Amount'),
      name: 'amount',
      context: (
        <>
          <Svg href={props.currency.toLowerCase() + '.svg'} className="mr-1" height={14} />
          {props.amount}
        </>
      ),
    },
    { title: t('Date Created'), name: 'date_created', context: props.date_created.format('YYYY-MM-DD HH:mm:ss') },
    { title: t('Invoice Number'), name: 'invoice_no', context: props.invoice_no },
  ];

  return (
    <div className="transaction-statement-search-item mb-10">
      {cells.map((cell) => (
        <div className={classNames('search-item__cell px-6', cell.name)}>
          <div className="search-item__title mb-0 mb-md-2">{cell.title}</div>
          <div className="search-item__context">{cell.context}</div>
        </div>
      ))}
    </div>
  );
});
