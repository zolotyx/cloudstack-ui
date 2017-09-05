import * as fromAuth from './auth.reducers';
import * as fromRouter from '@ngrx/router-store';
// import { ActionReducer, combineReducers } from '@ngrx/store';
// import { compose } from '@ngrx/store';
// import { environment } from '../../environments/environment';
// import { storeFreeze } from 'ngrx-store-freeze';
import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';
import { environment } from '../../../../environments/environment';
import { ActionReducer, combineReducers, compose } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
}

// export class CustomRouterStateSerializer
//   implements RouterStateSerializer<RouterStateUrl> {
//   serialize(routerState: RouterStateSnapshot): RouterStateUrl {
//     const { url } = routerState;
//     const queryParams = routerState.root.queryParams;
//
//     return { url, queryParams };
//   }
// }
export interface TAppState {
  auth: fromAuth.TAuthState;
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers = {
  auth: fromAuth.authReducer,
  router: fromRouter.routerReducer
};

const developmentReducer: ActionReducer<TAppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<TAppState> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  // debugger;
  if (environment.production) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
