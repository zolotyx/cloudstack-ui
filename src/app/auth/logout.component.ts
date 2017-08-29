import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TAppState } from './redux/reducers/index';
import { AuthLogOutAction } from './redux/actions/auth.actions';


@Component({
  selector: 'cs-logout',
  template: '<div></div>'
})
export class LogoutComponent implements OnInit {
  constructor(
    private store: Store<TAppState>
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new AuthLogOutAction());
  }
}
