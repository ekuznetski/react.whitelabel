import React, { memo } from 'react';
import { Button, LocaleLink, SectionBg, Svg } from '@components/shared';
import { useTranslation } from 'react-i18next';
import './LegalDocumentsTopSection.scss';
import { EPagePath } from '@domain/enums';
import { useSelector } from 'react-redux';
import { IStore } from '@store';

export const LegalDocumentsTopSection = memo(function LegalDocumentsTopSection() {
  const { prevPath } = useSelector<IStore, { prevPath?: EPagePath }>((state) => ({
    prevPath: state.app.route.prev?.path,
  }));
  const { t } = useTranslation();

  return (
    <section className="legal-documents-wrapper__page-top">
      <SectionBg
        primary="header_bg.jpg"
        secondary={{
          xxs: 'legal-documents-top-mobile.png',
          md: 'legal-documents-top-tablet.png',
          lg: 'legal-documents-top-desktop.png',
        }}
      />
      <div className="container full-height">
        <div className="row full-height">
          <div className="col page-top__header">
            <div className="page-top__title">{t('Legal Forms & Documents')}</div>
            <Button>
              <LocaleLink to={prevPath || ''}>
                <Svg href="arrow_left" />
                {t('Back')}
              </LocaleLink>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
});
