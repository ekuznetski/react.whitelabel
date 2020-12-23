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
  notSubmitted = 'Not submitted',
  submitted = 'Submitted',
  notRequested = 'Not Requested',
  required = 'Required',
  notApplicable = 'Not Applicable',
  clientApproved = 'The Client is Approved',
  clientEddRequired = 'The Client is EDD Required',
  clientLiquidOnly = 'The Client is Liquidation Only',
  liquidOnlyEdd = 'Liquidation Only - EDD',
  onReview = 'Under Review',
  approved = 'Approved',
  rejected = 'Rejected',
  notRequired = 'Not Required',
  pending = 'Pending',
  dormant = 'The Client is Dormant',
}

export enum EClientStatusCode {
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
