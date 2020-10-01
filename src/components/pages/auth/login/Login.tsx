import { Button, Input } from '@components/shared';
import { FieldValidators } from '@domain';
import { IClientProfile, ILoginRequest } from '@domain/interfaces';
import { ac_login, IStore } from '@store';
import { Form, Formik, FormikProps } from 'formik';
import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import './Login.scss';

enum EFields {
  'username' = 'username',
  'password' = 'password',
}

export function Login() {
  const { profile } = useSelector<IStore, { profile: IClientProfile }>((state) => ({
    profile: state.data.client.profile,
  }));
  const dispatch = useDispatch();
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    [EFields.username]: FieldValidators.loginAndEmail,
    [EFields.password]: FieldValidators.requiredString,
  });

  useEffect(() => {
    if (!!profile) {
      history.push('/dashboard');
    }
  }, [profile]);

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <h3 className="text-center mb-7">Login</h3>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(data: ILoginRequest) => {
              dispatch(ac_login(data));
            }}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label="Login" name={EFields.username} />
                <Input label="Password" type="password" name={EFields.password} />
                <Button type="submit">Submit</Button>
              </Form>
            )}
          </Formik>
          <div className="mt-5 text-center d-flex align-items-center justify-content-between forgot-create">
            <Link to={'/restore-password'}>Restore password</Link>
            <Link to={'/registration'}>Create Live Account</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
