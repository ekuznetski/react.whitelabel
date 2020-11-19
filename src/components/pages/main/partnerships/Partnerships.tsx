import { OpenLiveAccountBannerSection, PartnershipPrograms } from '@components/sections';
import {
  Button,
  Card,
  CardContent,
  Cards,
  Img,
  ISingleCard,
  ITable,
  ITabs,
  LabelView,
  LocaleLink,
  PageTitle,
  SectionBg,
  Svg,
  Table,
  Tabs,
} from '@components/shared';
import { ELabels } from '@domain/enums';
import { useResponsive } from 'ahooks';
import { Login } from 'components/pages/auth/login/Login';
import React, { useRef, useState } from 'react';
import { AffiliateForm, BrokersForm } from './components';
import { Trans, useTranslation } from 'react-i18next';
import './Partnerships.scss';

export function Partnerships() {
  const responsive = useResponsive();
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null);
  const [activeTab, setTab] = useState('affiliate');

  const _tempTabsData: ITabs = {
    labels: [
      { value: t('Affiliate'), anchor: 'affiliate' },
      { value: t('IB'), anchor: 'ib' },
      { value: t('White Label'), anchor: 'whiteLabel' },
    ],
    content: [
      {
        value: <AffiliateForm />,
        anchor: 'affiliate',
      },
      {
        value: <BrokersForm />,
        anchor: 'ib',
      },
      {
        value: <AffiliateForm />,
        anchor: 'whiteLabel',
      },
    ],
  };

  function navigateToForm(program?: string) {
    formRef.current && formRef.current.scrollIntoView({ behavior: 'smooth' });
    program && setTab(program);
  }

  return (
    <div className="partnership-wrapper">
      <section className="page-top">
        <SectionBg img="partnership-page-top.jpg" />
        <div className="container">
          <div className="row">
            <div className="col-md-7 col-12 page-top__header">
              <div className="page-top__title mb-7">{t('Partnerships')}</div>
              <div className="page-top__description mb-9">{t('Partnerships Page Desc')}</div>
              <Button onClick={() => navigateToForm(activeTab)}>{t('Become an BSFX Partner')}</Button>
            </div>
          </div>
        </div>
      </section>
      <PartnershipPrograms onNavigate={navigateToForm} />
      <section className="potential">
        <SectionBg img="potential-bg.jpg" />
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-12">
              <div className="potential__title mb-xl-9 mb-md-3 mb-7">{t('Potential Title')}</div>
              <div className="potential__description">
                <Trans i18nKey="Potential Desc">
                  <div className="mb-md-5 mb-3">
                    All our programs are geared up to help you grow your business and maximise your earning potential.
                  </div>
                  <div>
                    Join our partnership program today. Let us design your bespoke partnership program so that you can
                    start earning right away.
                  </div>
                </Trans>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="programForms" ref={formRef}>
        <div className="container">
          <div className="row">
            <div className="col-12 px-0 px-md-5">
              <div className="programForms__title">
                <Trans i18nKey="Programs Form Title">
                  CHOOSE YOUR <strong>PROGRAM</strong>
                </Trans>
              </div>
              <Tabs activeTab={activeTab} className="programForms__tabs" {..._tempTabsData} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Partnerships;
