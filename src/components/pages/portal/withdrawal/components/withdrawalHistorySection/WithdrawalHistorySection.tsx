import { MWithdrawalHistoryItem } from '@domain/models';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { WithdrawalHistoryItem } from '..';
import './WithdrawalHistorySection.scss';

export const WithdrawalHistorySection = memo(function WithdrawalHistorySection(props: {
  items: MWithdrawalHistoryItem[];
}) {
  const { t } = useTranslation();

  return (
    <section className="withdrawal-page__history">
      <Row>
        <Col className="d-flex justify-content-center">
          <Col xs={12} md={9} lg={7} xl={6} className="mt-11 p-0">
            <div className="withdrawal-history__title mb-10">{t('Recent Withdrawals')}</div>
            <div className="withdrawal-history__content">
              {props.items.map((item, idx) => (
                <WithdrawalHistoryItem key={idx} {...item} />
              ))}
            </div>
          </Col>
        </Col>
      </Row>
    </section>
  );
});
