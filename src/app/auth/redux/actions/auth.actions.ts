import { Action } from '@ngrx/store';


export const AUTH_REFRESH_SESSION = '[Auth] Refresh Session';

export class AuthRefreshSessionAction implements Action {
  readonly type = AUTH_REFRESH_SESSION;

  constructor(public payload: any) {
  }
}

export const AUTH_LOG_IN = '[Auth] Log In';

export class AuthLogInAction implements Action {
  readonly type = AUTH_LOG_IN;

  constructor(public payload: any) {
  }
}

export const AUTH_LOG_IN_SUCCESS = '[Auth] Log In Success';

export class AuthLogInSuccessAction implements Action {
  readonly type = AUTH_LOG_IN_SUCCESS;

  constructor(public payload: any) {
  }
}

export const AUTH_LOG_IN_ERROR = '[Auth] Log In Error';

export class AuthLogInErrorAction implements Action {
  readonly type = AUTH_LOG_IN_ERROR;

  constructor(public payload: any) {
  }
}

export const AUTH_LOG_OUT = '[Auth] Log Out';

export class AuthLogOutAction implements Action {
  readonly type = AUTH_LOG_OUT;

  constructor(public payload: any) {
  }
}

export const AUTH_LOG_OUT_SUCCESS = '[Auth] Log Out Success';

export class AuthLogOutSuccessAction implements Action {
  readonly type = AUTH_LOG_OUT_SUCCESS;

  constructor(public payload: any = {}) {
  }
}

export const AUTH_LOG_OUT_ERROR = '[Auth] Log Out Error';

export class AuthLogOutErrorAction implements Action {
  readonly type = AUTH_LOG_OUT_ERROR;

  constructor(public payload: any) {
  }
}

export const AUTH_SESSION_EXPIRED = '[Auth] Session Expired';

export class AuthSessionExpiredAction implements Action {
  readonly type = AUTH_SESSION_EXPIRED;
}

export const AUTH_BOOTSTRAP = '[Auth] Bootstrap';

export class BootstrapAction implements Action {
  readonly type = AUTH_BOOTSTRAP;
}


export type Actions = AuthRefreshSessionAction
  | AuthLogInAction
  | AuthLogInErrorAction
  | AuthLogInSuccessAction
  | AuthLogOutAction
  | AuthLogOutSuccessAction
  | AuthSessionExpiredAction
  | BootstrapAction ;

