import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {
  AUTH_LOG_IN, AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT,
  // AUTH_LOG_OUT_ERROR,
  AUTH_LOG_OUT_SUCCESS,
  AUTH_REFRESH_SESSION, AuthLogInAction,
  AuthLogInErrorAction,
  AuthLogInSuccessAction,
  AuthLogOutErrorAction,
  AuthLogOutSuccessAction, AuthRefreshSessionAction
} from '../actions/auth.actions';
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { defer } from 'rxjs/observable/defer';


@Injectable()
export class AuthEffects {
  // public isAuthenticated$ = this.store.select(isAuthenticated);

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

  @Effect({ dispatch: false })
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
    .switchMap(() => {
      return this.authService.logout()
        .map(res => new AuthLogOutSuccessAction(res))
        .catch(error => Observable.of(new AuthLogOutErrorAction({ error: error })));
    });

  @Effect({ dispatch: false })
  authLogoutSuccess$ = this.actions$
    .ofType(AUTH_LOG_OUT_SUCCESS)
    .map(() => this.redirectToLoginAction());

  // @Effect()
  // logout$: Observable<any> = this.isAuthenticated$
  //   .filter((isAuthenticated) => !isAuthenticated)
  //   .map(() => this.redirectToLoginAction());

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
      return Observable.of(new AuthLogOutSuccessAction({}));
    }

  });

  public redirectToIndexAction() {
    const next = this.route.snapshot.queryParams['next'] &&
    this.route.snapshot.queryParams['next'] !== '/login' &&
    this.route.snapshot.queryParams['next'] !== 'login'
      ? this.route.snapshot.queryParams['next']
      : '';
    setTimeout(() => this.router.navigateByUrl(next));
  };

  public redirectToLoginAction() {
    setTimeout(() => this.router.navigate(['login']));
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
    // private store: Store<TAppState>,
    private notificationService: NotificationService
  ) {
  }
}
