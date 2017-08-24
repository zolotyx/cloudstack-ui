import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { GroupsFilterService, InstanceGroupOrNoGroup, noGroup } from './groups-filter.service';
import { InstanceGroupService } from '../../../shared/services/instance-group.service';
import { VmService } from '../../shared/vm.service';
import { InstanceGroup } from '../../../shared/models/instance-group.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';



@Component({
  selector: 'cs-groups-filter',
  templateUrl: 'groups-filter.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupsFilterComponent),
      multi: true
    }
  ]
})
export class GroupsFilterComponent implements ControlValueAccessor, OnInit {
  @Input() public groups: Array<InstanceGroup>;
  public _selectedGroups: Array<InstanceGroupOrNoGroup>;
  public noGroup = noGroup;

  constructor(
    public groupsFilterService: GroupsFilterService,
    public instanceGroupService: InstanceGroupService,
    public vmService: VmService
  ) {}

  public ngOnInit(): void {
    this.instanceGroupService.groupsUpdates.subscribe(() => this.loadGroups());
  }

  @Input() public get selectedGroups(): Array<any> {
    return this._selectedGroups;
  }

  public set selectedGroups(groupings: Array<any>) {
    this._selectedGroups = groupings;
    this.update();
  }

  public writeValue(value): void {
    if (value) {
      this.selectedGroups = value;
    }
  }

  public propagateChange: any = () => {};
  public registerOnTouched(): any {}

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  public loadGroups(): void {
    this.vmService.getInstanceGroupList().subscribe(groupList => {
      this.groups = groupList.sort(this.groupsFilterService.groupSortPredicate);
      this.selectedGroups = this.selectedGroups.filter(selectedGroup => {
        return groupList.some(
          group => group.name === (selectedGroup as InstanceGroup).name);
      });
    });
  }

  private update(): void {
    this.selectedGroups = this.groupsFilterService.getSelectedEntities(this.groups);
  }
}
