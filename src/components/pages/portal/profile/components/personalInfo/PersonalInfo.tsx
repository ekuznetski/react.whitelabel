import { Button, CountrySelect, Input, PhoneCodeSelect } from '@components/shared';
import { FieldValidators } from '@domain';
import { countries, ECountryCode } from '@domain/enums';
import { IStore } from '@store';
import { Form, Formik, FormikProps } from 'formik';
import React, { forwardRef, memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

enum EFields {
  'email' = 'email',
  'first_name' = 'first_name',
  'last_name' = 'last_name',
  'country' = 'country',
  'city' = 'city',
  'street' = 'street',
  'postcode' = 'postcode',
  'phone' = 'phone',
  'phone_code' = 'phone_code',
}

export const PersonalInfo = memo(
  forwardRef<HTMLDivElement>(function PersonalInfo(props, ref) {
    const { geoIp } = useSelector<IStore, any>((state) => ({
      geoIp: state.data.geoIp,
    }));
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
      email: FieldValidators.email.max(100, 'Name must not exceed ${max} characters'),
      first_name: FieldValidators.name.max(100, 'Bank Name must not exceed ${max} characters'),
      last_name: FieldValidators.name.max(100, 'Bank Account Number must not exceed ${max} symbols'),
      country: Yup.mixed().required(),
      city: FieldValidators.city.max(50, 'city must not exceed ${max} characters'),
      street: FieldValidators.street.max(100, 'Bank Branch Name must not exceed ${max} characters'),
      postcode: Yup.string().when('country', {
        is: (val) => val !== 'AE',
        then: FieldValidators.postcode.max(20, 'Postcode must not exceed ${max} characters'),
        overwise: Yup.string(),
      }),
    });

    return (
      <div className="personal-info">
        <Container className="internal-transfer-page-wrapper">
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8} xl={7} className="form-wrapper py-10 px-9">
              <Formik
                initialValues={{
                  email: '',
                  first_name: '',
                  last_name: '',
                  country: '',
                  city: '',
                  street: '',
                  postcode: '',
                }}
                validationSchema={validationSchema}
                onSubmit={() => alert('Call `clients/editProfile` API.')}
              >
                {({ values, setFieldValue }: FormikProps<any>) => {
                  const _country = React.useMemo(
                    () => (values.country ? countries.find((country) => country.code === values.country) : null),
                    [values.country],
                  );

                  return (
                    <Form className="internal-transfer__form">
                      <Input label={t('Email')} name={EFields.last_name} />
                      <Row>
                        <Col xs={12} md={6}>
                          <Input label={t('First Name')} name={EFields.email} />
                        </Col>
                        <Col xs={12} md={6}>
                          <Input label={t('Last Name')} name={EFields.first_name} />
                        </Col>
                      </Row>
                      <div className="form_breakline mt-2 mb-10" />
                      <CountrySelect label={t('Country')} name={EFields.country} />
                      <Input label={t('City')} name={EFields.city} />
                      <Input label={t('Adress 1')} name={EFields.street} />
                      {_country?.code !== ECountryCode.AE && (
                        <Input
                          label={
                            !_country?.postcodeRequired ? t('Postal Code') : t('Postal Code') + ' ' + t('Optional')
                          }
                          name={EFields.postcode}
                        />
                      )}
                      <div className="form_breakline mt-10 mb-10" />
                      <div className="phone-wrapper">
                        <PhoneCodeSelect name={EFields.phone_code} preselectedValue={geoIp?.countryCode} />
                        <Input
                          label={t('Phone')}
                          name={EFields.phone}
                          onChange={(e: any) => {
                            if (/^\d*$/gm.test(e.target.value) || e.target.value === '') {
                              e.preventDefault();
                              setFieldValue(EFields.phone, e.target.value);
                            }
                          }}
                        />
                      </div>
                      <Button type="submit">{t('Save')}</Button>
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
