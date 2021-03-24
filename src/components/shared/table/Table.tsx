import { useToggle } from 'ahooks';
import classNames from 'classnames';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Svg } from '..';
import './Table.scss';

export interface ITable {
  headers: (string | React.ReactFragment)[];
  rows: (string | React.ReactFragment)[][];
  colsSize?: string[] | { [colN: string]: string };
  className?: string;
  preview?: boolean;
  previewAmount?: number;
}

export const Table = memo(
  function Table({ headers, rows, colsSize, className, preview, previewAmount = 4 }: ITable) {
    const [previewValue, togglePreview] = useToggle(true);
    const previewRows = rows.slice(0, previewAmount);
    const { t } = useTranslation();

    let col: string[] = new Array(headers.length);

    if (Array.isArray(colsSize)) col = [...colsSize].map((item) => (item != 'auto' && item ? item : 'auto'));
    else if (isObject(colsSize)) {
      Object.keys(colsSize as Record<string, unknown>).forEach((key) => {
        const _key = Number(key.replace(/\D*/, ''));

        // @ts-ignore
        col[_key] = colsSize[key] != 'auto' && colsSize[key] ? colsSize[key] : 'auto';
      });
    }

    rows = rows.map((row) => Object.assign(new Array(headers.length).fill(''), row));

    function toggleTableView() {
      togglePreview.toggle();
    }

    return (
      <div className="common-table-wrapper">
        <div className="common-table-container">
          <div className={classNames('common-table', className)} style={{ gridTemplateColumns: col.join(' ') }}>
            {headers.map((headerCell, h) => (
              <div
                key={h}
                className={classNames('th', `col${h + 1}`, !h && 'col--first', h + 1 === headers.length && 'col--last')}
              >
                {headerCell}
              </div>
            ))}
            {(preview && previewValue ? previewRows : rows).map((row, r) =>
              row.slice(0, headers.length).map((cell, c) => (
                <div
                  className={classNames(
                    'td',
                    `col${c + 1}`,
                    !c && 'col--first',
                    r + 1 === (previewValue ? previewRows.length : rows.length) && 'row--last',
                    c + 1 === headers.length && 'col--last',
                  )}
                  key={c}
                >
                  {cell}
                </div>
              )),
            )}
          </div>
        </div>
        {preview && (
          <div className="toggle-table-view mt-4" onClick={toggleTableView}>
            {previewValue ? (
              <>
                {t('Show more')}
                <Svg href="chevron" className="ml-2" height={14} width={14} />
              </>
            ) : (
              <>
                {t('Show less')}
                <Svg href="chevron" className="up ml-2" height={14} width={14} />
              </>
            )}
          </div>
        )}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.rows != nextProps.rows || prevProps.headers != nextProps.headers;
  },
);

function isObject(val: any) {
  return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';
}
