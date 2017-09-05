import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TAppState } from './redux/reducers/index';
import { AuthLogOutAction } from './redux/actions/auth.actions';
import { ActivatedRoute } from '@angular/router';
import { RouterUtilsService } from '../shared/services/router-utils.service';


@Component({
  selector: 'cs-logout',
  template: '<div></div>'
})
export class LogoutComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private routerUtilsService: RouterUtilsService,
    private store: Store<TAppState>
  ) {
  }

  public ngOnInit(): void {
    const next = this.activatedRoute.snapshot.queryParams['next'];
    const redirectionParams = next ? this.routerUtilsService.getRedirectionQueryParams(
      next) : {};
    this.store.dispatch(new AuthLogOutAction(redirectionParams));
  }
}
