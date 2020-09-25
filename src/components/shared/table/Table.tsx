import React from 'react';
import './Table.scss';
import classNames from 'classnames';

export interface ITable {
	headers: (string | React.ReactFragment)[];
	rows: (string | React.ReactFragment)[][];
	// in percentage, use null for auto sizes, where colN is class name according to col number that start with 1
	colsPctSize?: (number | null)[] | { [colN: string]: number };
	// in pixels, use null for auto sizes, if object {colN: number} where N is col number that start with 1
	colsPxSize?: (number | null)[] | { [colN: string]: number };
	className?: string;
}

export function Table({ headers, rows, colsPctSize, colsPxSize, className }: ITable) {
	if (colsPctSize && colsPxSize) {
		console.info('The colsPxSize has priority over colsPctSize values. ');
	}
	let colPct: string[] = new Array(headers.length);
	let colPx: string[] = new Array(headers.length);

	if (Array.isArray(colsPctSize)) colPct = [...colsPctSize].map((item) => item + '%');
	if (Array.isArray(colsPxSize)) colPx = [...colsPxSize].map((item) => item + 'px');

	if (isObject(colsPctSize)) {
		Object.keys(colsPctSize as object).forEach((key) => {
			const _key = Number(key.replace(/\D*/, ''));
			// @ts-ignore
			colPct[_key] = colsPctSize[key] + '%';
		});
	}

	if (isObject(colsPxSize)) {
		Object.keys(colsPxSize as object).forEach((key) => {
			const _key = Number(key.replace(/\D*/, '')) - 1;
			// @ts-ignore
			colPx[_key] = colsPxSize[key] + 'px';
		});
	}

	return (
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
				{rows.map((row, r) => (
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
	);
}

function isObject(val: any) {
	return typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';
}
