import {
  AUTH_LOG_IN,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT, AUTH_REFRESH_SESSION,
  AUTH_LOG_IN_ERROR
} from '../actions/auth.actions';
// import { Action } from '@ngrx/store';
import * as auth from '../actions/auth.actions';

export interface TAuthState {
  // authenticated: boolean,
  isLoading: boolean,
  username: string,
  userId: string,
  name: string
}

const INITIAL_STATE: TAuthState = {
  // authenticated: false,
  isLoading: false,
  name: '',
  userId: '',
  username: ''
};

export function authReducer(
  state: TAuthState = INITIAL_STATE,
  action: auth.Actions
): TAuthState {
  switch (action.type) {

    case AUTH_REFRESH_SESSION: {
      return {
        ...state,
        name: action.payload.name,
        username: action.payload.username,
        userId: action.payload.userId
      };
    }

    case AUTH_LOG_IN: {
      return {
        ...state,
        isLoading: true
      };
    }

    case AUTH_LOG_IN_ERROR: {
      return {
        ...state,
        isLoading: false
      };
    }

    case AUTH_LOG_IN_SUCCESS: {
      // debugger;
      return {
        ...state,
        isLoading: false,
        name: `${action.payload.firstname} ${action.payload.lastname}`,
        username: action.payload.username,
        userId: action.payload.userid
      };
    }

    case AUTH_LOG_OUT: {
      return {
        ...state,
        name: '',
        username: '',
        userId: ''
      };
    }

    // case AUTH_LOG_OUT_SUCCESS: {
    //   return {
    //     ...state,
    //     name: '',
    //     username: '',
    //     userId: ''
    //   };
    // }
    //
    // case AUTH_SESSION_EXPIRED: {
    //   return {
    //     ...state,
    //     username: '',
    //     name: '',
    //     userId: ''
    //   };
    // }

    default: {
      return state;
    }
  }
}
