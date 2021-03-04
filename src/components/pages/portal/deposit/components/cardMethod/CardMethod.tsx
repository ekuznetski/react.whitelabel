import { Button, Input, Svg } from '@components/shared';
import { FieldValidators } from '@domain';
import { ECreditCardType, EDepositMethodCode, ELanguage, EPagePath, ETradingType } from '@domain/enums';
import { ICreditCardDepositRequest } from '@domain/interfaces';
import { MClientProfile } from '@domain/models';
import { EActionTypes, IStore, ac_addDeposit } from '@store';
import cardValidator from 'card-validator';
import { Form, Formik, FormikValues } from 'formik';
import { usePathLocale } from '@utils/hooks';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { Col, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { BillingDetailsModal, CreditCardInfoModal, DetailsHeader } from '..';
import { IDepositState, depositActionCreators, useDepositDispatch, useDepositState } from '../../deposit.context';
import Payment from 'payment';
import './CardMethod.scss';

enum EFields {
  'cardholderName' = 'cardholderName',
  'cardNumber' = 'cardNumber',
  'month' = 'month',
  'year' = 'year',
  'cvc' = 'cvc',
}

export function CardMethod() {
  const { profile, locale } = useSelector<IStore, { profile: MClientProfile; locale: ELanguage }>((state) => ({
    profile: state.data.client.profile,
    locale: state.app.route.locale,
  }));
  const { account, amount, billingDetails }: IDepositState = useDepositState();
  const [isBillingDetailsModalOpen, setIsBillingDetailsModalOpen] = React.useState<boolean>(false);
  const [isCreditCardInfoModalOpen, setCreditCardInfoModalOpen] = React.useState<boolean>(false);
  const [cardType, setCardType] = useState<string | null>(null);
  const depositContextDispatch = useDepositDispatch();
  const dispatch = useDispatch();
  const history = useHistory();
  const { localizePath } = usePathLocale();
  const { t } = useTranslation();
  const ref = React.createRef<HTMLInputElement>();
  const currentYear = new Date().getFullYear();

  const validationSchema = Yup.object().shape({
    cardholderName: FieldValidators.requiredString.test(
      'cardholderName',
      t('This field is invalid'),
      (val) => cardValidator.cardholderName(val).isValid,
    ),
    cardNumber: FieldValidators.requiredString.test(
      'cardNumber',
      t('This field is invalid'),
      (val) => cardValidator.number(val?.replaceAll(' ', '')).isValid,
    ),
    month: FieldValidators.requiredNumber.when([EFields.year], {
      is: (year) => !!year,
      then: FieldValidators.requiredNumber
        .min(1, t('This field is invalid'))
        .max(12, t('This field is invalid'))
        .test('isBiggerCurrentMonth', '', function (value) {
          if (value) {
            const { path, parent, createError } = this;
            const { year } = parent;
            const _val = value;
            const currentMonth = new Date().getMonth() + 1;
            const invalidMonth = formatYear(year) === currentYear ? _val < currentMonth : _val > 12;
            if (invalidMonth) {
              return createError({
                path,
                message: t('Date is expired'),
              });
            }
          }
          return true;
        }),
      otherwise: FieldValidators.requiredNumber.min(1, t('Invalid value')).max(12, t('Month Limit')),
    }),
    year: FieldValidators.requiredNumber.test(
      'year',
      t('This field is invalid'),
      (val) => !!val && formatYear(val) >= currentYear,
    ),
    cvc: FieldValidators.requiredString.test(
      'cvc',
      t('This field is invalid'),
      (val) => cardValidator.cvv(val).isValid,
    ),
  });

  function openBillingDetailsModal(e: React.MouseEvent) {
    e.preventDefault();
    setIsBillingDetailsModalOpen(true);
  }

  function openCreditCardInfoModal(e: React.MouseEvent) {
    e.preventDefault();
    setCreditCardInfoModalOpen(true);
  }

  function formatYear(val: number): number {
    return val < 2000 ? val + 2000 : val;
  }

  function Submit(data: FormikValues) {
    const _data = { ...data };
    const preparedData: ICreditCardDepositRequest = {
      amount: amount as string,
      paymentMethod: EDepositMethodCode.creditCard,
      currency: account?.currency as string,
      firstName: profile.first_name,
      surname: profile.last_name,
      postcode: billingDetails?.postcode ?? profile.postcode,
      city: billingDetails?.city ?? profile.city,
      countryCode: (billingDetails?.country?.code ?? profile.country.code) as string,
      street: billingDetails?.address ?? profile.street,
      nameOnCard: _data.cardholderName,
      cardNumber: _data.cardNumber.replaceAll(' ', ''),
      expiryMonth: _data.month,
      expiryYear: _data.year.slice(-2),
      cvv: _data.cvc,
    };

    if (account && account?.type !== ETradingType.fake) {
      Object.assign(preparedData, {
        tradePlatform: account.platform,
        tradeAccount: account.accountId?.toString(),
      });
    }

    dispatch(
      ac_addDeposit<ICreditCardDepositRequest>(
        preparedData,
        ({ response }) => {
          if (typeof response.message === 'string') {
            history.push(localizePath(EPagePath.DepositSuccess));
          } else {
            window.location = response.message.url;
          }
        },
        () => {
          history.push(localizePath(EPagePath.DepositFailure));
        },
      ),
    );
    depositContextDispatch(depositActionCreators.setDepositDetails(_data));
    // console.log(preparedData);
  }

  return (
    <>
      <div className="card-method-wrapper form-wrapper py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <DetailsHeader />
        <Formik
          initialValues={{
            cardholderName: '',
            cardNumber: '',
            month: '',
            year: '',
            cvc: '',
          }}
          validationSchema={validationSchema}
          onSubmit={Submit}
        >
          {({ setFieldValue }) => {
            return (
              <Form className="m-auto form">
                <Row>
                  <Col xs={12}>
                    <Input label={t('Сardholder Name')} name={EFields.cardholderName} className="cardholder" />
                  </Col>
                  <Col xs={12} className="card-number">
                    {cardType && <Svg href={`${cardType}`} width={45} className={`card-icon ${cardType}`} />}
                    <Input
                      label={t('Сard Number')}
                      name={EFields.cardNumber}
                      // regex={/^\d{0,25}$/}
                      ref={ref}
                      onChange={(e: any) => {
                        const val = e.target.value.replaceAll(' ', '');
                        if (/^\d{0,25}$/.test(val)) {
                          const cardType = cardValidator.number(val).card?.type;
                          if (!!cardType && !!ECreditCardType[cardType as ECreditCardType]) {
                            setCardType(cardType);
                          } else {
                            setCardType(null);
                          }
                        }
                        Payment.formatCardNumber(e.target);
                      }}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Input
                      label={t('Month')}
                      type="number"
                      regex={/^\d{0,2}$/}
                      onBlur={(e: any) => {
                        const val = e.target.value;
                        if (val.length === 1) {
                          setFieldValue(EFields.month, '0' + val);
                        }
                      }}
                      name={EFields.month}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Input
                      label={t('Year')}
                      type="number"
                      regex={/^\d{0,4}$/}
                      onBlur={(e: any) => {
                        const val = e.target.value;
                        if (val.length === 2) {
                          setFieldValue(EFields.year, '20' + val);
                        }
                      }}
                      name={EFields.year}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Input type="number" label="CVV/CVC" regex={/^\d{0,3}$/} name={EFields.cvc} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Svg className="mb-8 mb-sm-0" href="secure-payment" />
                  </Col>
                  <Col xs={12}>
                    <Button type="submit" className={'tests'} loadingOnAction={[EActionTypes.addDeposit]}>
                      {t('Deposit')}
                    </Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <Row className="note">
          <Col xs={12} sm={6}>
            {t('Edit your')}{' '}
            <a href="#" onClick={openBillingDetailsModal}>
              {t('billing address')}
            </a>
          </Col>
          <Col xs={12} sm={6}>
            <a href="#" onClick={openCreditCardInfoModal}>
              {t('Debit/Credit Card Information')}
            </a>
          </Col>
        </Row>
      </div>
      <BillingDetailsModal isModalOpen={isBillingDetailsModalOpen} setModalOpen={setIsBillingDetailsModalOpen} />
      <CreditCardInfoModal isModalOpen={isCreditCardInfoModalOpen} setModalOpen={setCreditCardInfoModalOpen} />
    </>
  );
}
