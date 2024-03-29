import { Button, Checkbox, Col, Container, CountrySelect, Input, PhoneCodeSelect, Row } from '@components/shared';
import { CustomFieldValidators, FieldValidators } from '@domain';
import { ENotificationType, countries } from '@domain/enums';
import { IPartnershipIBRegistrationRequest } from '@domain/interfaces';
import { EActionTypes, IStore, ac_partnershipRegisterIB, ac_showNotification } from '@store';
import { Form, Formik, FormikHelpers, FormikValues } from 'formik';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

enum EFields {
  'firstName' = 'first_name',
  'surName' = 'surname',
  'email' = 'email',
  'company' = 'company',
  'phone' = 'phone',
  'phone_prefix' = 'phone_prefix',
  'country' = 'country',
  'address' = 'address',
  'acceptPolicy' = 'acceptPolicy',
}

export const BrokersForm = memo(function BrokersForm() {
  const { geoIp } = useSelector<IStore, any>((state) => ({
    geoIp: state.data.geoIp,
  }));
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    [EFields.firstName]: FieldValidators.firstName,
    [EFields.surName]: FieldValidators.lastName,
    [EFields.email]: FieldValidators.email,
    [EFields.company]: FieldValidators.company,
    [EFields.phone]: FieldValidators.phone,
    [EFields.phone_prefix]: CustomFieldValidators.country,
    [EFields.country]: Yup.mixed().required(),
    [EFields.address]: FieldValidators.street,
    [EFields.acceptPolicy]: Yup.bool().oneOf([true], t('This field is required')),
  });

  function Submit(data: FormikValues, { resetForm }: FormikHelpers<any>) {
    const values = data;
    values[EFields.phone] = values[EFields.phone_prefix].phoneCode + values[EFields.phone];
    values[EFields.country] = values[EFields.country].name;
    delete values[EFields.acceptPolicy];
    delete values[EFields.phone_prefix];

    dispatch(
      ac_partnershipRegisterIB(
        data as IPartnershipIBRegistrationRequest,
        () => {
          resetForm();
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('IB Registration Completed'),
            }),
          );
        },
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: 'Error',
            }),
          );
        },
      ),
    );
  }

  return (
    <Container className="ib-form partnership__form">
      <Row>
        <Col sm={12} md={8} lg={6} xl={5} className="m-auto">
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
            {() => (
              <Form className="m-auto form">
                <Input label={t('First Name')} name={EFields.firstName} />
                <Input label={t('Surname')} name={EFields.surName} />
                <Input label={t('Email')} type="email" name={EFields.email} />
                <Input label={t('Company')} name={EFields.company} />
                <div className="phone-wrapper">
                  <PhoneCodeSelect placeholder={t('Prefix')} name={EFields.phone_prefix} />
                  <Input label={t('Phone')} name={EFields.phone} regex={/^\d*$/gm} />
                </div>
                <CountrySelect label={t('Country')} name={EFields.country} />
                <Input label={t('Address')} name={EFields.address} />
                <Checkbox name={EFields.acceptPolicy} className="mb-10">
                  {t('Accept Policy')}
                </Checkbox>
                <Button type="submit" loadingOnAction={EActionTypes.partnershipRegisterIB}>
                  {t('Submit')}
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
});
