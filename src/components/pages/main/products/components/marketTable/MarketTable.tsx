import { LocaleNavLink, Svg } from '@components/shared';
import { ETradingAccountType, ETradingPlatform, MarketType } from '@domain/enums';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { HeaderTableTemplate } from './HeaderTemplate';
import { allowedAccountTypes, files, marketTableContent } from '@domain';
import './MarketTable.scss';
import { IMarketTableContent } from '@domain/interfaces';

interface IMarketTable {
  type: MarketType;
  preview: boolean;
  className?: string;
}

export const MarketTable = memo((props: IMarketTable) => {
  // const { clientSettings } = useSelector<IStore, { clientSettings: IDataStore['client']['settings'] }>((state) => ({
  //   clientSettings: state.data.client.settings,
  // }));
  const tdClass = classNames('td', !props.preview && 'full');
  const fullViewParamClass = classNames(tdClass, 'fullViewParam');

  return (
    <div className={classNames('market-table', props.className)}>
      <HeaderTableTemplate preview={props.preview} />
      <div className="tbody">
        {marketTableContent[props.type].slice(0, props.preview ? 4 : 1000).map((item, i) => (
          <div key={i} className="tr">
            <div className={tdClass}>{item.instr}</div>
            <div className="td grouped">
              {allowedAccountTypes.map((key) => (
                <div key={key} className={tdClass}>
                  {key === ETradingAccountType.raw
                    ? item.raw.toString() === 'N/A'
                      ? item.raw
                      : item.raw + ' per round'
                    : item[key]}
                </div>
              ))}
            </div>
            <div className={fullViewParamClass}>
              <a target="_blank" href={files.financeFeesFixed}>
                <Svg href="info" isIcon />
              </a>
            </div>
            <div className={fullViewParamClass}>
              <a target="_blank" href={files.financeFeesVariable}>
                <Svg href="info" isIcon />
              </a>
            </div>
            <div className={fullViewParamClass}>{item.lotSize}</div>
            <div className={fullViewParamClass}>{item.minTrade}</div>
            <div className={fullViewParamClass}>{item.valuePerTick}</div>
            <div className={fullViewParamClass}>
              <LocaleNavLink exact to={'/leverage'}>
                <Svg href="info" isIcon />
              </LocaleNavLink>
            </div>
            <div className={tdClass}>
              {item.platform.map((platform: ETradingPlatform) => (
                <div key={platform} className="platform">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
