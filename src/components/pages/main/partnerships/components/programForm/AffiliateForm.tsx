import { Button, Checkbox, Input, LocaleLink, PageTitle, PhoneCodeSelect, TextArea } from '@components/shared';
import { CustomFieldValidators, env, FieldValidators } from '@domain';
import { ELabelsName, ENotificationType } from '@domain/enums';
import { ILoginRequest } from '@domain/interfaces';
import { ac_login, ac_showNotification } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import './AffiliateForm.scss';

enum EFields {
  'name' = 'name',
  'email' = 'email',
  'phone' = 'phone',
  'message' = 'message',
  'phone_prefix' = 'phone_prefix',
  'acceptPolicy' = 'acceptPolicy'
}

export function AffiliateForm() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    [EFields.name]: FieldValidators.name,
    [EFields.email]: FieldValidators.email,
    [EFields.phone_prefix]: CustomFieldValidators.country,
    [EFields.phone]: FieldValidators.numbers,
    [EFields.acceptPolicy]: Yup.bool().oneOf([true], t('This field is required')),
  });

  function Submit(data: FormikValues) {
    dispatch(
      ac_login(data as ILoginRequest, () => {
        dispatch(
          ac_showNotification({
            type: ENotificationType.failure,
            context: 'Incorrect Email/Username or Password',
          }),
        );
      }),
    );
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={Submit}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label={t('Name')} name={EFields.name} multiple />
                <Input label={t('Email')} type="email" name={EFields.email} />
                <div className="phone-wrapper fadeFromBottom-row__3">
                <PhoneCodeSelect placeholder={t('Prefix')} name={EFields.phone_prefix} />
                <Input label={t('Phone')} name={EFields.phone} regex={/^\d*$/gm} />
                </div>
                <TextArea label={t('Message')} name={EFields.message} rows={4}/>
                <Checkbox name={EFields.acceptPolicy} className="mb-10">
                    <Trans i18nKey="Accept Policy" values={{ name: ELabelsName[env.LABEL?.toLowerCase() as keyof typeof ELabelsName] }}>
                        I have read and accept the Privacy Policy of {name}
                    </Trans>
                </Checkbox>
                <Button type="submit">{t('Submit')}</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
}
