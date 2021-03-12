import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Svg } from '@components/shared';
import { useTranslation } from 'react-i18next';
import './BackButton.scss';

export function BackButton() {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <Button className="back-button" onClick={() => history.goBack()}>
      <Svg href="arrow_left" />
      {t('Back')}
    </Button>
  );
}
