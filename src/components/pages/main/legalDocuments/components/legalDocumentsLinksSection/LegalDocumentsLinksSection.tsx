import { Button, Cards, LocaleLink, Svg } from '@components/shared';
import { EPagePath } from '@domain/enums';
import { config } from '@pages/main/legalDocuments';
import { IStore } from '@store';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import './LegalDocumentsLinksSection.scss';

export const LegalDocumentsLinksSection = memo(function LegalDocumentsLinksSection() {
  const { prevPath } = useSelector<IStore, { prevPath?: EPagePath }>((state) => ({
    prevPath: state.app.route.prev?.path,
  }));

  const { t } = useTranslation();

  return (
    <section className="legal-documents-wrapper__links">
      <div className="container">
        <div className="row">
          <div className="links__cards-container">
            <Cards id="linksCards" className="links__cards" cards={config.linksCards} cardWrapperClass="card col" />
          </div>
        </div>
        <Button>
          <LocaleLink to={prevPath || ''}>
            <Svg href="arrow_left" />
            {t('Back')}
          </LocaleLink>
        </Button>
      </div>
    </section>
  );
});
