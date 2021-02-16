import { EPagePath } from '@domain/enums';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../localeLink/LocaleLink';
import './AuthAlreadyRegisteredLink.scss';

export function AuthAlreadyRegisteredLink({ className }: any) {
  const { t } = useTranslation();

  return (
    <div className={classNames('mt-5 text-center auth-under-form', className)}>
      {t('Already Registered')}
      <LocaleLink className="already__link ml-1" to={EPagePath.Login}>
        {t('Sign In')}
      </LocaleLink>
    </div>
  );
}
