import { Button, Input } from '@components/shared';
import { FieldValidators } from '@domain';
import { Form, Formik } from 'formik';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { DetailsHeader } from '..';
import { depositActionCreators, DepositContext } from '../../depositContext';

enum EFields {
  'account' = 'account',
  'secureId' = 'secureId',
}

export function NetellerMethod() {
  const { dispatch } = useContext<any>(DepositContext);

  //TODO setup validataion
  const validationSchema = Yup.object().shape({
    account: FieldValidators.requiredString,
    secureId: FieldValidators.requiredString,
  });

  const { t } = useTranslation();

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
                    <Input label="Email or Account ID" name={EFields.account} />
                  </Col>
                  <Col xs={12}>
                    <Input label="Secure ID or Authentication Code" name={EFields.secureId} />
                  </Col>
                  <Col xs={12}>
                    <Button type="submit">{t('Deposit')}</Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto text-center">
        <Row className="note">
          <Col xs={12}>{t('Neteller notes desc')}</Col>
        </Row>
      </div>
    </>
  );
}
