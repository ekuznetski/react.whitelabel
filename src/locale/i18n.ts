import i18n, { StringMap, TFunction, TFunctionKeys, TFunctionResult, TOptions } from 'i18next';

type I18n = typeof i18n & { getLazyT: TFunction };
function _getLazyT<
  TResult extends TFunctionResult = string,
  TKeys extends TFunctionKeys = string,
  TInterpolationMap extends object = StringMap
>(key: TKeys | TKeys[], opts?: TOptions<TInterpolationMap> | string) {
  const _t = i18n.getFixedT(i18n.language);
  return (() => _t(key))();
}

Object.defineProperty(i18n, 'getLazyT', {
  value: _getLazyT,
  writable: false,
});
// @ts-ignore
const _i18n: I18n = i18n;

export default _i18n;
