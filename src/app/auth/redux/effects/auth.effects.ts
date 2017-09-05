import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import * as RoutingActions from '../actions/router.actions';
import * as AuthActions from '../actions/auth.actions';
import {
  AUTH_LOG_IN,
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT,
  AUTH_LOG_OUT_SUCCESS,
  AuthLogInAction,
  AuthLogInErrorAction,
  AuthLogInSuccessAction, AuthLogOutAction,
  AuthLogOutErrorAction,
  AuthLogOutSuccessAction, AuthRefreshSessionAction
} from '../actions/auth.actions';
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { defer } from 'rxjs/observable/defer';
import { isAuthenticated } from '../selectors/auth.selectors';
import { Store } from '@ngrx/store';
import { TAppState } from '../reducers/index';


@Injectable()
export class AuthEffects {
  readonly isAuthenticated$ = this.store.select(isAuthenticated);

  @Effect()
  authLogin$ = this.actions$
    .ofType(AUTH_LOG_IN)
    .switchMap((action: AuthLogInAction) =>
      this.authService.login(
        action.payload.username,
        action.payload.password,
        action.payload.domain
      )
        .map(res => new AuthLogInSuccessAction(res))
        .catch(error => Observable.of(new AuthLogInErrorAction(error)))
    );

  @Effect()
  authLoginSuccess$ = this.actions$
    .ofType(AUTH_LOG_IN_SUCCESS)
    .map(() => this.redirectToIndexAction());

  @Effect({ dispatch: false })
  authLoginError$ = this.actions$
    .ofType(AUTH_LOG_IN_ERROR)
    .map((action: AuthLogInErrorAction) => this.handleError(action.payload));

  @Effect()
  authLogOut$ = this.actions$
    .ofType(AUTH_LOG_OUT)
    .switchMap((action: AuthActions.AuthLogOutAction) => {
      return this.authService.logout()
        .map(res => new AuthLogOutSuccessAction(action.payload))
        .catch(error => Observable.of(new AuthLogOutErrorAction({ error: error })));
    });

  @Effect()
  authLogoutSuccess$ = this.actions$
    .ofType(AUTH_LOG_OUT_SUCCESS)
    .map((action: AuthActions.AuthLogOutSuccessAction) =>
      this.redirectToLoginAction(action.payload));

  // @Effect()
  // loggedOut$ = this.isAuthenticated$
  //   .filter((isAuthenticated) => !isAuthenticated)
  //   .map(() => new AuthLogOutAction());

  @Effect()
  init$ = defer(() => {
    const userData = {
      name: this.authService.name,
      username: this.authService.username,
      userId: this.authService.userId
    };
    if (userData.userId) {
      return Observable.of(new AuthRefreshSessionAction(userData));
    } else {
      return Observable.of(new AuthLogOutSuccessAction());
    }

  });

  public redirectToIndexAction() {
    const next = this.route.snapshot.queryParams['next'] &&
    this.route.snapshot.queryParams['next'] !== '/login' &&
    this.route.snapshot.queryParams['next'] !== 'login'
      ? this.route.snapshot.queryParams['next']
      : '';
    return new RoutingActions.Go({ path: [next] });
  };

  public redirectToLoginAction(redirectionParams: NavigationExtras) {
    return new RoutingActions.Go({
      path: ['login'],
      query: redirectionParams.queryParams
    });
  };

  public handleError(error: any) {
    this.notificationService.message({
      translationToken: error.message,
      interpolateParams: error.params
    });
  }

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private store: Store<TAppState>,
    private notificationService: NotificationService
  ) {
  }
}
