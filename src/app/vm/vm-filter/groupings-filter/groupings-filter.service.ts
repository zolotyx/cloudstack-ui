import { Injectable } from '@angular/core';
import { FilterItemConfig, FilterType } from '../../../shared/services/filter.service';
import { Filter } from '../filter';


@Injectable()
export class GroupingsFilterService extends Filter<any> {
  public key = 'groupings';
  public type: FilterType = 'array';
  public defaultOption = [];

  public get filterConfig(): FilterItemConfig {
    return {
      type: this.type,
      defaultOption: this.defaultOption
    };
  }

  public sortAvailableGroupings(availableGroupings: Array<any>, selectedGroupings: Array<any>): Array<any> {
    availableGroupings.sort((groupingA, groupingB) => {
      return selectedGroupings.findIndex(_ => _ === groupingA) -
        selectedGroupings.findIndex(_ => _ === groupingB);
    });

    return availableGroupings;
  }

  public getSelectedEntities(availableGroupings: Array<any>): Array<any> {
    return this.paramsEntities.reduce((acc, _) => {
      const grouping = availableGroupings.find(g => g.key === _);
      if (grouping) {
        acc.push(grouping);
      }
      return acc;
    }, []);
  }

  public stringifyEntities(groupings: Array<any>): Array<string> {
    return groupings.map(grouping => grouping.key);
  }

  public getUpdateFiltersEmitMessage(groupings: Array<any>): Array<any> {
    return groupings;
  }
}
