import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TAppState } from '../../auth/redux/reducers/index';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../../auth/redux/selectors/auth.selectors';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<TAppState>) {
  }

  public canActivate(): Observable<boolean> {
    return this.store.select(isAuthenticated).take(1);
  }
}
