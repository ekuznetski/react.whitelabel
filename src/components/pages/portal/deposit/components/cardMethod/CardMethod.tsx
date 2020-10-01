import { Button, Input, Svg } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { BillingDetailsModal, CreditCardInfoModal, DetailsHeader } from '..';
import { depositActionCreators, DepositContext } from '../../depositContext';

enum EFields {
  'cardholderName' = 'cardholderName',
  'cardName' = 'cardName',
  'month' = 'month',
  'year' = 'year',
  'cvc' = 'cvc',
}

export function CardMethod() {
  const { dispatch } = useContext<any>(DepositContext);
  const { t } = useTranslation();
  const [isBillingDetailsModalOpen, setIsBillingDetailsModalOpen] = React.useState<boolean>(false);
  const [isCreditCardInfoModalOpen, setCreditCardInfoModalOpen] = React.useState<boolean>(false);

  function openBillingDetailsModal(e: React.MouseEvent) {
    e.preventDefault();
    setIsBillingDetailsModalOpen(true);
  }

  function openCreditCardInfoModal(e: React.MouseEvent) {
    e.preventDefault();
    setCreditCardInfoModalOpen(true);
  }

  //TODO setup validataion
  const validationSchema = Yup.object().shape({
    cardholderName: FieldValidators.requiredString,
    secureId: FieldValidators.requiredString,
  });

  return (
    <>
      <div className="form-wrapper py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <DetailsHeader />
        <Formik
          initialValues={{}}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            dispatch(depositActionCreators.setDepositDetails(data));
          }}
        >
          {(props: any) => {
            const { values, setFieldValue } = props;

            return (
              <Form className="m-auto form fadein-row">
                <Row>
                  <Col xs={12}>
                    <Input label="Сardholder Name" name={EFields.cardholderName} />
                  </Col>
                  <Col xs={12}>
                    <Input label="Сard Name" name={EFields.cardName} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Input label="Month" name={EFields.month} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Input label="Year" name={EFields.year} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Input label="CVV/CVC" name={EFields.cvc} />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Svg href="shrimp.svg" width={20} />
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
