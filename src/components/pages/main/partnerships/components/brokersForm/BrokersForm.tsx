import { Button, Checkbox, CountrySelect, Input, PhoneCodeSelect } from '@components/shared';
import { CustomFieldValidators, FieldValidators } from '@domain';
import { ENotificationType, countries } from '@domain/enums';
import { IPartnershipIBRegistrationRequest } from '@domain/interfaces';
import { IStore, ac_partnershipRegisterIB, ac_showNotification } from '@store';
import { useLabelName } from '@utils/hooks';
import { Form, Formik, FormikValues } from 'formik';
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

export const BrokersForm = memo(function BrokersForm() {
  const { geoIp } = useSelector<IStore, any>((state) => ({
    geoIp: state.data.geoIp,
  }));
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const labelName = useLabelName();

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
    dispatch(
      ac_partnershipRegisterIB(
        data as IPartnershipIBRegistrationRequest,
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              context: t('IB Registration Completed'),
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
                <Button type="submit">{t('Submit')}</Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
});
