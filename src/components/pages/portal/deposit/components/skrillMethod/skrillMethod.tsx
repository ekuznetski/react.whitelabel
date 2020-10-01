import { Button } from '@components/shared';
import { FieldValidators } from '@domain';
import React, { useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { BillingDetailsModal, DetailsHeader } from '..';
import { DepositContext } from '../../depositContext';

export function SkrillMethod() {
  const { dispatch } = useContext<any>(DepositContext);
  const { t } = useTranslation();
  const [isBillingDetailsModalOpen, setIsBillingDetailsModalOpen] = React.useState<boolean>(false);

  //TODO setup validataion
  const validationSchema = Yup.object().shape({
    account: FieldValidators.requiredString,
    secureId: FieldValidators.requiredString,
  });

  function onClickHandler(e: React.MouseEvent) {
    e.preventDefault();
    setIsBillingDetailsModalOpen(true);
  }

  function submit() {
    // todo add  dispatch
  }

  return (
    <>
      <div className="form-wrapper py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <DetailsHeader />
        <Row>
          <Col xs={12}>
            <Button onClick={submit}>{t('Deposit')}</Button>
          </Col>
        </Row>
      </div>
      <div className="py-10 px-9 col-xl-6 col-lg-7 col-md-9 col-12 m-auto">
        <Row className="note">
          <Col xs={12} sm={6}>
            {t('Edit your')}{' '}
            <a href="#" onClick={onClickHandler}>
              {t('billing address')}
            </a>
          </Col>
        </Row>
      </div>
      <BillingDetailsModal isModalOpen={isBillingDetailsModalOpen} setModalOpen={setIsBillingDetailsModalOpen} />
    </>
  );
}
