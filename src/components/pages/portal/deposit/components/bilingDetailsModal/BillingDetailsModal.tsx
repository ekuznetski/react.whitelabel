import {
  Button,
  CountrySelect,
  Input,
  Modal,
  ModalContext,
  ModalNav,
  ModalTitle,
  Radio,
  Select,
  Svg,
  TradingAccountsSelect,
} from '@components/shared';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Formik, FormikValues } from 'formik';
import { Col, Row } from 'react-bootstrap';
import classNames from 'classnames';
import { MClientProfile, MTradingAccount } from '@domain/models';
import {
  depositActionCreators,
  DepositContext,
  IDepositState,
  useDepositDispatch,
  useDepositState,
} from '../../deposit.context';
import { Country, ECurrencyCode, ELanguage, ETradingPlatform } from '@domain/enums';
import * as Yup from 'yup';
import { CustomFieldValidators, FieldValidators } from '@domain';
import { useSelector } from 'react-redux';
import { IStore } from '@store';

interface IBillingDetailsModalProps {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

enum EFields {
  'country' = 'country',
  'state_code' = 'state_code',
  'city' = 'city',
  'address' = 'address',
  'postcode' = 'postcode',
}

function BillingForm({ setModalOpen }: any) {
  const { t } = useTranslation();
  const depositContextDispatch = useDepositDispatch();
  const { billingDetails } = useDepositState();
  const { profile } = useSelector<IStore, { profile: MClientProfile }>((state) => ({
    profile: state.data.client.profile,
  }));

  const validationSchema = Yup.object().shape({
    [EFields.country]: CustomFieldValidators.country,
    [EFields.state_code]: Yup.string().when(EFields.country, {
      is: (val: Country) => val.states?.length,
      then: FieldValidators.requiredString,
      otherwise: Yup.string().notRequired(),
    }),
    [EFields.city]: FieldValidators.requiredString,
    [EFields.address]: FieldValidators.requiredString,
    [EFields.postcode]: FieldValidators.requiredString,
  });
  return (
    <Formik
      initialValues={{
        [EFields.country]: billingDetails?.country ?? profile.country,
        [EFields.state_code]: billingDetails?.state_code ?? profile.state.code ?? '',
        [EFields.city]: billingDetails?.city ?? profile.city,
        [EFields.address]: billingDetails?.address ?? profile.street,
        [EFields.postcode]: billingDetails?.postcode ?? profile.postcode,
      }}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        if (!data[EFields.country]?.states) {
          delete data[EFields.state_code];
        }
        depositContextDispatch(depositActionCreators.setBillingDetails(data));
        setModalOpen(false);
      }}
    >
      {({ values, setFieldValue }: FormikValues) => {
        const states = values[EFields.country]?.states?.map((state: any) => ({
          value: state.code,
          label: state.name,
        }));
        console.log(values.country);
        return (
          <Form className="m-auto form">
            <Row>
              <Col xs={states ? 7 : 12}>
                <CountrySelect label={t('Billing Country')} name={EFields.country} />
              </Col>
              {states && (
                <Col xs={5} className="pl-0">
                  <Select label={t('Country State')} options={states} name={EFields.state_code} />
                </Col>
              )}
              <Col xs={12}>
                <Input label={t('Billing City')} name={EFields.city} />
              </Col>
              <Col xs={12}>
                <Input label={t('Address')} name={EFields.address} />
              </Col>
              <Col xs={12}>
                <Input label={t('Billing Zip/Post Code')} name={EFields.postcode} />
              </Col>
              <Col xs={12}>
                <Button type="submit">{t('Save')}</Button>
              </Col>
            </Row>
          </Form>
        );
      }}
    </Formik>
  );
}

export function BillingDetailsModal({ isModalOpen, setModalOpen }: IBillingDetailsModalProps) {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isModalOpen} isOpenDispatcher={setModalOpen}>
      <ModalTitle
        className="ml-0 mr-auto align-items-start mb-10"
        title={
          <div className="d-flex align-items-center justify-content-center">
            <Svg href="shrimp" width={20} height={20} className="mr-4" />
            {t('Billing Details')}
          </div>
        }
      />
      <ModalContext>
        <BillingForm setModalOpen={setModalOpen} />
      </ModalContext>
    </Modal>
  );
}
