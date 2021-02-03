import { useToggle } from 'ahooks';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Svg } from '..';
import './Table.scss';

export interface ITable {
  headers: (string | React.ReactFragment)[];
  rows: (string | React.ReactFragment)[][];
  // in percentage, use null for auto sizes, where colN is class name according to col number that start with 1
  colsPctSize?: (number | null)[] | { [colN: string]: number };
  // in pixels, use null for auto sizes, if object {colN: number} where N is col number that start with 1
  colsPxSize?: (number | null)[] | { [colN: string]: number };
  className?: string;
  preview?: boolean;
  previewAmount?: number;
}

export function Table({ headers, rows, colsPctSize, colsPxSize, className, preview, previewAmount = 4 }: ITable) {
  const [previewValue, togglePreview] = useToggle(true);
  const { t } = useTranslation();
  if (colsPctSize && colsPxSize) {
    console.info('The colsPxSize has priority over colsPctSize values. ');
  }
  let colPct: string[] = new Array(headers.length);
  let colPx: string[] = new Array(headers.length);

  if (Array.isArray(colsPctSize)) colPct = [...colsPctSize].map((item) => `${item}%`);
  if (Array.isArray(colsPxSize)) colPx = [...colsPxSize].map((item) => `${item}px`);

  if (isObject(colsPctSize)) {
    Object.keys(colsPctSize as Record<string, unknown>).forEach((key) => {
      const _key = Number(key.replace(/\D*/, ''));
      // @ts-ignore
      colPct[_key] = `${colsPctSize[key]}%`;
    });
  }

  if (isObject(colsPxSize)) {
    Object.keys(colsPxSize as Record<string, unknown>).forEach((key) => {
      const _key = Number(key.replace(/\D*/, '')) - 1;
      // @ts-ignore
      colPx[_key] = `${colsPxSize[key]}px`;
    });
  }

  function toggleTableView() {
    togglePreview.toggle();
  }

  return (
    <div className="common-table-wrapper">
      <table className={classNames('common-table', className)}>
        <thead>
          <tr>
            {headers.map((headerCell, h) => (
              <th
                key={h}
                className={`text-center col${h + 1} px-2`}
                style={{ width: colPct[h] || 'auto', minWidth: colPx[h] || 'auto' }}
              >
                {headerCell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(preview && previewValue ? rows.slice(0, previewAmount) : rows).map((row, r) => (
            <tr key={r}>
              {row.slice(0, headers.length).map((cell, c) => (
                <td key={c} className="px-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {preview && (
        <div className="toggleTableView mt-4" onClick={toggleTableView}>
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
}

function isObject(val: any) {
  return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';
}
