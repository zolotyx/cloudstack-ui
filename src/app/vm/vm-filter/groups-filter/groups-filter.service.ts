import { Injectable } from '@angular/core';
import { InstanceGroup } from '../../../shared/models/instance-group.model';
import { FilterItemConfig, FilterType } from '../../../shared/services/filter.service';
import { Filter } from '../filter';


export type noGroup = '-1';
export const noGroup: noGroup = '-1';
export type InstanceGroupOrNoGroup = InstanceGroup | noGroup;

@Injectable()
export class GroupsFilterService extends Filter<InstanceGroupOrNoGroup> {
  public key = 'groups';
  public type: FilterType = 'array';
  public defaultOption = [];

  public get filterConfig(): FilterItemConfig {
    return {
      type: this.type,
      defaultOption: this.defaultOption
    }
  }

  public getSelectedEntities(instanceGroups: Array<InstanceGroup>): Array<InstanceGroupOrNoGroup> {
    const selectedGroups: Array<InstanceGroupOrNoGroup> = instanceGroups.filter(group => {
      this.paramsEntities.filter(name => name === group.name);
    });

    if (this.paramsContainNoGroup) {
      selectedGroups.push(noGroup);
    }

    return selectedGroups;
  }

  public stringifyEntities(groups: Array<any>): Array<string> {
    return groups.map(_ => (_ as InstanceGroup).name || '');
  }

  public groupSortPredicate(
    a: InstanceGroupOrNoGroup,
    b: InstanceGroupOrNoGroup
  ): number {
    if (a === noGroup || a.name < (b as InstanceGroup).name) {
      return -1;
    }
    if (b === noGroup || a.name > b.name) {
      return 1;
    }
    return 0;
  }

  public getUpdateFiltersEmitMessage(groups: Array<any>): Array<any> {
    groups.sort(this.groupSortPredicate);
    return groups;
  }

  private get paramsContainNoGroup(): boolean {
    return this.paramsEntities.includes('');
  }
}
