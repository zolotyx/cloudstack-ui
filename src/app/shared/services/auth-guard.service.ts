import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TAppState } from '../../auth/redux/reducers/index';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../../auth/redux/selectors/auth.selectors';
import { RouterUtilsService } from './router-utils.service';
import { Go } from '../../auth/redux/actions/router.actions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<TAppState>,
    private routerUtilsService: RouterUtilsService
  ) {
  }

  public canActivate(_, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(isAuthenticated).take(1).map(result => {
      if (!result) {
        const params = this.routerUtilsService.getRedirectionQueryParams(state.url);
        this.store.dispatch(new Go({ path: ['logout'], query: params.queryParams }));
        return false;
      }
      return result;
    });
  }
}
