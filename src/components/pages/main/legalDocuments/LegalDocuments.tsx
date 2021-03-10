import React from 'react';
import { LegalDocumentsLinksSection, LegalDocumentsTopSection } from './components';

export function LegalDocuments() {
  return (
    <div className="legal-documents-wrapper">
      <LegalDocumentsTopSection />
      <LegalDocumentsLinksSection />
      <hr />
    </div>
  );
}
