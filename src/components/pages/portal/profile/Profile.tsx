import { PageTitle, Tab, Tabs } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from '@components/shared';
import { useTranslation } from 'react-i18next';
import { BankDetails, ChangePassword, PersonalInfo } from './components';
import './Profile.scss';

export const Profile = memo(function Profile() {
  const { t } = useTranslation();

  return (
    <Container className="client-profile-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title={t('Profile')} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Tabs className="client-profile__tabs">
            <Tab label={t('Personal Information')} anchor="personalInfo">
              <PersonalInfo />
            </Tab>
            <Tab label={t('My Bank Details')} anchor="myBankDetails">
              <BankDetails />
            </Tab>
            <Tab label={t('Change Password')} anchor="changePassword">
              <ChangePassword />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
});
