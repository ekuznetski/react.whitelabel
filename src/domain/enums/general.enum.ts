export enum EHttpMethod {
  'get' = 'get',
  'post' = 'post',
  'put' = 'put',
  'delete' = 'delete',
}

export enum ECreditCardType {
  mastercard = 'mastercard',
  visa = 'visa',
}

export enum EResponseStatus {
  success = 'success',
  failure = 'failure',
}

export enum EModalType {
  success = 'success',
  failure = 'failure',
}

export enum EFormStatus {
  loading = 'loading',
  error = 'error',
  invalid = 'invalid',
  disabled = 'disabled',
}

export enum ETaskStatus {
  inProgress = 'inProgress',
  pending = 'pending',
  success = 'success',
  failure = 'failure',
}

export enum ETaskStatusCode {
  pending = 0,
  inProgress = 1,
  success = 2,
  failure = 3,
}

export enum ENotificationType {
  info = 'info',
  warning = 'warning',
  success = 'success',
  danger = 'danger',
}

export enum EClientStatus {
  notSubmitted = 'notSubmitted',
  submitted = 'submitted',
  notRequested = 'notRequested',
  required = 'required',
  notApplicable = 'notApplicable',
  clientApproved = 'clientApproved',
  clientEddRequired = 'clientEddRequired',
  clientLiquidOnly = 'clientLiquidOnly',
  liquidOnlyEdd = 'liquidOnlyEdd',
  onReview = 'onReview',
  approved = 'approved',
  rejected = 'rejected',
  notRequired = 'notRequired',
  pending = 'pending',
  dormant = 'dormant',
  unknown = 'unknown',
}

export enum EClientStatusCode {
  unknown = -1,
  notSubmitted = 0,
  submitted = 1,
  notRequested = 2,
  required = 3,
  notApplicable = 4,
  clientApproved = 5,
  clientEddRequired = 6,
  clientLiquidOnly = 7,
  liquidOnlyEdd = 8,
  onReview = 10,
  approved = 11,
  rejected = 12,
  notRequired = 13,
  pending = 14,
  dormant = 15,
}

export const ClientStatusCodeNotificationType = Object.freeze({
  [EClientStatusCode.unknown]: ENotificationType.danger,
  [EClientStatusCode.notSubmitted]: ENotificationType.danger,
  [EClientStatusCode.submitted]: ENotificationType.success,
  [EClientStatusCode.notRequested]: ENotificationType.info,
  [EClientStatusCode.required]: ENotificationType.danger,
  [EClientStatusCode.notApplicable]: ENotificationType.warning,
  [EClientStatusCode.clientApproved]: ENotificationType.success,
  [EClientStatusCode.clientEddRequired]: ENotificationType.danger,
  [EClientStatusCode.clientLiquidOnly]: ENotificationType.warning,
  [EClientStatusCode.liquidOnlyEdd]: ENotificationType.warning,
  [EClientStatusCode.onReview]: ENotificationType.warning,
  [EClientStatusCode.approved]: ENotificationType.success,
  [EClientStatusCode.rejected]: ENotificationType.danger,
  [EClientStatusCode.notRequired]: ENotificationType.info,
  [EClientStatusCode.pending]: ENotificationType.warning,
  [EClientStatusCode.dormant]: ENotificationType.warning,
});

export enum EMarketingCookies {
  raf_id = 'raf_id',
  suid = 'suid',
  click_id = 'click_id',
  clickid = 'clickid',
  utm_affiliatecode = 'utm_affiliatecode',
  eaid = 'eaid',
  subid = 'subid',
  subid2 = 'subid2',
  a_id = 'a_id',
  campaign_id = 'campaign_id',
  campaignid = 'campaignid',
  CAMPAINIDINT = 'CAMPAINIDINT',
}
