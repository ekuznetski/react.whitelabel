import { IDataStore, IStore } from '@store';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export const HeaderTableTemplate = memo(function ({ preview }: { preview: boolean }) {
  const { clientSettings } = useSelector<IStore, { clientSettings: IDataStore['client']['settings'] }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const tableSubHeaders = clientSettings.allowed_account_types;
  const tdClass = classNames('td', !preview && 'full');
  const fullViewParamClass = classNames(tdClass, 'fullViewParam');
  const { t } = useTranslation();

  return (
    <div className="thead">
      <div className="tr">
        <div className={tdClass}>{t('Instruments')}</div>
        <div className={`${tdClass} grouped`}>
          {t('Account Types')} <br />
          {t('Min Spread')}
          <div className="sub-row">
            {tableSubHeaders &&
              tableSubHeaders.map((item, i) => (
                <span key={item} className={`col${i}`}>
                  {item}
                </span>
              ))}
          </div>
        </div>
        <div className={fullViewParamClass}>{t('Swap Long')}</div>
        <div className={fullViewParamClass}>{t('Swap Short')}</div>
        <div className={fullViewParamClass}>{t('Lot Size')}</div>
        <div className={fullViewParamClass}>{t('Min Trade')}</div>
        <div className={fullViewParamClass}>{t('Value Per Tick')}</div>
        <div className={fullViewParamClass}>{t('Leverage Info')}</div>
        <div className={tdClass}>{t('Platform')}</div>
      </div>
    </div>
  );
});
