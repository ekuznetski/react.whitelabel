import { Button, Checkbox, Input, LocaleLink, PageTitle, PhoneCodeSelect, TextArea } from '@components/shared';
import { CustomFieldValidators, env, FieldValidators } from '@domain';
import { countries, ELabelsName, ENotificationType } from '@domain/enums';
import { IPartnershipRegistrationRequest } from '@domain/interfaces';
import { ac_partnershipRegisterStandard, ac_showNotification, IStore } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import './AffiliateForm.scss';

enum EFields {
  'name' = 'name',
  'email' = 'email',
  'phone' = 'phone',
  'message' = 'message',
  'phone_prefix' = 'phone_prefix',
  'acceptPolicy' = 'acceptPolicy',
}

export const AffiliateForm = memo(() => {
  const { geoIp, locale } = useSelector<IStore, any>((state) => ({
    geoIp: state.data.geoIp,
    locale: state.app.route.locale,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    [EFields.name]: FieldValidators.name,
    [EFields.email]: FieldValidators.email,
    [EFields.phone_prefix]: CustomFieldValidators.country,
    [EFields.phone]: FieldValidators.phone,
    [EFields.message]: FieldValidators.name,
    [EFields.acceptPolicy]: Yup.bool().oneOf([true], t('This field is required')),
  });

  function Submit(data: FormikValues) {
    console.log(data);
    dispatch(
      ac_partnershipRegisterStandard(
        data as IPartnershipRegistrationRequest,
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              context: 'Email added to the queue.',
            }),
          ),
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.failure,
              context: 'Error',
            }),
          ),
      ),
    );
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              message: '',
              phone_prefix: geoIp?.countryCode ? countries.find((el) => el.code === geoIp?.countryCode) : '',
              acceptPolicy: false,
            }}
            validationSchema={validationSchema}
            onSubmit={Submit}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label={t('Name')} name={EFields.name} multiple />
                <Input label={t('Email')} type="email" name={EFields.email} />
                <div className="phone-wrapper fadeFromBottom-row__3">
                  <PhoneCodeSelect placeholder={t('Prefix')} name={EFields.phone_prefix}/>
                  <Input label={t('Phone')} name={EFields.phone} regex={/^\d*$/gm} />
                </div>
                <TextArea label={t('Message')} name={EFields.message} rows={4} />
                <Checkbox name={EFields.acceptPolicy} className="mb-10">
                  <Trans
                    i18nKey="Accept Policy"
                    values={{ name: ELabelsName[env.LABEL?.toLowerCase() as keyof typeof ELabelsName] }}
                  >
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
});
