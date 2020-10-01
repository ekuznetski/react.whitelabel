import { ITabs, PageTitle, Tabs } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BankDetails, ChangePassword, PersonalInfo } from './components';
import './Profile.scss';

export const Profile = memo(function Profile() {
  const { t } = useTranslation();

  const profileTabs: ITabs = {
    labels: [
      {
        value: 'Personal Information',
        anchor: 'personalInfo',
      },
      {
        value: 'My Bank Details',
        anchor: 'myBankDetails',
      },
      {
        value: 'Change Password',
        anchor: 'changePassword',
      },
    ],
    content: [
      { value: <PersonalInfo />, anchor: 'personalInfo' },
      { value: <BankDetails />, anchor: 'myBankDetails' },
      { value: <ChangePassword />, anchor: 'changePassword' },
    ],
  };

  return (
    <Container className="client-profile-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Profile')} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Tabs className="client-profile__tabs" {...profileTabs} />
        </Col>
      </Row>
    </Container>
  );
});
