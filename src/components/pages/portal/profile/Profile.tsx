import { ITabs, PageTitle, Tab, Tabs } from '@components/shared';
import React, { memo } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BankDetails, ChangePassword, PersonalInfo } from './components';
import './Profile.scss';

export const Profile = memo(function Profile() {
  return (
    <Container className="client-profile-page-wrapper">
      <Row>
        <Col xs={12}>
          <PageTitle title="Profile" />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12}>
          <Tabs className="client-profile__tabs">
            <Tab label="Personal Information" anchor="personalInfo">
              <PersonalInfo />
            </Tab>
            <Tab label="My Bank Details" anchor="myBankDetails">
              <BankDetails />
            </Tab>
            <Tab label="Change Password" anchor="changePassword">
              <ChangePassword />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
});
