import * as fromAuth from './auth.reducers';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

export interface TAppState {
  auth: fromAuth.TAuthState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers = {
  auth: fromAuth.authReducer,
  router: fromRouter.routerReducer
};
