import { Svg } from '@components/shared';
import { MarketType } from '@domain/enums';
import { useToggle } from 'ahooks';
import classNames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MarketTable } from '..';
import './TableSection.scss';

export interface ITableSection {
  id: string;
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
      props.reversed && preview ? 'offset-xl-1' : '',
    );
    const tableColClass = classNames(
      'tableCol',
      preview ? 'col-12 col-lg-8 col-xl-7' : 'col-12',
      props.reversed && preview ? 'offset-lg-1 offset-xl-0' : '',
    );
    const { t } = useTranslation();

    function toggleTableView(scrollIntoView: boolean) {
      return (e: any) => {
        togglePreview.toggle();
        scrollIntoView && ref.current.scrollIntoView();
      };
    }

    return (
      <section className={classNames('table-section', preview && 'full')} id="tableType" ref={ref}>
        <div className="container">
          <div className={rowClass}>
            <div className={infoColClass}>
              {!preview ? <Svg href="close" className="close" onClick={toggleTableView(false)} /> : null}
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
              <div className="table-section__toggleTableSize" onClick={toggleTableView(!preview)}>
                {preview ? (
                  <>
                    {t('See all products')}
                    <Svg href="chevron" className="ml-2" height={20} />
                  </>
                ) : (
                  <>
                    {t('See less products')}
                    <Svg href="chevron" className="up ml-2" height={20} />
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
