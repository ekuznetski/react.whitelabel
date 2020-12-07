import { Svg } from '@components/shared';
import { MarketType } from '@domain/enums';
import classNames from 'classnames';
import React, { memo, useMemo } from 'react';
import { HeaderTableTemplate } from './HeaderTemplate';
import './MarketTable.scss';
import { marketTableContent } from '@domain';
interface IMarketTable {
  type: MarketType;
  preview: boolean;
  className?: string;
}

export const MarketTable = memo((props: IMarketTable) => {
  const tdClass = classNames('td', !props.preview && 'full');
  const fullViewParamClass = classNames(tdClass, 'fullViewParam');
  const platforms = useMemo(
    () => [
      <div className="platform">MT4</div>,
      <div className="platform">MT5</div>,
      <>
        <div className="platform">MT4</div>
        <div className="platform">MT5</div>
      </>,
    ],
    [],
  );

  return (
    <div className={classNames('market-table', props.className)}>
      <HeaderTableTemplate preview={props.preview} />
      <div className="tbody">
        {marketTableContent[props.type].slice(0, props.preview ? 4 : 1000).map((item, i) => (
          <div key={i} className="tr">
            <div className={tdClass}>{item.instr}</div>
            <div className="td grouped">
              <div className={tdClass}>{item.fixed}</div>
              <div className={tdClass}>{item.classic}</div>
              <div className={tdClass}>{item.raw.toString() === 'N/A' ? item.raw : item.raw + ' per round'}</div>
            </div>
            <div className={fullViewParamClass}>
              <Svg href="info" isIcon />
            </div>
            <div className={fullViewParamClass}>
              <Svg href="info" isIcon />
            </div>
            <div className={fullViewParamClass}>{item.lotSize}</div>
            <div className={fullViewParamClass}>{item.minTrade}</div>
            <div className={fullViewParamClass}>{item.valuePerTick}</div>
            <div className={fullViewParamClass}>
              <Svg href="info" isIcon />
            </div>
            <div className={tdClass}>{platforms[item.platform]}</div>
          </div>
        ))}
      </div>
    </div>
  );
});
