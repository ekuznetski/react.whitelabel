import { Button, Svg } from '@components/shared';
import { ETaskStatus } from '@domain/enums';
import { MWithdrawalHistoryItem } from '@domain/models';
import { ac_showModal } from '@store';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { WithdrawCancelConfirmationModal } from '..';
import './HistoryItem.scss';

export const WithdrawalHistoryItem = memo(function WithdrawalHistoryItem(props: MWithdrawalHistoryItem) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function getIconHref(status: ETaskStatus) {
    switch (status) {
      case ETaskStatus.pending:
        return 'withdrawal-pending';
      case ETaskStatus.success:
        return 'withdrawal-done-spinner';
      case ETaskStatus.inProgress:
        return 'in-progress-spinner';
      case ETaskStatus.failure:
        return 'withdrawal-canceled-spinner';
    }
  }

  return (
    <div className={classNames('withdrawal-history-item mb-10', props.status.toLowerCase())}>
      <div className="withdrawal-info ">
        <div className="withdrawal-item__icon d-none d-md-flex px-6">
          <Svg href={getIconHref(props.status)} height={18} />
        </div>
        <div className="withdrawal-item__amount px-6">
          <div className="item-cel__title mb-2">{t('Requested')}</div>
          <div className="item-cel__content">
            <Svg href={props.currency.toLowerCase()} className="mr-1" height={14} />
            {props.amount}
          </div>
        </div>
        <div className="withdrawal-item__date px-6">
          <div className="item-cel__title mb-2">{t('Date')}</div>
          <div className="item-cel__content">{props.issueDate.format('MM.DD.YYYY')}</div>
        </div>
        <div className="withdrawal-item__accountId px-6">
          <div className="item-cel__title mb-2">{t('Account')}</div>
          <div className="item-cel__content">{props.accountId}</div>
        </div>
        <div className="withdrawal-item__status px-6">
          <div className="item-cel__title mb-2">{t('Status')}</div>
          <div className="item-cel__content">
            <Svg href={getIconHref(props.status)} height={18} className="d-block d-md-none mr-3"></Svg>
            {props.status}
          </div>
        </div>
      </div>
      {props.status === ETaskStatus.pending && (
        <div className="withdrawal-option p-6">
          <Button
            noBg
            onClick={() =>
              dispatch(ac_showModal(WithdrawCancelConfirmationModal, {}, 'withdrawal-history-item__modal'))
            }
          >
            {t('Cancel Withdrawal')}
          </Button>
        </div>
      )}
      {(props.status === ETaskStatus.success || props.status === ETaskStatus.inProgress) && !!props.items?.length && (
        <div className="withdrawal-itemsTable mt-4">
          <div className="withdrawal-table__row header d-none d-md-flex">
            <div className="withdrawal-cell">{t('Date')}</div>
            <div className="withdrawal-cell">{t('Reference')}</div>
            <div className="withdrawal-cell">{t('Payment Method')}</div>
            <div className="withdrawal-cell">{t('Amount')}</div>
          </div>
          {props.items?.map((item, i) => (
            <div key={i} className="withdrawal-table__row content flex-column flex-md-row">
              <div className="withdrawal-cell px-6 px-md-0">
                <div className="withdrawal-cell__label d-block d-md-none">{t('Date')}</div>
                {item.issueDate.format('MM.DD.YYYY')}
              </div>
              <div className="withdrawal-cell px-6 px-md-2">
                <div className="withdrawal-cell__label d-block d-md-none">{t('Reference')}</div>
                {item.reference}
              </div>
              <div className="withdrawal-cell px-6 px-md-2">
                <div className="withdrawal-cell__label d-block d-md-none">{t('Payment Method')}</div>
                {item.paymentMethod}
              </div>
              <div className="withdrawal-cell px-6 px-md-0">
                <div className="withdrawal-cell__label d-block d-md-none">{t('Amount')}</div>
                <div>
                  <Svg href={props.currency.toLowerCase()} height={14}></Svg>
                  {item.amount}
                </div>
              </div>
            </div>
          ))}
          <div className="withdrawal-table__row footer py-5 py-md-0 px-6 px-md-0 d-block d-md-flex">
            {t('Total Amount')}
            <Svg href={props.currency.toLowerCase()} className="ml-1" height={14} />
            {props.items?.reduce((acc, item) => acc + item.amount, 0)}
          </div>
        </div>
      )}
    </div>
  );
});
