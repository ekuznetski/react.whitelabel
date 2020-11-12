import { Alert, Button, CountrySelect, Input, Radio, Select } from '@components/shared';
import { FieldValidators } from '@domain';
import { MClientData, MClientProfile } from '@domain/models';
import { EActionTypes, IStore } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import './eddForm.config';
import { empStatNgSelectValList } from './eddForm.config';
import './EddForm.scss';

export const EddForm = memo(function EddForm() {
  const { statusData, profile } = useSelector<IStore, { statusData: MClientData; profile: MClientProfile }>(
    (state) => ({
      statusData: state.data.client.statusData,
      profile: state.data.client.profile,
    }),
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const previousEmployerValidation = Yup.string().when('years_address', {
    is: (val) => val < 3,
    then: Yup.string().required(),
  });
  const validationSchema = Yup.object().shape({
    nationality: Yup.mixed().required(),
    own_property: Yup.boolean().required(),
    address: FieldValidators.street.required(),
    years_address: Yup.number().required(),
    previous_address: Yup.string().when('years_address', {
      is: (val) => val < 3,
      then: Yup.string().required(),
    }),
    employment_status: Yup.string().required(),
    employment_status_ext: Yup.mixed().when('employment_status', {
      is: (val) => val == 'other',
      then: Yup.mixed().required(),
    }),
    employer_name: Yup.string().required(),
    nature_of_business: Yup.string().required(),
    position: Yup.string().required(),
    years_employment: Yup.number().required(),
    working_financial: Yup.boolean().required(),
    employer_address: Yup.string().required(),
    phone: Yup.string().required(),
    other_income: Yup.string().required(),
    appr_annual_income: Yup.string().required(),
    appr_net_worth: Yup.string().required(),
    funds_available: Yup.string().required(),
    pr_employer_name: previousEmployerValidation,
    pr_nature_of_business: previousEmployerValidation,
    pr_position: previousEmployerValidation,
    pr_years_employment: previousEmployerValidation,
    pr_location_employment: previousEmployerValidation,
    pr_appr_annual_income: previousEmployerValidation,
  });

  function Submit(data: FormikValues) {
    // dispatch(
    //   ac_editProfile(
    //     data as IEditProfileRequest,
    //     () =>
    //       dispatch(
    //         ac_showNotification({
    //           type: ENotificationType.success,
    //           context: t('The Profile Has Been Updated'),
    //         }),
    //       ),
    //     () =>
    //       dispatch(
    //         ac_showNotification({
    //           type: ENotificationType.failure,
    //           context: t('Failed To Update Client Profile'),
    //         }),
    //       ),
    //   ),
    // );
  }

  return (
    <div className="edd-form">
      <Alert type="text" className="mb-7" showIcon={false}>
        You must complete the EDD form within 7 days or your account will be suspended. You will not be able to deposit
        or withdrawal or place any new trades and the account will be subject to liquidation only.
      </Alert>
      <Formik
        initialValues={Object.assign(
          Object.keys(validationSchema.fields || {}).reduce((acc, key) => Object.assign(acc, { [key]: '' }), {}),
          { nationality: profile.country },
        )}
        validationSchema={validationSchema}
        onSubmit={Submit}
      >
        {({ values, setFieldValue }: FormikProps<any>) => {
          useEffect(() => {
            setFieldValue('employment_status_ext', '');
          }, [values.employment_status]);

          return (
            <Form className="edd-form__form">
              <Row>
                <Col xs={12} xl={6}>
                  <CountrySelect label={t('Country')} name="nationality" />
                </Col>
                <Col xs={12} className="edd-form__col-title mb-2">
                  {t('Do you own the property?')}
                </Col>
                <Col xs={12} lg={6}>
                  <Radio
                    className="mb-8 mb-lg-0"
                    name="own_property"
                    options={[
                      { label: t('Yes'), value: 'yes' },
                      { label: t('No'), value: 'no' },
                    ]}
                  />
                </Col>
                <Col xs={12} lg={6}>
                  <Input label={t('Years at current address')} name="years_address" />
                </Col>
                <Col xs={12}>
                  <Input label={t('Home Address')} name="address" className="mb-0" />
                </Col>

                {values.years_address && values.years_address < 3 && (
                  <>
                    <Col xs={12} className="edd-form__col-title mt-n2 mb-2">
                      {t('If less than 3 years at current address please provide Previous Address Information:')}
                    </Col>
                    <Col xs={12}>
                      <Input label={t('Previous Home Address')} name="previous_address" className="mb-0" />
                    </Col>
                  </>
                )}
                <Col xs={12} className="form-breakline mt-2 mb-10" />
                <Col xs={12}>
                  <Radio
                    optionClassName="col-6"
                    name="employment_status"
                    options={[
                      { label: t('Employed: Financial Services Related'), value: 'fin-service' },
                      { label: t('Employed'), value: 'employed' },
                      { label: t('Employed: Other'), value: 'employed-other' },
                      { label: t('Retired'), value: 'retired' },
                      { label: t('Self Employed'), value: 'self-employed' },
                      { label: t('Unemployed'), value: 'unemployed' },
                      { label: t('Other'), value: 'other' },
                    ]}
                  />
                </Col>
                {values.employment_status && values.employment_status == 'employed-other' && (
                  <>
                    <Col xs={12} className="edd-form__col-title mb-2 mt-8">
                      {t('Type Other Industry Name')}
                    </Col>
                    <Col xs={12}>
                      <Input
                        inline={true}
                        label={t('Years at current address')}
                        name="employment_status_ext"
                        className="mb-0"
                      />
                    </Col>
                  </>
                )}
                {values.employment_status && values.employment_status == 'other' && (
                  <>
                    <Col xs={12} className="edd-form__col-title mb-2 mt-8">
                      {t('Type Other Reason')}
                    </Col>
                    <Col xs={12}>
                      <Input
                        inline={true}
                        label={t('Years at current address')}
                        name="employment_status_ext"
                        className="mb-0"
                      />
                    </Col>
                  </>
                )}
                {values.employment_status && values.employment_status == 'fin-service' && (
                  <>
                    <Col xs={12} className="edd-form__col-title mb-2 mt-8">
                      {t('Select Industry of Financial Services Related')}
                    </Col>
                    <Col xs={12}>
                      <Select
                        inline={true}
                        label={t('Country')}
                        options={empStatNgSelectValList}
                        name="employment_status_ext"
                        className="mb-0"
                      />
                    </Col>
                  </>
                )}
                <Col xs={12} className="form-breakline mt-10 mb-10" />
                <Col xs={12} lg={6}>
                  <Input label={t('Employer’s Name')} name="employer_name" />
                  <Input label={t('Nature of Business')} name="nature_of_business" />
                </Col>
                <Col xs={12} lg={6}>
                  <Input label={t('Position and Responsibilities')} name="position" />
                  <Input label={t('Years of Employment')} name="years_employment" />
                </Col>
                <Col xs={12} className="edd-form__col-title mb-2">
                  {t('Working at a Financial Institution?')}
                </Col>
                <Col xs={12} lg={6}>
                  <Radio
                    className="mb-8"
                    name="working_financial"
                    options={[
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ]}
                  />
                </Col>
                <Col xs={12} />
                <Col xs={12} lg={6}>
                  <Input label={t('Employer’s Address')} name="employer_address" />
                  <Input label={t('Employer’s Contact No:')} name="employer_contact_no" />
                </Col>
                <Col xs={12} lg={6}>
                  <Input label={t('Other Income Generating Activities')} name="other_income" />
                </Col>
                <Col xs={12} className="form-breakline mt-2 mb-10" />
                <Col xs={12} className="edd-form__col-title mb-2">
                  {t('Total Approximate Annual Income ($):')}
                </Col>
                <Col xs={12}>
                  <Radio
                    className="mb-8"
                    optionClassName="col-6"
                    name="appr_annual_income"
                    options={[
                      { label: 'Below 50,000', value: 'below-50000' },
                      { label: '50,000 to 100,000', value: '50000-to-100000' },
                      { label: '100,000 to 250,000', value: '100000-to-250000' },
                      { label: '250,000 to 500,000', value: '250000-to-500000' },
                      { label: 'Above 500,000', value: 'above-500000' },
                    ]}
                  />
                </Col>
                <Col xs={12} className="edd-form__col-title mb-2">
                  {t('Approximate Net Worth ($):')}
                </Col>
                <Col xs={12}>
                  <Radio
                    className="mb-8"
                    optionClassName="col-6"
                    name="appr_net_worth"
                    options={[
                      { label: 'Below 250,000', value: 'below-250000' },
                      { label: '250,000 to 1,000,000', value: '250000-to-1000000' },
                      { label: '1,000,000 to 5,000,000', value: '1000000-to-5000000' },
                      { label: 'Above 5,000,000', value: 'above-5000000' },
                    ]}
                  />
                </Col>
                <Col xs={12} className="edd-form__col-title mb-2">
                  {t('Anticipated Funds Available for Trading ($):')}
                </Col>
                <Col xs={12}>
                  <Radio
                    className="mb-8"
                    optionClassName="col-6"
                    name="funds_available"
                    options={[
                      { label: 'Below 25,000', value: 'below-25000' },
                      { label: '25,000 to 50,000', value: '25000-to-50000' },
                      { label: '50,000 to 150,000', value: '50000-to-150000' },
                      { label: '150,000 to 300,000', value: '150000-to-300000' },
                      { label: 'Above 300,000', value: 'above-300000' },
                    ]}
                  />
                </Col>
                {values.years_employment && values.years_employment < 3 && (
                  <>
                    <Col xs={12} className="form-breakline mt-2 mb-10" />
                    <Col xs={12} className="edd-form__col-title mb-2">
                      {t('Previous Approximate Annual Income ($):')}
                    </Col>
                    <Col xs={12} lg={6}>
                      <Input label={t('Employer’s Name')} name="pr_employer_name" />
                      <Input label={t('Nature of Business')} name="pr_nature_of_business" />
                      <Input label={t('Nature of Business')} name="pr_position" />
                    </Col>
                    <Col xs={12} lg={6}>
                      <Input label={t('Position and Responsibilities')} name="pr_years_employment" />
                      <Input label={t('Years of Employment')} name="pr_location_employment" />
                    </Col>
                    <Col xs={12} className="edd-form__col-title mb-2">
                      {t('Previous Approximate Annual Income ($):')}
                    </Col>
                    <Col xs={12}>
                      <Radio
                        className="mb-8"
                        optionClassName="col-6"
                        name="pr_appr_annual_income"
                        options={[
                          { label: 'Below 50,000', value: 'below-50000' },
                          { label: '50,000 to 100,000', value: '50000-to-100000' },
                          { label: '100,000 to 250,000', value: '100000-to-250000' },
                          { label: '250,000 to 500,000', value: '250000-to-500000' },
                          { label: 'Above 500,000', value: 'above-500000' },
                        ]}
                      />
                    </Col>
                  </>
                )}
              </Row>
              <Button type="submit" loadingOnAction={EActionTypes.editProfile}>
                {t('Save')}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});
