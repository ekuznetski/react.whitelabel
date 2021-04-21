import { LabelView, LocaleLink, SectionBg } from '@components/shared';
import { ELabels, EPagePath } from '@domain/enums';
import React, { memo } from 'react';
import { Button, Col, Container, Row } from '@components/shared';
import { Trans, useTranslation } from 'react-i18next';
import './TopSection.scss';

export const TopSection = memo(function TopSection() {
  const { t } = useTranslation();

  return (
    <section className="page-top">
      <SectionBg primary="home-page-top.jpg" />
      <Container>
        <Row className="page-top__row">
          <Col className="page-top__header">
            <div className="page-top__title">
              {t('Home Page Top Title')}
              <LabelView>
                {{
                  '*': (
                    <>
                      <br />
                      {t('Home Page Top Subtitle')}
                    </>
                  ),
                  [ELabels.bsfx]: null,
                }}
              </LabelView>
            </div>
            <div className="page-top__description">
              <Trans i18nKey="Home Page Top Section Desc">
                An online trading experience by FX traders,
                <br /> for FX traders.
              </Trans>
            </div>
            <Button className="page-top__button">
              <LocaleLink to={EPagePath.Registration}>{t('Open Live Account')}</LocaleLink>
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
});
