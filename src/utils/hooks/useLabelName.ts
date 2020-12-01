import { env } from '@domain';
import { ELabels } from '@domain/enums';

export function useLabelName(): ELabels {
  const targetLabel = (env.LABEL?.toLowerCase() as ELabels) || ELabels.default;
  return targetLabel;
}
