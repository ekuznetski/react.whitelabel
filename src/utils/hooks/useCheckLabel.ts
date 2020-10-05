import env from '@domain';
import { ELabels } from '@domain/enums';

export function useCheckLabel(label?: string | ELabels | boolean) {
  const currentLabel: keyof typeof ELabels = env.LABEL?.toLowerCase() || 'default';
  if (typeof label === 'boolean' && label) label = ELabels.default;

  return label !== undefined && label !== null && typeof label === 'string'
    ? ELabels[label.toLowerCase() as keyof typeof ELabels] == currentLabel
    : true;
}
