import { Button, LocaleLink, Svg } from '@components/shared';
import { EDepositMethods, EResponseStatus } from '@domain/enums';
import { usePathLocale } from '@utils/hooks';
import React, { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import './DepositSuccessFailure.scss';

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
                  <Svg href="shrimp" height={20} className="mr-2" />
                  {t('LiveChat')}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Svg href="shrimp" height={20} className="mr-2" />
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
  const history = useHistory();
  const { localizePath } = usePathLocale();
  const { t } = useTranslation();

  return (
    <div className="deposit-success">
      <div className="result mb-5">{t('Successful Transaction')}</div>
      <div className="sub-result">
        {t('Thank you. Your payment has been processed to balance of your trading account')}
      </div>
      <Svg href="shrimp" height={50} className="my-12" />
      <Button>
        <LocaleLink to="/deposit">{t('Make another Transaction')}</LocaleLink>
      </Button>
    </div>
  );
}

function DepositFailure() {
  const { t } = useTranslation();
  function createLinkObject(method: EDepositMethods) {
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
      <div className="payment-methods-imgs d-flex justify-content-between align-items-center mx-auto mt-5 mb-5">
        <LocaleLink to={createLinkObject(EDepositMethods.creditCard)}>
          <Svg href="visaMastercard" height={30} />
        </LocaleLink>
        <LocaleLink to={createLinkObject(EDepositMethods.skrill)}>
          <Svg href="skrill" height={30} />
        </LocaleLink>
        <LocaleLink to={createLinkObject(EDepositMethods.neteller)}>
          <Svg href="neteller" height={30} />
        </LocaleLink>
        <LocaleLink to={createLinkObject(EDepositMethods.webmoney)}>
          <Svg href="webmoney" height={30} />
        </LocaleLink>
        <LocaleLink to={createLinkObject(EDepositMethods.bankWire)}>
          <Svg href="bankwire" height={30} />
        </LocaleLink>
      </div>
    </div>
  );
}
