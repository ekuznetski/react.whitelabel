import {
  Button,
  Checkbox,
  CountrySelect,
  Input,
  LocaleLink,
  PageTitle,
  PhoneCodeSelect,
  TextArea,
} from '@components/shared';
import { CustomFieldValidators, env, FieldValidators } from '@domain';
import { countries, ELabelsName, ENotificationType } from '@domain/enums';
import { IPartnershipIBRegistrationRequest } from '@domain/interfaces';
import { ac_partnershipRegisterIB, ac_showNotification, IStore } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

enum EFields {
  'firstName' = 'firstName',
  'surName' = 'surName',
  'email' = 'email',
  'company' = 'company',
  'phone' = 'phone',
  'phone_prefix' = 'phone_prefix',
  'country' = 'country',
  'address' = 'address',
  'acceptPolicy' = 'acceptPolicy',
}

export const BrokersForm = memo(() => {
  const { geoIp, locale } = useSelector<IStore, any>((state) => ({
    geoIp: state.data.geoIp,
    locale: state.app.route.locale,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    [EFields.firstName]: FieldValidators.name,
    [EFields.surName]: FieldValidators.name,
    [EFields.email]: FieldValidators.email,
    [EFields.company]: FieldValidators.company,
    [EFields.phone]: FieldValidators.numbers,
    [EFields.phone_prefix]: CustomFieldValidators.country,
    [EFields.country]: Yup.mixed().required(),
    [EFields.address]: FieldValidators.street,
    [EFields.acceptPolicy]: Yup.bool().oneOf([true], t('This field is required')),
  });

  function Submit(data: FormikValues) {
    console.log(data);
    dispatch(
      ac_partnershipRegisterIB(
        data as IPartnershipIBRegistrationRequest,
        () => {
          console.log('successss');
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              context: 'IB Registration Completed!',
            }),
          );
        },
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.failure,
              context: 'Error',
            }),
          );
        },
      ),
    );
  }

  return (
    <Container>
      <Row>
        <Col sm={12} md={7} lg={5} className="m-auto">
          <Formik
            initialValues={{
              firstName: '',
              surName: '',
              email: '',
              company: '',
              phone: '',
              phone_prefix: geoIp?.countryCode ? countries.find((el) => el.code === geoIp?.countryCode) : '',
              country: '',
              address: '',
              acceptPolicy: false,
            }}
            validationSchema={validationSchema}
            onSubmit={Submit}
          >
            {(props: FormikProps<any>) => (
              <Form className="m-auto form">
                <Input label={t('First Name')} name={EFields.firstName} />
                <Input label={t('Surname')} name={EFields.surName} />
                <Input label={t('Email')} type="email" name={EFields.email} />
                <Input label={t('Company')} name={EFields.company} />
                <div className="phone-wrapper fadeFromBottom-row__3">
                  <PhoneCodeSelect placeholder={t('Prefix')} name={EFields.phone_prefix} />
                  <Input label={t('Phone')} name={EFields.phone} regex={/^\d*$/gm} />
                </div>
                <CountrySelect label={t('Country')} name={EFields.country} />
                <Input label={t('Address')} name={EFields.address} />
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
