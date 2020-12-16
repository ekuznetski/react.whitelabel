import { ELabels } from '@domain/enums';
import { useLabelView } from '@utils/hooks';
import i18n from 'i18next';

const t = i18n.getFixedT(i18n.language);

export const locale = useLabelView({
  '*': {
    viewParamSwap1: t('Swap Long'),
    viewParamSwap2: t('Swap Short'),
  },
  [ELabels.bsfx]: {
    viewParamSwap1: t('Fixed Account Swap'),
    viewParamSwap2: t('Variable Account Swap'),
  },
});
