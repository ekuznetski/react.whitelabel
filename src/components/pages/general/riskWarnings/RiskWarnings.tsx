import { BackButton, Col, Container, Row } from '@components/shared';
import { SimplePageTopSection } from '@components/sections';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import './RiskWarnings.scss';

export function RiskWarnings() {
  const { t } = useTranslation();

  return (
    <div className="risk-warnings-wrapper">
      <SimplePageTopSection title={t('Risk Warnings')} />
      <section>
        <Container>
          <Row>
            <Col>
              <Trans i18nKey="Risk Warnings Text">
                <b>
                  Contracts for Difference (‘CFDs’) are complex financial products that are traded on margin. Margined
                  trades on CFDs carry a high degree of risk and may expose the investor to substantial losses as well
                  as gains. The investor should carefully consider whether this activity is appropriate for his needs,
                  financial resources, and personal circumstances.
                </b>
                <br />
                <br />
                Please ensure you read through our terms and conditions of use carefully before investing in UINVEX’s
                leveraged products. You should be aware that among the features of the service a broad range of
                financial information is displayed on the site and may quickly become unreliable or change for various
                reasons such as the volatility of financial markets. We are under no obligation to quote a particular
                price quoted on any specific market. You should also be aware of the risks associated with using an
                internet or mobile-based system for trading leveraged products, including but not limited to the failure
                of Hardware, Software and internet connection. The website and the services are intended for and should
                only be used by individuals or entities that have sufficient experience and knowledge in financial
                matters to be capable of evaluating the financial data and market information displayed on the site, and
                the merits and risks of entering into financial contracts.
                <br />
                <br />
                <b>
                  By using the service, you acknowledge that you are aware of all the risks associated with the service
                  and have the financial capability to finance your participation and that your use of this site, the
                  service and content, is at your own discretion and risk and that you will be solely responsible for
                  any resulting consequences.
                </b>
                <br />
                <br />
                By submitting the registration form, requesting a quick callback or registering for the newsletter you
                are consenting to receive information by email, telephone, post or any other method from UINVEX about
                offers that you may be entitled to and products and services, which we believe may be of interest to
                you. We will not share your details with any third parties, other than our affiliated companies, for
                marketing purposes without your prior consent. If at any time, you no longer wish to receive this
                information, please let us know by using the unsubscribe facility provided within any email we may send
                you, or alternatively you may email us and we will remove your details from our database. By clicking
                "Register", "Send" or "Submit", you consent to us using your details in this way.
                <br />
                <br />
                UINVEX and its affiliates do not intend the information provided on this site to be distributed to, or
                used by, any person or entity in any jurisdiction or country which such distribution or use would be
                contrary to law or regulation or which would subject UINVEX or its affiliates to any registration
                requirement within such jurisdiction or country. Neither the information, nor any opinion contained in
                this site constitutes a solicitation or offer by UINVEX or its affiliates to buy or sell any forex,
                energy, metals, commodities, indices, stocks, futures, CFDs or other financial instruments or provide
                any investment advice or service.
              </Trans>
            </Col>
          </Row>
          <Row className="back-button-wrapper">
            <Col>
              <BackButton />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}
