import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { State } from '../../../../../reducers';
import { Store } from '@ngrx/store';
// tslint:disable-next-line
import { VmCreationSecurityGroupData } from '../../../security-group/vm-creation-security-group-data';

import * as fromSecurityGroups from '../../../../../reducers/security-groups/redux/sg.reducers';
import * as securityGroupActions from '../../../../../reducers/security-groups/redux/sg.actions';

@Component({
  selector: 'cs-vm-creation-security-group-container',
  template: `
    <cs-vm-creation-security-group
      [sharedGroups]="sharedGroups$ | async"
      [savedData]="savedData"
      (close)="onClose($event)"
    ></cs-vm-creation-security-group>`
})
export class VmCreationSecurityGroupContainerComponent {
  readonly sharedGroups$ = this.store.select(fromSecurityGroups.selectSecurityGroupsForVmCreation);

  constructor(
    @Inject(MAT_DIALOG_DATA) public savedData: VmCreationSecurityGroupData,
    private dialogRef: MatDialogRef<VmCreationSecurityGroupContainerComponent>,
    private store: Store<State>
  ) {
    this.store.dispatch(new securityGroupActions.LoadSecurityGroupRequest());
  }

  public onClose(data: VmCreationSecurityGroupData) {
    this.dialogRef.close(data);
  }
}
