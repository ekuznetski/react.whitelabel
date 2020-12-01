import { env } from '@domain';
import { ELabels } from '@domain/enums';
import React from 'react';

interface ILabelView {
  children: React.ReactFragment | { [k: string]: React.ReactFragment };
  showOn?: ELabels | ELabels[];
  hideOn?: ELabels | ELabels[];
}

/**
 * Example:
 * ```
 * <LabelView>
 * {{
 *   // will be showen on any Whitelabel (optional)
 *   '*': 'Default Value',
 *   // applyies only for specified Whitelabels, will overwrite the '*' value if exist
 *   [[ELabels.bsfx, ELabels.arofx]]: 'Specific Value',
 * }}
 * </LabelView>
 * ```
 */

export function LabelView({ children, showOn = ELabels.default, hideOn = [] }: ILabelView) {
  // @ts-ignore
  showOn = Array.from<ELabels>([showOn]).flat();
  // @ts-ignore
  hideOn = Array.from<ELabels>([hideOn]).flat();
  let _children;
  
  if (!React.isValidElement(children)) {
    // @ts-ignore
    let tempContent: React.ReactFragment = children?.['*'];
    let key = Object.keys(children).filter(
      (key) => key != '*' && key.toLowerCase().split(',').includes(env.LABEL?.toLowerCase()),
    );

    if (key.length) {
      // @ts-ignore
      tempContent = children[key[0]];
    }

    _children = tempContent;
  } else {
    _children =
      (showOn.map((label) => label.toLowerCase()).includes(env.LABEL?.toLowerCase()) &&
        !hideOn.map((label) => label.toLowerCase()).includes(env.LABEL?.toLowerCase())) &&
      children;
  }

  return _children ? <>{_children}</> : null;
}
