import { Component, OnInit } from '@angular/core';
import { TAppState } from '../../../auth/redux/reducers/index';
import { Store } from '@ngrx/store';
import { Back } from '../../../auth/redux/actions/router.actions';


@Component({
  selector: 'cs-reload',
  template: '<div></div>'
})
export class ReloadComponent implements OnInit {
  constructor(private store: Store<TAppState>) {
  }

  public ngOnInit(): void {
    this.store.dispatch(new Back());
  }
}
