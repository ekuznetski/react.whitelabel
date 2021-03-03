import { Alert, Button, CountrySelect, Input, Radio, Select, TabMobileBackButton } from '@components/shared';
import { FieldValidators } from '@domain';
import { EClientStatusCode, ENotificationType } from '@domain/enums';
import { IEdd } from '@domain/interfaces';
import { MClientProfile, MClientStatus } from '@domain/models';
import { EActionTypes, IStore, ac_showNotification, ac_submitEdd } from '@store';
import { useResponsive } from 'ahooks';
import { Form, Formik, FormikProps, FormikValues } from 'formik';
import React, { memo, useEffect } from 'react';
import { Col, Row } from '@components/shared';
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
  const viewportSize = useResponsive();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const previousEmployerValidation = Yup.string().when('years_employment', {
    is: (val) => val < 3,
    then: Yup.string().required(),
  });
  const validationSchema = Yup.object().shape({
    nationality: Yup.mixed().required(),
    own_property: Yup.string().required(),
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
    working_financial: Yup.string().required(),
    employer_address: Yup.string().required(),
    phone: Yup.number().required(),
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
    const values = { ...data };

    // TODO: Move the data conversion to RouterAdapter

    // Convert and prepare data to submit
    values.nationality = values.nationality.name;
    if (values.employment_status_ext) {
      values.employment_status = values.employment_status_ext;
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
      <Alert type="text" className="mb-7" showIcon={false}>
        You must complete the EDD form within 7 days or your account will be suspended. You will not be able to deposit
        or withdrawal or place any new trades and the account will be subject to liquidation only.
      </Alert>
      <Formik
        initialValues={Object.assign(
          Object.keys(validationSchema.fields || {}).reduce((acc, key) => Object.assign(acc, { [key]: '' }), {}),
        )}
        validationSchema={validationSchema}
        initialStatus={clientStatus.edd_status.code === EClientStatusCode.submitted && 'disabled'}
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
                  <Radio className="mb-8 mb-lg-0" name="own_property" options={config.ownPropertyOptions} />
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
                  <Radio optionClassName="col-6" name="employment_status" options={config.employmentStatusOptions} />
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
                        options={config.empStatNgSelectValList}
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
                <Col xs={12} className="edd-form__col-title mb-2">
                  {t('Total Approximate Annual Income ($):')}
                </Col>
                <Col xs={12}>
                  <Radio
                    className="mb-8"
                    optionClassName="col-6"
                    name="appr_annual_income"
                    options={config.apprAnnualIncomeOptions}
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
                    options={config.apprNetWorthOptions}
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
                    options={config.fundsAvailableOptions}
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
                        options={config.prApprAnnualIncomeOptions}
                      />
                    </Col>
                  </>
                )}
                <Col xs={12} md={viewportSize.lg ? 12 : 6}>
                  <Button type="submit" checkFormValidity loadingOnAction={EActionTypes.submitEdd}>
                    {t('Save')}
                  </Button>
                </Col>
                <Col xs={12} md={6} className="d-lg-none">
                  <TabMobileBackButton>
                    <Button type="button" isLoading={true} secondary>
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
