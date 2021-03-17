import { Col, Container, Row, Svg } from '@components/shared';
import { EAssetClass } from '@domain/enums';
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
  tableType: EAssetClass;
  reversed?: boolean;
}

export const TableSection = memo(
  forwardRef((props: ITableSection, ref: any) => {
    const [preview, togglePreview] = useToggle(true);
    const rowClass = classNames('no-gutters', props.reversed && preview && 'reversed');
    const infoColClass = classNames('info-col', preview && 'preview');
    const tableColClass = classNames('table-col', preview && 'preview');
    const { t } = useTranslation();

    function toggleTableView(scrollIntoView: boolean) {
      return (e: any) => {
        togglePreview.toggle();
        scrollIntoView && ref.current.scrollIntoView();
      };
    }

    return (
      <section className={classNames('table-section', preview && 'full')} id="tableType" ref={ref}>
        <Container>
          <Row className={rowClass + ' tableWrapper'}>
            <Col className={infoColClass}>
              {!preview ? <Svg href="close" className="close" onClick={toggleTableView(false)} /> : null}
              <div className="info-col__title">{props.title}</div>
              <div className="info-col__desc">{props.desc}</div>
              {preview ? (
                <div className="info-col__key-points">
                  {props.points.map((point, i) => (
                    <div key={i} className={'info-col__key-points__item'}>
                      {point}
                    </div>
                  ))}
                </div>
              ) : null}
            </Col>
            <Col className={tableColClass}>
              <MarketTable type={props.tableType} preview={preview} />
            </Col>
          </Row>
          <Row className={rowClass + ' seeAll'}>
            <Col className={infoColClass} />
            <Col className={tableColClass}>
              <div className="table-col__toggle-table-size" onClick={toggleTableView(!preview)}>
                {preview ? (
                  <>
                    {t('See all products')}
                    <Svg href="chevron" className="more" height={20} />
                  </>
                ) : (
                  <>
                    {t('See less products')}
                    <Svg href="chevron" className="less" height={20} />
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }),
);
