import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import {
  AUTH_LOG_IN, AUTH_LOG_IN_ERROR,
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_OUT,
  AUTH_LOG_OUT_ERROR,
  AUTH_LOG_OUT_SUCCESS,
  AUTH_REFRESH_SESSION,
  AuthLogInErrorAction,
  AuthLogInSuccessAction,
  AuthLogOutErrorAction,
  AuthLogOutSuccessAction
} from '../actions/auth.actions';
import { TAppState } from '../reducers/index';
import { isAuthenticated } from '../selectors/auth.selectors';
import { AuthService } from '../../../shared/services/auth.service';
import { NotificationService } from '../../../shared/services/notification.service';


@Injectable()
export class RoutingEffects {
  public isAuthenticated$ = this.store.select(isAuthenticated);

  @Effect()
  authLogin$ = this.actions$
    .ofType(AUTH_LOG_IN)
    .switchMap((action: any) => {
        return this.authService.login(action.payload.username, action.payload.password)
          .map(res => new AuthLogInSuccessAction(res))
          .catch(error => Observable.of(this.handleError(error)));
      }
    );

  @Effect({ dispatch: false })
  authLoginSuccess$ = this.actions$
    .ofType(AUTH_LOG_IN_SUCCESS)
    .map(() => this.redirectToIndexAction());

  @Effect({ dispatch: false })
  authLoginError$ = this.actions$
    .ofType(AUTH_LOG_IN_ERROR)
    .map(error => this.handleError(error));

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

  // @Effect()
  // authSession$ = this.actions$
  //   .ofType(AUTH_REFRESH_SESSION)
  //   .switchMap(() => this.authService.sendRefreshRequest())
  //   .map(users => users[0])
  //   .map(user => new AuthRefreshSessionAction(user));

  public redirectToIndexAction() {
    const next = this.route.snapshot.queryParams['next'] &&
    this.route.snapshot.queryParams['next'] !== '/login' &&
    this.route.snapshot.queryParams['next'] !== 'login' ? this.route.snapshot.queryParams['next'] : '';
    this.router.navigateByUrl(next);
  };

  public redirectToLoginAction() {
    return this.router.navigate(['login']);
  };

  public handleError(error: any) {
    this.notificationService.message({
      translationToken: error.message,
      interpolateParams: error.params
    });
  }

  constructor(private actions$: Actions,
              private router: Router,
              private authService: AuthService,
              private route: ActivatedRoute,
              private store: Store<TAppState>,
              private notificationService: NotificationService) {
  }
}
