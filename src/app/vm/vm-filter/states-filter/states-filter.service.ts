import { Injectable } from '@angular/core';
import { FilterItemConfig, FilterType } from '../../../shared/services/filter.service';
import { VmState } from '../../shared/vm.model';
import { Filter } from '../filter';


@Injectable()
export class StatesFilterService extends Filter<VmState> {
  public key = 'states';
  public type: FilterType = 'array';
  public defaultOption = [];

  public states = [
    { state: VmState.Running, name: 'VM_PAGE.FILTERS.STATE_RUNNING' },
    { state: VmState.Stopped, name: 'VM_PAGE.FILTERS.STATE_STOPPED' },
    { state: VmState.Error, name: 'VM_PAGE.FILTERS.STATE_ERROR' }
  ];

  public get options(): Array<VmState> {
    return this.states.map(_ => _.state);
  }

  public get filterConfig(): FilterItemConfig {
    return {
      type: this.type,
      options: this.options,
      defaultOption: this.defaultOption
    };
  }

  public getSelectedEntities(): Array<VmState> {
    return this.paramsEntities as Array<VmState>;
  }

  public stringifyEntities(states: Array<any>): Array<string> {
    return states;
  }

  public getUpdateFiltersEmitMessage(states: Array<any>): Array<any> {
    return states;
  }
}
