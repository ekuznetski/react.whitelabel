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
  success = 'success',
  failure = 'failure',
}

export enum EClientStatus {
  notSubmitted = 'Not submitted',
  submitted = 'Submitted',
  notRequested = 'Not requested',
  required = 'Required',
  notApplicable = 'Not applicable',
  clientApproved = 'The Client is Approved',
  clientEddRequired = 'The Client is EDD Required',
  clientLiquidOnly = 'The Client is Liquidation Only',
  liquidOnlyEdd = 'Liquidation Only - EDD',
  liquidOnlyMifir = 'Liquidation Only - MiFIR',
  onReview = 'Under review',
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
  liquidOnlyMifir = 9,
  onReview = 10,
  approved = 11,
  rejected = 12,
  notRequired = 13,
  pending = 14,
  dormant = 15,
}
