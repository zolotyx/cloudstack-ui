import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TAppState } from '../../auth/redux/reducers/index';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../../auth/redux/selectors/auth.selectors';


@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private store: Store<TAppState>,
    private router: Router
  ) {
  }

  public canActivate(): Observable<boolean> {
    return this.store.select(isAuthenticated)
      .map(result => {
        debugger;
        if (result) {
          this.router.navigate(['/instances']);
        }
        return !result;
      });
  }
}
