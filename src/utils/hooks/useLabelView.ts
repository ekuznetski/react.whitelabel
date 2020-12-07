import { env } from '@env';
import { ELabels } from '@domain/enums';
import React from 'react';

type ILabelView = {
  [K in keyof typeof ELabels & '*']: React.ReactNode;
};

/**
 * Example:
 * ```
 * useLabelView({
 *   // will be showen on any Whitelabel (optional)
 *   '*': 'Default Value',
 *   // applyies only for specified Whitelabels, will overwrite the '*' value if exist
 *   [[ELabels.bsfx, ELabels.arofx]]: 'Specific Value',
 * })
 * ```
 */

export function useLabelView(props: ILabelView) {
  // @ts-ignore
  let tempContent = props?.['*'];
  let key = Object.keys(props).filter(
    (key) => key != '*' && key.toLowerCase().split(',').includes(env.LABEL?.toLowerCase()),
  );

  if (key.length) {
    // @ts-ignore
    tempContent = props[key[0]];
  }

  return tempContent || null;
}
