import { Button, Input } from '@components/shared';
import { FieldValidators } from '@domain';
import { ENotificationType } from '@domain/enums';
import { MBankDetails } from '@domain/models';
import { EActionTypes, IStore, ac_showNotification, ac_updateBankDetails } from '@store';
import { Form, Formik, FormikValues } from 'formik';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

export const BankDetails = memo(function BankDetails() {
  const { bankDetails } = useSelector<IStore, { bankDetails: MBankDetails }>((state) => ({
    bankDetails: state.data.bankDetails,
  }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    beneficiary_name: FieldValidators.requiredString.max(100, t('Name characters count restriction')),
    beneficiary_bank: FieldValidators.requiredString.max(100, t('Bank Name characters count restriction')),
    beneficiary_bank_account_no: FieldValidators.requiredString.max(100, t('Bank Account Number count restriction')),
    swift_code: FieldValidators.swift,
    iban: Yup.string().max(50, t('IBAN characters count restriction')),
    branch_name: FieldValidators.requiredString.max(100, t('Bank Branch Name characters count restriction')),
    branch_address: FieldValidators.requiredString.max(100, t('Bank Branch Address characters count restriction')),
  });

  function Submit(data: FormikValues) {
    dispatch(
      ac_updateBankDetails(
        data as MBankDetails,
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.success,
              message: t('Bank Details Updated Successfully'),
            }),
          ),
        () =>
          dispatch(
            ac_showNotification({
              type: ENotificationType.danger,
              message: t('Failed To Update Bank Details'),
            }),
          ),
      ),
    );
  }

  return (
    <div className="dank-details">
      <Container className="internal-transfer-page-wrapper">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={7} className="form-wrapper py-10 px-9">
            <Formik
              initialValues={{
                beneficiary_name: bankDetails.beneficiary_name,
                beneficiary_bank: bankDetails.beneficiary_bank,
                beneficiary_bank_account_no: bankDetails.beneficiary_bank_account_no,
                swift_code: bankDetails.swift_code,
                iban: bankDetails.iban,
                branch_name: bankDetails.branch_name,
                branch_address: bankDetails.branch_address,
              }}
              validationSchema={validationSchema}
              onSubmit={Submit}
            >
              {() => {
                return (
                  <Form className="internal-transfer__form">
                    <Row>
                      <Col xs={12} md={6}>
                        <Input label={t("Beneficiary's Name")} name="beneficiary_name" />
                      </Col>
                      <Col xs={12} md={6}>
                        <Input label={t("Beneficiary's Bank Name")} name="beneficiary_bank" />
                      </Col>
                      <Col xs={12} md={6}>
                        <Input label={t("Beneficiary's Bank Account Number")} name="beneficiary_bank_account_no" />
                      </Col>
                      <Col xs={12} md={6}>
                        <Input label={t('SWIFT Code')} name="swift_code" />
                      </Col>
                      <Col xs={12} md={6}>
                        <Input label={t('IBAN IF Applicable')} name="iban" />
                      </Col>
                      <Col xs={12} md={6}>
                        <Input label={t("Beneficiary's Bank Branch Name")} name="branch_name" />
                      </Col>
                      <Col xs={12} md={6}>
                        <Input label={t("Beneficiary's Branch Full Address")} name="branch_address" />
                      </Col>
                    </Row>
                    <Button type="submit" loadingOnAction={EActionTypes.updateBankDetails}>
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
});
