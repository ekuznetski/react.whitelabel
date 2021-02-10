import { Button, LocaleLink, Svg } from '@components/shared';
import { ECurrencyCode, EDepositMethodCode, EDepositMethodIcon, EResponseStatus } from '@domain/enums';
import { usePathLocale } from '@utils/hooks';
import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './DepositSuccessFailure.scss';
import { useSelector } from 'react-redux';
import { IAppStore, IStore } from '@store';
import { IClientSettings } from '@domain/interfaces';

export const DepositSuccessFailure = memo(function DepositSuccessFailure({ result }: { result: EResponseStatus }) {
  const { t } = useTranslation();
  return (
    <div className="deposit-success-failure-wrapper">
      <Row>
        <Col className="offset-md-3 col-12 col-md-6">
          <div className="deposit-success-failure-box px-10 py-9">
            {result === EResponseStatus.success && <DepositSuccess />}
            {result === EResponseStatus.failure && <DepositFailure />}
          </div>
          <div className="deposit-success-failure-footer mt-7">
            <Row>
              <Col className="col-12 col-md-7 d-flex justify-content-start align-items-center">
                {t('Get in touch with Customer Support:')}
              </Col>
              <Col className="col-12 col-md-5 d-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between align-items-center">
                  <Svg href="chat" height={20} className="mr-2" />
                  {t('LiveChat')}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Svg href="envelope" height={20} className="mr-2" />
                  {t('Email')}
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
});

function DepositSuccess() {
  const { t } = useTranslation();

  return (
    <div className="deposit-success">
      <div className="result mb-5">{t('Successful Transaction')}</div>
      <div className="sub-result">
        {t('Thank you. Your payment has been processed to balance of your trading account')}
      </div>
      <Svg href="card-payment-success" height={50} className="my-12" />
      <Button>
        <LocaleLink to="/deposit">{t('Make another Transaction')}</LocaleLink>
      </Button>
    </div>
  );
}

function DepositFailure() {
  const { allowed_deposit_methods: allowedMethods } = useSelector<
    IStore,
    Pick<IClientSettings, 'allowed_deposit_methods'>
  >((state) => ({
    allowed_deposit_methods: state.data.client.settings?.allowed_deposit_methods ?? [],
  }));
  const { t } = useTranslation();
  function createLinkObject(method: EDepositMethodCode) {
    return {
      pathname: '/deposit',
      state: {
        depositMethod: method,
      },
    };
  }
  return (
    <div className="deposit-failure">
      <div className="result mb-5">{t('Unsuccessful Transaction')}</div>
      <div className="sub-result">{t('Choose another payment method:')}</div>
      <div className="payment-methods-imgs d-flex justify-content-around align-items-center mx-auto mt-5 mb-5">
        {allowedMethods.map((method) => (
          <LocaleLink key={method} to={createLinkObject(method as EDepositMethodCode)}>
            <Svg href={EDepositMethodIcon[method as EDepositMethodCode]} height={30} />
          </LocaleLink>
        ))}
      </div>
    </div>
  );
}
