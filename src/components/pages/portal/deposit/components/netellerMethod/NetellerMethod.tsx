import React, { useContext } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button, Input } from '@components/shared';
import { depositActionCreators, DepositContext } from '../../depositContext';
import { FieldValidators } from '@domain';
import { Col, Row } from 'react-bootstrap';
import { DetailsHeader } from '..';

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
                    <Button type="submit">Deposit</Button>
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </div>
      <div className="py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto text-center">
        <Row className="note">
          <Col xs={12}>Notes on Deposits and Withdrawals by Neteller online wallet</Col>
        </Row>
      </div>
    </>
  );
}
