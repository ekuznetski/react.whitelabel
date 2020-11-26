import { EDocumentsStatus } from '@domain/enums';
import i18next from 'i18next';

const t = i18next.getFixedT(i18next.language);

export const $t = {
  selectDocumentTypeNote: () => t('Choose Document From List'),
  documentStatus: (status: EDocumentsStatus) => t('Document Status', { status }),
};
