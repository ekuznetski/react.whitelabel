import { Button, ModalContext, ModalNav, ModalOld, ModalTitle, Svg } from '@components/shared';
import { ETaskStatus } from '@domain/enums';
import { MWithdrawalHistoryItem } from '@domain/models';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import './WithdrawalHistoryItem.scss';
import { ac_showModal } from '@store';
import { useDispatch } from 'react-redux';
import { WithdrawCancelConfirmationModal } from '@pages/portal/withdrawal/components';

export const WithdrawalHistoryItem = memo(function WithdrawalHistoryItem(props: MWithdrawalHistoryItem) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <div className={classNames('withdrawal-history-item mb-10', props.status.toLowerCase())}>
      <div className="withdrawal-info ">
        <div className="withdrawal-item__icon px-6">
          <Svg href="shrimp" height={18} />
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
          <div className="item-cel__content">{props.status}</div>
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
          <div className="withdrawal-table__row header">
            <div className="withdrawal-cell">{t('Date')}</div>
            <div className="withdrawal-cell">{t('Reference')}</div>
            <div className="withdrawal-cell">{t('Payment Method')}</div>
            <div className="withdrawal-cell">{t('Amount')}</div>
          </div>
          {props.items?.map((item, i) => (
            <div key={i} className="withdrawal-table__row content">
              <div className="withdrawal-cell">{item.issueDate.format('MM.DD.YYYY')}</div>
              <div className="withdrawal-cell px-2">{item.reference}</div>
              <div className="withdrawal-cell px-2">{item.paymentMethod}</div>
              <div className="withdrawal-cell">
                <Svg href={props.currency.toLowerCase()} height={14} />
                {item.amount}
              </div>
            </div>
          ))}
          <div className="withdrawal-table__row footer">
            {t('Total Amount')}
            <Svg href={props.currency.toLowerCase()} className="ml-1" height={14} />
            {props.items?.reduce((acc, item) => acc + item.amount, 0)}
          </div>
        </div>
      )}
    </div>
  );
});
