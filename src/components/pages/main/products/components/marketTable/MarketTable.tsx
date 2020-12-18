import { LocaleNavLink, Svg } from '@components/shared';
import { ETradingPlatform, MarketType } from '@domain/enums';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { HeaderTableTemplate } from './HeaderTemplate';
import { files, marketTableContent } from '@domain';
import './MarketTable.scss';

interface IMarketTable {
  type: MarketType;
  preview: boolean;
  className?: string;
}

export const MarketTable = memo((props: IMarketTable) => {
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
              {item.fixed && <div className={tdClass}>{item.fixed}</div>}
              {item.classic && <div className={tdClass}>{item.classic}</div>}
              {item.raw && (
                <div className={tdClass}>{item.raw.toString() === 'N/A' ? item.raw : item.raw + ' per round'}</div>
              )}
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
              {item.platform.map((el: ETradingPlatform) => (
                <div key={el} className="platform">
                  {el}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
