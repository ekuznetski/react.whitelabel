import { Button, Input, Svg } from '@components/shared';
import { FieldValidators } from '@domain';
import { ECreditCardType, EDepositMethodCode, ELanguage, ETradingType } from '@domain/enums';
import { ICreditCardDepositRequest } from '@domain/interfaces';
import { MClientProfile } from '@domain/models';
import { IStore, ac_addDeposit } from '@store';
import cardValidator from 'card-validator';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { BillingDetailsModal, CreditCardInfoModal, DetailsHeader } from '..';
import { IDepositState, depositActionCreators, useDepositDispatch, useDepositState } from '../../deposit.context';
import './CardMethod.scss';

enum EFields {
  'cardholderName' = 'cardholderName',
  'cardNumber' = 'cardNumber',
  'month' = 'month',
  'year' = 'year',
  'cvc' = 'cvc',
}

export function CardMethod() {
  const { account, amount, billingDetails }: IDepositState = useDepositState();
  const depositContextDispatch = useDepositDispatch();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [cardNumberCaretPosition, setCardNumberCaretPosition] = useState<any>();
  const [cardType, setCardType] = useState<string | null>(null);
  const [isBillingDetailsModalOpen, setIsBillingDetailsModalOpen] = React.useState<boolean>(false);
  const [isCreditCardInfoModalOpen, setCreditCardInfoModalOpen] = React.useState<boolean>(false);
  const ref = React.createRef<HTMLInputElement>();
  const { profile, locale } = useSelector<IStore, { profile: MClientProfile; locale: ELanguage }>((state) => ({
    profile: state.data.client.profile,
    locale: state.app.route.locale,
  }));
  const currentYear = new Date().getFullYear();

  // useEffect(() => {
  //   // if (cardNumberCaretPosition?.start && cardNumberCaretPosition?.end) {
  //   ref.current?.setSelectionRange(cardNumberCaretPosition?.start, cardNumberCaretPosition?.end);
  //   // }
  // }, [cardNumberCaretPosition]);

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

  function formatCreditCard(cardNumber: string, gaps: number[] | undefined): string {
    gaps = gaps ? [0, ...gaps] : [0, 4, 8, 12];
    let result = '';
    for (let i = 1; i < gaps.length; i++) {
      result += cardNumber.slice(gaps[i - 1], gaps[i]) + ' ';
      if (i === gaps.length - 1) {
        result += cardNumber.slice(gaps[i]);
      }
    }
    return result.trim();
  }

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

  return (
    <>
      <div className="card-method-wrapper form-wrapper py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <DetailsHeader />
        <Formik
          initialValues={{
            cardholderName: 'TEST TEST',
            cardNumber: '4000000000000077',
            month: '12',
            year: '25',
            cvc: '123',
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            const _data = { ...data };
            _data.cardNumber = _data.cardNumber.replaceAll(' ', '');
            const preparedData: ICreditCardDepositRequest = {
              amount: amount as string,
              PaymentMethod: EDepositMethodCode.creditCard,
              currency: account?.currency as string,
              first_name: profile.first_name,
              surname: profile.last_name,
              postcode: billingDetails?.postcode ?? profile.postcode,
              city: billingDetails?.city ?? profile.city,
              country: (billingDetails?.country?.name ?? profile.country.name) as string,
              country_code: (billingDetails?.country?.code ?? profile.country.code) as string,
              phone: profile.phone.toString(),
              email: profile.email,
              address: billingDetails?.address ?? profile.street,
              language_code: locale.toUpperCase(),
              name_on_card: _data.cardholderName,
              card_number: _data.cardNumber,
              expiry_month: _data.month,
              expiry_year: _data.year.slice(-2),
              cvv: _data.cvc,
              deposit_ip: '',
            };
            if (account && account?.type !== ETradingType.fake) {
              Object.assign(preparedData, {
                trade_platform: account.platformName as string,
                trade_account: account.accountId?.toString(),
              });
            }
            if (!!billingDetails?.state_code || !!profile.state.code) {
              console.log(123);
              Object.assign(preparedData, {
                state_code: (billingDetails?.state_code as string) ?? profile.state.code,
              });
            }
            dispatch(ac_addDeposit<ICreditCardDepositRequest>(preparedData));
            depositContextDispatch(depositActionCreators.setDepositDetails(_data));
            console.log(preparedData);
          }}
        >
          {(props: any) => {
            const { values, setFieldValue } = props;

            return (
              <Form className="m-auto form">
                <Row>
                  <Col xs={12}>
                    <Input label="Сardholder Name" name={EFields.cardholderName} className="cardholder" />
                  </Col>
                  <Col xs={12} className="card-number">
                    {cardType && <Svg href={`${cardType}-logo`} width={45} className={`card-icon ${cardType}`} />}
                    <Input
                      label="Сard Number"
                      name={EFields.cardNumber}
                      regex={/^\d{0,25}$/}
                      ref={ref}
                      onChange={(e: any) => {
                        const val = e.target.value.replaceAll(' ', '');
                        if (/^\d{0,25}$/.test(val)) {
                          const cardType = cardValidator.number(val).card?.type;
                          const gaps = cardValidator.number(val).card?.gaps;
                          if (!!cardType && !!ECreditCardType[cardType as ECreditCardType]) {
                            setCardType(cardType);
                          } else {
                            setCardType(null);
                          }
                          setFieldValue(EFields.cardNumber, formatCreditCard(val, gaps));
                          setCardNumberCaretPosition({
                            start: e.target.selectionStart,
                            end: e.target.selectionEnd,
                          });
                        }
                      }}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Input
                      label="Month"
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
                      label="Year"
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
                    <Svg href="shrimp" width={20} />
                  </Col>
                  <Col xs={12}>
                    <Button type="submit">Deposit</Button>
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
