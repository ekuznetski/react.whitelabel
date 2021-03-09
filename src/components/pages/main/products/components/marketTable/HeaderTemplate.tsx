import { IDataStore, IStore } from '@store';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { locale } from './';
import { LabelView } from '@components/shared';
import { ELabelsName } from '@domain/enums';

export const HeaderTableTemplate = memo(function ({ preview }: { preview: boolean }) {
  const { clientSettings } = useSelector<IStore, { clientSettings: IDataStore['client']['settings'] }>((state) => ({
    clientSettings: state.data.client.settings,
  }));
  const tdClass = classNames('td', !preview && 'full');
  const fullViewParamClass = classNames(tdClass, 'fullViewParam');
  const { t } = useTranslation();

  return (
    <div className="thead">
      <div className="tr">
        <div className={tdClass}>{t('Instruments')}</div>
        <div className={`${tdClass} grouped`}>
          <LabelView>
            {{
              '*': (
                <>
                  {t('Account Types')} <br />
                  {t('Min Spread')}
                </>
              ),
              [ELabelsName.uinvex]: (
                <>
                  {t('Account Types')} / {t('Min Spread')}
                </>
              ),
            }}
          </LabelView>
          <div className="sub-row">
            {clientSettings.allowed_account_types?.map((item, i) => (
              <span key={i} className={`col${i}`}>
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className={fullViewParamClass}>{locale.viewParamSwap1}</div>
        <div className={fullViewParamClass}>{locale.viewParamSwap2}</div>
        <div className={fullViewParamClass}>{t('Lot Size')}</div>
        <div className={fullViewParamClass}>{t('Min Trade')}</div>
        <div className={fullViewParamClass}>{t('Value Per Tick')}</div>
        <div className={fullViewParamClass}>{t('Leverage Info')}</div>
        <div className={tdClass}>{t('Platform')}</div>
      </div>
    </div>
  );
});
