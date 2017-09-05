import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { TAppState } from '../../auth/redux/reducers/index';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '../../auth/redux/selectors/auth.selectors';
import { RouterUtilsService } from './router-utils.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<TAppState>,
    private routerUtilsService: RouterUtilsService,
    private router: Router
  ) {
  }

  public canActivate(_, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(isAuthenticated).take(1).map(result => {
      if (!result) {
        this.router.navigate(
          ['/logout'],
          this.routerUtilsService.getRedirectionQueryParams(state.url)
        );
      }
      return result;
    });
  }
}


// import { Injectable } from '@angular/core';
// import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
//
// import { AuthService } from './auth.service';
// import { RouterUtilsService } from './router-utils.service';
//
//
// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(
//     private auth: AuthService,
//     private router: Router,
//     private routerUtilsService: RouterUtilsService
//   ) { }
//
//   public canActivate(_, state: RouterStateSnapshot): Observable<boolean> {
//     return this.auth.loggedIn.map(result => {
//       if (!result) {
//         this.router.navigate(
//           ['/logout'],
//           this.routerUtilsService.getRedirectionQueryParams(state.url)
//         );
//       }
//       return result;
//     });
//   }
// }
