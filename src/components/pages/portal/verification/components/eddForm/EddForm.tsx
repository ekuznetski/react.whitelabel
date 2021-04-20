import { Alert, Button, Col, CountrySelect, Input, Radio, Row, Select, TabMobileBackButton } from '@components/shared';
import { CustomFieldValidators, FieldValidators, RegexValidators } from '@domain';
import { EClientStatusCode, ENotificationType, countries } from '@domain/enums';
import { IEdd } from '@domain/interfaces';
import { MClientProfile, MClientStatus } from '@domain/models';
import { EActionTypes, IStore, ac_showNotification, ac_submitEdd } from '@store';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { config } from './';
import './EddForm.scss';

export const EddForm = memo(function EddForm() {
  const { profile, clientStatus } = useSelector<IStore, { profile: MClientProfile; clientStatus: MClientStatus }>(
    (state) => ({
      profile: state.data.client.profile,
      clientStatus: state.data.client.status,
    }),
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    nationality: CustomFieldValidators.country.required(t('Please enter your nationality')),
    own_property: Yup.string().required(),
    address: Yup.string().max(255, t('Maximum length symbols')).required(t('Please enter home address')),
    years_address: FieldValidators.years_address,
    previous_address: Yup.string()
      .when('years_address', {
        is: (val) => val < 3,
        then: Yup.string().required(t('Please enter previous home address')),
      })
      .max(250, t('Maximum length symbols')),
    employment_status: Yup.string().required(t('Please enter your employment status')),
    employment_fin_industry: Yup.string().when('employment_status', {
      is: (val) => val == 'fin-service',
      then: Yup.string().required(t('Please select industry of financial services related')),
    }),
    employment_other_industry: Yup.string()
      .when('employment_status', {
        is: (val) => val == 'employed-other',
        then: Yup.string().required(t('Please enter your industry name')),
      })
      .max(255, t('Maximum length symbols')),
    employment_other: Yup.string()
      .when('employment_status', {
        is: (val) => val == 'other',
        then: Yup.string().required(t('Please enter other reason')),
      })
      .max(255, t('Maximum length symbols')),
    employer_name: Yup.string().required(t("Please enter your employer's name")).max(80, t('Maximum length symbols')),
    nature_of_business: Yup.string()
      .required(t('Please enter nature of business'))
      .max(250, t('Maximum length symbols')),
    position: Yup.string()
      .required(t('Please enter your position and responsibilities'))
      .max(50, t('Maximum length symbols')),
    years_employment: FieldValidators.years_address.required(t('Please enter years of employment')),
    working_financial: Yup.string().required(t('Please select an answer')),
    employer_address: Yup.string()
      .required(t("Please enter your employer's address"))
      .max(255, t('Maximum length symbols')),
    phone: Yup.string()
      .required(t("Please enter your employer's contact number"))
      .max(30, t('Maximum length symbols'))
      .matches(RegexValidators.numbersOnly, t('Please include only numbers')),
    other_income: Yup.string()
      .required(t('Please enter other income generating activites'))
      .max(45, t('Maximum length symbols')),
    appr_annual_income: Yup.string().required(t('Please enter total approximate annual income')),
    appr_net_worth: Yup.string().required(t('Please enter approximate net worth')),
    funds_available: Yup.string().required(t('Please enter anticipated funds available for trading')),
    pr_employer_name: Yup.string()
      .when('years_employment', {
        is: (val) => val < 3,
        then: Yup.string().required(t("Please enter previous employer's name")),
      })
      .max(80, t('Maximum length symbols')),
    pr_nature_of_business: Yup.string()
      .when('years_employment', {
        is: (val) => val < 3,
        then: Yup.string().required(t('Please enter previous nature of business')),
      })
      .max(250, t('Maximum length symbols')),
    pr_position: Yup.string()
      .when('years_employment', {
        is: (val) => val < 3,
        then: Yup.string().required(t('Please enter previous position and responsibilities')),
      })
      .max(250, t('Maximum length symbols')),
    pr_years_employment: Yup.string()
      .when('years_employment', {
        is: (val) => val < 3,
        then: Yup.string().required(t('Please enter years of employment')),
      })
      .matches(RegexValidators.numbersAndDotOnly, t('Please include numbers and dot only'))
      .max(4, t('Maximum length symbols')),
    pr_location_employment: Yup.string()
      .when('years_employment', {
        is: (val) => val < 3,
        then: Yup.string().required(t('Please enter previous location of employment')),
      })
      .max(250, t('Maximum length symbols')),
    pr_appr_annual_income: Yup.string().when('years_employment', {
      is: (val) => val < 3,
      then: Yup.string().required(t('Please enter previous approximate annual income')),
    }),
  });

  function Submit(data: FormikValues) {
    const values = { ...data };

    // TODO: Move the data conversion to RouterAdapter

    // Convert and prepare data to submit
    values.nationality = values.nationality.name;
    switch (values.employment_status) {
      case 'fin-service':
        values.employment_status = values.employment_fin_industry;
        break;
      case 'employed-other':
        values.employment_status = values.employment_other_industry;
        break;
      case 'other':
        values.employment_status = values.employment_other;
    }

    // Delete empty fields
    Object.keys(values).forEach((key) => {
      if (!values[key]) delete values[key];
    });

    // TODO end

    dispatch(
      ac_submitEdd(
        values as IEdd,
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('The Edd Form Has Been Submitted'),
            }),
          ),
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: t('Failed To Submit Edd Form'),
            }),
          ),
      ),
    );
  }

  return (
    <div className="edd-form">
      <Row>
        <Col className="edd-form__title">{t('Complete EDD Form')}</Col>
      </Row>
      <Alert type="text" className="mb-7" showIcon={false}>
        You must complete the EDD form within 7 days or your account will be suspended. You will not be able to deposit
        or withdrawal or place any new trades and the account will be subject to liquidation only.
      </Alert>
      <Formik
        initialValues={{
          ...Object.assign(
            Object.keys(validationSchema.fields || {}).reduce((acc, key) => Object.assign(acc, { [key]: '' }), {}),
          ),
          nationality: profile.country,
          own_property: '1',
        }}
        validationSchema={validationSchema}
        initialStatus={clientStatus.edd_status.code === EClientStatusCode.submitted && 'disabled'}
        onSubmit={Submit}
      >
        {({ values, setFieldValue }: FormikProps<any>) => {
          useEffect(() => {
            setFieldValue('employment_other_industry', '');
            setFieldValue('employment_other', '');
            setFieldValue('employment_fin_industry', '');
          }, [values.employment_status]);

          return (
            <Form className="edd-form__form">
              <Row>
                <Col xs={12} xl={6}>
                  <CountrySelect label={t('Nationality')} name="nationality" />
                </Col>
                <Col xs={12} className="edd-form__col-label mb-2">
                  {t('Do you own the property?')}
                </Col>
                <Col xs={12} lg={6}>
                  <Radio className="mb-8 mb-lg-0" name="own_property" options={config.ownPropertyOptions} />
                </Col>
                <Col xs={12} lg={6}>
                  <Input label={t('Home Address')} name="address" className="mb-0" />
                </Col>
                <Col xs={12}>
                  <Input label={t('Years at current address')} name="years_address" type="number" />
                </Col>
                {values.years_address && values.years_address < 3 && (
                  <>
                    <Col xs={12} className="edd-form__col-label mt-n2 mb-2">
                      {t('If less than 3 years at current address please provide Previous Address Information:')}
                    </Col>
                    <Col xs={12}>
                      <Input label={t('Previous Home Address')} name="previous_address" className="mb-0" />
                    </Col>
                  </>
                )}
                <Col xs={12} className="form-breakline mt-2 mb-10" />
                <Col xs={12} className="edd-form__col-label mb-2">
                  {t('Employer Status')}
                </Col>
                <Col xs={12}>
                  <Radio
                    optionClassName="edd-form__radio col"
                    name="employment_status"
                    options={config.employmentStatusOptions}
                  />
                </Col>
                {values.employment_status && values.employment_status == 'employed-other' && (
                  <>
                    <Col xs={12} className="edd-form__col-label mb-2 mt-8">
                      {t('Type Other Industry Name')}
                    </Col>
                    <Col xs={12}>
                      <Input
                        inline={true}
                        label={t('Industry Name')}
                        name="employment_other_industry"
                        className="mb-0"
                      />
                    </Col>
                  </>
                )}
                {values.employment_status && values.employment_status == 'other' && (
                  <>
                    <Col xs={12} className="edd-form__col-label mb-2 mt-8">
                      {t('Type Other Reason')}
                    </Col>
                    <Col xs={12}>
                      <Input inline={true} label={t('Other Reason')} name="employment_other" className="mb-0" />
                    </Col>
                  </>
                )}
                {values.employment_status && values.employment_status == 'fin-service' && (
                  <>
                    <Col xs={12} className="edd-form__col-label mb-2 mt-8">
                      {t('Select Industry of Financial Services Related')}
                    </Col>
                    <Col xs={12}>
                      <Select
                        inline={true}
                        label={t('Industry')}
                        options={config.empStatNgSelectValList}
                        name="employment_fin_industry"
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
                  <Input label={t('Years of Employment')} name="years_employment" type="number" />
                </Col>
                <Col xs={12} className="edd-form__col-label mb-2">
                  {t('Working at a Financial Institution?')}
                </Col>
                <Col xs={12} lg={6}>
                  <Radio className="mb-8" name="working_financial" options={config.workingFinancialOptions} />
                </Col>
                <Col xs={12} />
                <Col xs={12} lg={6}>
                  <Input label={t('Employer’s Address')} name="employer_address" />
                  <Input type="tel" label={t('Employer’s Contact No:')} name="phone" />
                </Col>
                <Col xs={12} lg={6}>
                  <Input label={t('Other Income Generating Activities')} name="other_income" />
                </Col>
                <Col xs={12} className="form-breakline mt-2 mb-10" />
                <Col xs={12} className="edd-form__col-label mb-2">
                  {t('Total Approximate Annual Income ($):')}
                </Col>
                <Col xs={12}>
                  <Radio
                    className="mb-8"
                    optionClassName="edd-form__radio col"
                    name="appr_annual_income"
                    options={config.apprAnnualIncomeOptions}
                  />
                </Col>
                <Col xs={12} className="edd-form__col-label mb-2">
                  {t('Approximate Net Worth ($):')}
                </Col>
                <Col xs={12}>
                  <Radio
                    className="mb-8"
                    optionClassName="edd-form__radio col"
                    name="appr_net_worth"
                    options={config.apprNetWorthOptions}
                  />
                </Col>
                <Col xs={12} className="edd-form__col-label mb-2">
                  {t('Anticipated Funds Available for Trading ($):')}
                </Col>
                <Col xs={12}>
                  <Radio
                    className="mb-8"
                    optionClassName="edd-form__radio col"
                    name="funds_available"
                    options={config.fundsAvailableOptions}
                  />
                </Col>
                {values.years_employment && values.years_employment < 3 && (
                  <>
                    <Col xs={12} className="form-breakline mt-2 mb-10" />
                    <Col xs={12} className="edd-form__col-label mb-2">
                      {t('Current Employed for less than 3 years')}
                    </Col>
                    <Col xs={12} lg={6}>
                      <Input label={t('Previous Employer’s Name')} name="pr_employer_name" />
                      <Input label={t('Previous Nature of Business')} name="pr_nature_of_business" />
                      <Input label={t('Previous Position and Responsibilities')} name="pr_position" />
                    </Col>
                    <Col xs={12} lg={6}>
                      <Input label={t('Previous Years of Employment')} name="pr_years_employment" type="number" />
                      <Input label={t('Previous Location of Employment')} name="pr_location_employment" />
                    </Col>
                    <Col xs={12} className="edd-form__col-label mb-2">
                      {t('Previous Approximate Annual Income ($):')}
                    </Col>
                    <Col xs={12}>
                      <Radio
                        className="mb-8"
                        optionClassName="edd-form__radio col"
                        name="pr_appr_annual_income"
                        options={config.prApprAnnualIncomeOptions}
                      />
                    </Col>
                  </>
                )}
                <Col xs={12} md={6} lg={12} className="edd-form__button">
                  <Button type="submit" loadingOnAction={EActionTypes.submitEdd}>
                    {t('Submit')}
                  </Button>
                </Col>
                <Col xs={12} md={6} className="d-lg-none edd-form__button">
                  <TabMobileBackButton>
                    <Button type="button" secondary>
                      {t('Back')}
                    </Button>
                  </TabMobileBackButton>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});
