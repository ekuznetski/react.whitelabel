import React from 'react';
import './AlreadyRegistered.scss';
import { LocaleLink } from '@components/shared';
import { useTranslation } from 'react-i18next';

export function AlreadyRegistered() {
  const { t } = useTranslation();
  return (
    <div className="mt-5 text-center under-form">
      {t('Already Registered?')}
      <LocaleLink className="already__link ml-1" to="/login">
        {t('Sign In')}
      </LocaleLink>
    </div>
  );
}
