import { Button, Checkbox, Input, PhoneCodeSelect, TextArea } from '@components/shared';
import { CustomFieldValidators, FieldValidators } from '@domain';
import { ENotificationType, countries } from '@domain/enums';
import { IPartnershipRegistrationRequest } from '@domain/interfaces';
import { locale } from '@pages/main/partnerships';
import { EActionTypes, IStore, ac_partnershipRegisterStandard, ac_showNotification } from '@store';
import { useLabelName } from '@utils/hooks';
import { Form, Formik, FormikHelpers, FormikProps, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

enum EFields {
  'language' = 'language',
  'name' = 'name',
  'email' = 'email',
  'phone' = 'phone',
  'message' = 'message',
  'phone_prefix' = 'phone_prefix',
  'acceptPolicy' = 'acceptPolicy',
}

export const AffiliateForm = memo(() => {
  const { geoIp } = useSelector<IStore, any>((state) => ({
    geoIp: state.data.geoIp,
  }));
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const labelName = useLabelName();

  const validationSchema = Yup.object().shape({
    [EFields.name]: FieldValidators.name,
    [EFields.email]: FieldValidators.email,
    [EFields.phone_prefix]: CustomFieldValidators.country,
    [EFields.phone]: FieldValidators.phone,
    [EFields.message]: FieldValidators.requiredString,
    [EFields.acceptPolicy]: Yup.bool().oneOf([true], t('This field is required')),
  });

  function Submit(data: FormikValues, { resetForm }: FormikHelpers<any>) {
    const values = data;
    values[EFields.phone] = values[EFields.phone_prefix].phoneCode + values[EFields.phone];
    values[EFields.language] = i18n.language;
    delete values[EFields.acceptPolicy];
    delete values[EFields.phone_prefix];

    dispatch(
      ac_partnershipRegisterStandard(
        values as IPartnershipRegistrationRequest,
        () => {
          resetForm();
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('Thank You For Submitting Your Information'),
            }),
          );
        },
        () => {
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: t('Error'),
            }),
          );
        },
      ),
    );
  }

  return (
    <Container className="affiliate-form partnership__form">
      <Row>
        <Col sm={12} md={8} lg={6} xl={5} className="m-auto">
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
                <div className="phone-wrapper">
                  <PhoneCodeSelect placeholder={t('Prefix')} name={EFields.phone_prefix} />
                  <Input label={t('Phone')} name={EFields.phone} regex={/^\d*$/gm} />
                </div>
                <TextArea label={t('Message')} name={EFields.message} rows={4} />
                <Checkbox name={EFields.acceptPolicy} className="mb-10">
                  {locale.acceptPolicy}
                </Checkbox>
                <Button type="submit" loadingOnAction={EActionTypes.partnershipRegister}>
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
