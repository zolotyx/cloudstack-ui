import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SecurityGroup } from '../../../../security-group/sg.model';
import { Rules } from '../../../../shared/components/security-group-builder/rules';
// tslint:disable-next-line
import { VmCreationSecurityGroupData } from '../../security-group/vm-creation-security-group-data';
import { VmCreationSecurityGroupMode } from '../../security-group/vm-creation-security-group-mode';


@Component({
  selector: 'cs-vm-creation-security-group',
  templateUrl: 'vm-creation-security-group.component.html',
  styleUrls: ['vm-creation-security-group.component.scss']
})
export class VmCreationSecurityGroupComponent {
  private _savedData: VmCreationSecurityGroupData;
  public title = {
    [VmCreationSecurityGroupMode.Builder]: 'SECURITY_GROUP_SELECTOR.BUILD_NEW_GROUP',
    [VmCreationSecurityGroupMode.Selector]: 'SECURITY_GROUP_SELECTOR.SELECT_EXISTING_GROUP'
  };

  public get savedData(): VmCreationSecurityGroupData {
    return this._savedData;
  }

  @Input() public sharedGroups: Array<SecurityGroup>;

  @Input()
  public set savedData(value: VmCreationSecurityGroupData) {
    this._savedData = value;
  }

  @Output() public close = new EventEmitter();

  public get displayMode(): VmCreationSecurityGroupMode {
    return this._savedData.mode;
  }

  public set displayMode(value: VmCreationSecurityGroupMode) {
    this._savedData.mode = value;
  }

  public get VmCreationSecurityGroupMode() {
    return VmCreationSecurityGroupMode;
  }

  public onSave(): void {
    this.close.emit(this._savedData);
  }

  public onCancel(): void {
    this.close.emit();
  }

  public onBuilderGroupChange(rules: Rules): void {
    this._savedData.rules = rules;
  }

  public onSecurityGroupChange(groups: SecurityGroup[]): void {
    this._savedData.securityGroups = groups;
  }
}
