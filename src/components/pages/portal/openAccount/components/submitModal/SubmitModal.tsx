import React from 'react';
import { EModalType } from '@domain/enums';
import { ICreateTradingAccountResponse } from '@domain/interfaces';
import { ModalBody, ModalFooter, ModalTitle } from '@components/core';
import { Button, LocaleNavLink, Svg } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ac_hideModal } from '@store';

interface ISubmitModalProps {
  type: EModalType;
  data?: ICreateTradingAccountResponse;
}

export const SubmitModal = React.memo(function SubmitModal({ type, data }: ISubmitModalProps) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      {type === EModalType.success ? (
        <ModalTitle title={t('Successful Submission')}>
          {' '}
          :
          <small className="mt-1">
            {t('Demo Live trade account with ID')} <b>{data?.trade_account_id}</b> {t('added successfully')}
          </small>
        </ModalTitle>
      ) : (
        <ModalTitle title={t('Unsuccessful Submission')} subTitle={t('A Similar Trade Account Already Exists')} />
      )}
      <ModalBody>
        {type === EModalType.success ? (
          <Svg href="openAccount_alert_success" width={100} className="p-7" />
        ) : (
          <Svg href="openAccount_alert_error" width={100} className="p-7" />
        )}
      </ModalBody>
      <ModalFooter>
        {type === EModalType.success ? (
          <Button className="col-12 col-md-8 mx-auto" onClick={() => dispatch(ac_hideModal())}>
            <LocaleNavLink to="/dashboard">{t('Continue')}</LocaleNavLink>
          </Button>
        ) : (
          <>
            <Button className="red mr-5" onClick={() => dispatch(ac_hideModal())}>
              {t('Try Again')}
            </Button>
            <Button className="red mr-5" noBg>
              <LocaleNavLink to="/dashboard">{t('Back to Dashboard')}</LocaleNavLink>
            </Button>
          </>
        )}
      </ModalFooter>
    </>
  );
});
