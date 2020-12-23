import { Button, CountrySelect, Input, PhoneCodeSelect } from '@components/shared';
import { FieldValidators } from '@domain';
import { ECountryCode, ENotificationType } from '@domain/enums';
import { IEditProfileRequest } from '@domain/interfaces';
import { MClientProfile } from '@domain/models';
import { ac_editProfile, ac_showNotification, EActionTypes, IStore } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

enum EFields {
  'email' = 'email',
  'first_name' = 'first_name',
  'surname' = 'surname',
  'country' = 'country',
  'city' = 'city',
  'street' = 'street',
  'postcode' = 'postcode',
  'phone' = 'phone',
  'phone_prefix' = 'phone_prefix',
}

export const PersonalInfo = memo(
  forwardRef<HTMLDivElement>(function PersonalInfo(props, ref) {
    const { profile } = useSelector<IStore, { profile: MClientProfile }>((state) => ({
      profile: state.data.client.profile,
    }));
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
      email: FieldValidators.email.max(100, t('Name characters count restriction')),
      first_name: FieldValidators.name.max(100, t('Bank Name characters count restriction')),
      surname: FieldValidators.name.max(100, t('Bank Account Number count restriction')),
      country: Yup.mixed().required(),
      city: FieldValidators.city.max(50, t('City characters count restriction')),
      street: FieldValidators.street.max(100, t('Bank Branch Name characters count restriction')),
      postcode: Yup.string().when('country', {
        is: (val) => val !== 'AE',
        then: FieldValidators.postcode.max(20, t('Postcode characters count restriction')),
        overwise: Yup.string(),
      }),
    });

    function Submit(data: FormikValues) {
      dispatch(
        ac_editProfile(
          data as IEditProfileRequest,
          () =>
            dispatch(
              ac_showNotification({
                type: ENotificationType.success,
                context: t('The Profile Has Been Updated'),
              }),
            ),
          () =>
            dispatch(
              ac_showNotification({
                type: ENotificationType.danger,
                context: t('Failed To Update Client Profile'),
              }),
            ),
        ),
      );
    }

    return (
      <div className="personal-info">
        <Container className="personal-info-page-wrapper">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8} xl={7} className="form-wrapper py-10 px-9">
              <Formik
                initialValues={{
                  email: profile.email,
                  first_name: profile.first_name,
                  surname: profile.last_name,
                  country: profile.country,
                  city: profile.city,
                  street: profile.street,
                  phone: profile.phone,
                  phone_prefix: profile.phone_prefix_code,
                  postcode: profile.postcode,
                }}
                validationSchema={validationSchema}
                onSubmit={Submit}
              >
                {({ values, setFieldValue }: FormikProps<any>) => {
                  return (
                    <Form className="personal-info__form">
                      <Input label={t('Email')} name={EFields.email} />
                      <Row>
                        <Col xs={12} md={6}>
                          <Input label={t('First Name')} name={EFields.first_name} />
                        </Col>
                        <Col xs={12} md={6}>
                          <Input label={t('Last Name')} name={EFields.surname} />
                        </Col>
                      </Row>
                      <div className="form-breakline mt-2 mb-10" />
                      <CountrySelect label={t('Country')} name={EFields.country} />
                      <Input label={t('City')} name={EFields.city} />
                      <Input label={t('Full Address')} name={EFields.street} />
                      {values.country?.code !== ECountryCode.AE && (
                        <Input
                          label={`${t('Postal Code')}${!values.country?.postcodeRequired ? ' ' + t('Optional') : ''}`}
                          name={EFields.postcode}
                        />
                      )}
                      <div className="form-breakline mt-10 mb-10" />
                      <div className="phone-wrapper">
                        <PhoneCodeSelect name={EFields.phone_prefix} />
                        <Input label={t('Phone')} name={EFields.phone} regex={/^\d*$/gm} />
                      </div>
                      <Button type="submit" loadingOnAction={EActionTypes.editProfile}>
                        {t('Save')}
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }),
);
