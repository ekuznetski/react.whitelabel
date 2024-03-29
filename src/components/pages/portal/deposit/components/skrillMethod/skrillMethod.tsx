import { Button } from '@components/shared';
import { EDepositMethodCode, ELanguage, ETradingType } from '@domain/enums';
import { ISkrillDepositRequest } from '@domain/interfaces';
import { MClientProfile } from '@domain/models';
import { IStore } from '@store';
import { appendAndSubmitForm } from '@utils/fn';
import React from 'react';
import { Col, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { BillingDetailsModal, DetailsHeader } from '..';
import { useDepositState } from '../../deposit.context';

export function SkrillMethod() {
  const { account, amount, billingDetails } = useDepositState();
  const { profile, locale } = useSelector<IStore, { profile: MClientProfile; locale: ELanguage }>((state) => ({
    profile: state.data.client.profile,
    locale: state.app.route.locale,
  }));
  const [isBillingDetailsModalOpen, setIsBillingDetailsModalOpen] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  function onClickHandler(e: React.MouseEvent) {
    e.preventDefault();
    setIsBillingDetailsModalOpen(true);
  }

  function submit() {
    if (account && amount) {
      const preparedData: ISkrillDepositRequest = {
        PaymentMethod: EDepositMethodCode.skrill,
        first_name: profile.first_name,
        surname: profile.last_name,
        city: billingDetails?.city ?? profile.city,
        postcode: billingDetails?.postcode ?? profile.city,
        email: profile.email,
        amount: amount,
        currency: account?.currency as string,
        country_code: billingDetails?.country?.code as string,
        language_code: locale,
      };
      if (account && account?.type !== ETradingType.fake) {
        Object.assign(preparedData, {
          trade_account: account.accountId?.toString() as string,
          trade_platform: account.platform as string,
        });
      }
      console.log(appendAndSubmitForm('https://api.hycm.com/deposits/add', preparedData));
      // dispatch(
      //   ac_addDeposit<ISkrillDepositRequest>(preparedData, (e) => {
      //     console.log('link', e);
      //     window.location = e.split('action="')[1].split('"')[0];
      //   }),
    }
  }

  return (
    <>
      <div className="form-wrapper py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <DetailsHeader />
        <Row>
          <Col xs={12}>
            <Button onClick={submit}>{t('Deposit')}</Button>
          </Col>
        </Row>
      </div>
      <div className="py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <Row className="note">
          <Col xs={12} sm={6}>
            {t('Edit your')}{' '}
            <a href="#" onClick={onClickHandler}>
              {t('billing address')}
            </a>
          </Col>
        </Row>
      </div>
      <BillingDetailsModal isModalOpen={isBillingDetailsModalOpen} setModalOpen={setIsBillingDetailsModalOpen} />
    </>
  );
}
