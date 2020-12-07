import { env } from '@env';
import { useMemo } from 'react';
import { ELabels } from '@domain/enums';

export function useLabelFolder(path?: string) {
  const targetLabel = (env.LABEL?.toLowerCase() as ELabels) || ELabels.default;

  if (ELabels[targetLabel] == undefined || ELabels[targetLabel] == null) {
    throw new Error(
      'env.LABEL value: ' +
        targetLabel +
        ' is not supported! Pls check that the value exist in EProjects enum or add it',
    );
  }

  return useMemo(() => {
    if (path) {
      switch (true) {
        case path.search(/assets\//) !== -1:
          {
            path = path.replace(/assets\//, `assets/_${targetLabel}`);
          }
          break;
      }
    } else {
      path = `/_${targetLabel}`;
    }

    return path;
  }, [path]);
}
