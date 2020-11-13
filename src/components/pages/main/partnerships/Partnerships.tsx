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
import React, {useRef} from 'react';
import {AffiliateForm} from './components/programForm/AffiliateForm'
import { Trans, useTranslation } from 'react-i18next';
import './Partnerships.scss';

export function Partnerships() {
  const responsive = useResponsive();
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null)

  const _tempTabsData: ITabs = {
    labels: [
      { value: t('Affiliate'), anchor: 'affiliate' },
      { value: t('IB'), anchor: 'ib' },
    ],
    content: [
      {
        value: <AffiliateForm/>,
        anchor: 'affiliate',
      },
      {
        value: <AffiliateForm/>,
        anchor: 'ib',
      },
    ],
  };

  const navigateToForm = () => {
    formRef.current && formRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="partnership-wrapper">
      <section className="page-top">
        <SectionBg img="partnership-page-top.jpg" />
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-7 page-top__header">
              <div className="page-top__title mb-7">{t('Partnerships')}</div>
              <div className="page-top__description mb-9">{t('Partnerships Page Desc')}</div>
              <Button onClick={navigateToForm}>
                  {t('Become an BSFX Partner')}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <PartnershipPrograms />
      <section className="potential">
        <SectionBg img="potential-bg.jpg" />
        <div className="container">
          <div className="row">
            <div className="col-xl-8 col-12">
              <div className="potential__title mb-4">{t('Potential Title')}</div>
              <div className="potential__description mb-14">
                <Trans i18nKey="Potential Desc">
                <div>All our programs are geared up to help you grow your business and maximise your earning potential.</div>
                <div>Join our partnership program today. Let us design your bespoke partnership 
                  program so that you can start earning right away.</div>
                </Trans>
                {t('Automate your trading strategies')}
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
            <Tabs className="programForms__tabs" {..._tempTabsData} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Partnerships;
