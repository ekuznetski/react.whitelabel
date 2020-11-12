import { Svg } from '@components/shared';
import { MarketType } from '@domain/enums';
import { useToggle } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MarketTable } from '../marketTable/MarketTable';
import './TableSection.scss';

export interface ITableSection {
  title: string | React.ReactFragment;
  desc: string | React.ReactFragment;
  points: (string | React.ReactFragment)[];
  tableType: MarketType;
  reversed?: boolean;
}

export const TableSection = memo(
  forwardRef((props: ITableSection, ref: any) => {
    const [preview, togglePreview] = useToggle(true);
    const rowClass = classNames('row', props.reversed && preview ? 'reversed' : '');
    const infoColClass = classNames(
      'py-4',
      preview ? 'col-12 col-lg-4 mb-7' : 'col-12',
      props.reversed && preview ? 'offset-lg-1' : '',
    );
    const tableColClass = classNames('tableCol',
      preview ? 'col-12 col-lg-8 col-xl-7' : 'col-12',
      props.reversed || !preview ? '' : 'offset-xl-1',
    );
    const { t } = useTranslation();

    function toggleTableView(type: MarketType) {
      return (e: any) => {
        togglePreview.toggle();
      };
    }

    return (
      <section className={classNames('table-section', preview && 'full')} id="tableType" ref={ref}>
        <div className="container">
          <div className={rowClass}>
            <div className={infoColClass}>
              {!preview ? <Svg href="close" className="close" onClick={toggleTableView(props.tableType)} /> : null}
              <div className="table-section__title mb-7">{props.title}</div>
              <div className="table-section__desc mb-8">{props.desc}</div>
              {preview ? (
                <div className="table-section__key-points">
                  {props.points.map((point, i) => (
                    <div key={i} className="table-section__key-points__item">
                      {point}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            <div className={tableColClass}>
              <MarketTable className="mb-6" type={props.tableType} preview={preview} />
              <div className="table-section__toggleTableSize" onClick={toggleTableView(props.tableType)}>
                {preview ? (
                  <>
                    {t('See all products')}
                    <Svg href="chevron" height={20} />
                  </>
                ) : (
                  <>
                    {t('See less products')}
                    <Svg href="chevron" className="up" height={20} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }),
);
