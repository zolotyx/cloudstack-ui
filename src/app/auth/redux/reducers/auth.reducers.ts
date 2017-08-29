import {
  // AUTH_LOG_IN,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT, AUTH_REFRESH_SESSION,
  AUTH_SESSION_EXPIRED,
  AUTH_LOG_OUT_SUCCESS
} from '../actions/auth.actions';
// import { Action } from '@ngrx/store';
import * as auth from '../actions/auth.actions';

export interface TAuthState {
  // authenticated: boolean,
  username: string,
  userId: string,
  name: string
}

const INITIAL_STATE: TAuthState = {
  // authenticated: false,
  name: '',
  userId: '',
  username: ''
};

export const authReducer = (state: TAuthState = INITIAL_STATE, action: auth.Actions): TAuthState => {
  switch (action.type) {

    case AUTH_REFRESH_SESSION: {
      return {
        ...state,
        name: `${action.payload.firstname} ${action.payload.lastname}`,
        username: action.payload.username,
        userId: action.payload.id
      };
    }

    case AUTH_LOG_IN_SUCCESS: {
      // debugger;
      return {
        ...state,
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
};
