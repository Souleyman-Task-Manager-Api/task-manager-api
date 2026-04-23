import { ApiCodeResponse, ApiException } from '@common/api';

export class MemberCreateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_CREATE_ERROR, 200);
  }
}

export class MemberDeleteException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_DELETE_ERROR, 200);
  }
}

export class MemberNotFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_NOT_FOUND, 200);
  }
}

export class MemberListException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_LIST_ERROR, 200);
  }
}

export class MemberUpdateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_UPDATE_ERROR, 200);
  }
}

export class MemberPlanCreateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_PLAN_CREATE_ERROR, 200);
  }
}

export class MemberPlanDeleteException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_PLAN_DELETE_ERROR, 200);
  }
}

export class MemberPlanNotFoundException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_PLAN_NOT_FOUND, 200);
  }
}

export class MemberPlanListException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_PLAN_LIST_ERROR, 200);
  }
}

export class MemberPlanUpdateException extends ApiException {
  constructor() {
    super(ApiCodeResponse.MEMBER_PLAN_UPDATE_ERROR, 200);
  }
}
