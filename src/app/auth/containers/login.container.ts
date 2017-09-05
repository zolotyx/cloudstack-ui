import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { TAppState } from '../redux/reducers/index';
import { AuthLogInAction } from '../redux/actions/auth.actions';
import { isLoading } from '../redux/selectors/auth.selectors';
import { LoginData } from '../login.component';


@Component({
  selector: 'cs-login-container',
  template: '<cs-login (onLogin)="login($event)" [isLoading]="isLoading$ | async"></cs-login>'
})
export class LoginContainerComponent {
  readonly isLoading$ = this.store.select(isLoading);

  constructor(private store: Store<TAppState>) {
  }

  public login(data: LoginData) {
    this.store.dispatch(new AuthLogInAction(data));
  }
}
