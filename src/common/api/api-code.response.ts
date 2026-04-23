export enum ApiCodeResponse {
  TEST = 'api.result.test',
  NO_TOKEN_FOUNDED = 'api.security.error.no-token-found',
  USER_NOT_FOUND = 'api.security.error.user-not-found',
  TOKEN_EXPIRED = 'api.security.error.token-expired',
  SIGNUP_ERROR = 'api.security.error.signup',
  CREDENTIAL_DELETE_ERROR = 'api.security.error.credential-delete',
  USER_ALREADY_EXIST = 'api.security.error.user-already-exist',
  TOKEN_GEN_ERROR = 'api.security.error.token-gen',
  PAYLOAD_IS_NOT_VALID = 'api.payload.error.not-valid',
  COMMON_SUCCESS = 'api.success.common',
  // Member errors
  MEMBER_CREATE_ERROR = 'api.member.error.create',
  MEMBER_DELETE_ERROR = 'api.member.error.delete',
  MEMBER_NOT_FOUND = 'api.member.error.not-found',
  MEMBER_LIST_ERROR = 'api.member.error.list',
  MEMBER_UPDATE_ERROR = 'api.member.error.update',

// MemberPlan errors
  MEMBER_PLAN_CREATE_ERROR = 'api.member.plan.error.create',
  MEMBER_PLAN_DELETE_ERROR = 'api.member.plan.error.delete',
  MEMBER_PLAN_NOT_FOUND = 'api.member.plan.error.not-found',
  MEMBER_PLAN_LIST_ERROR = 'api.member.plan.error.list',
  MEMBER_PLAN_UPDATE_ERROR = 'api.member.plan.error.update',
}
