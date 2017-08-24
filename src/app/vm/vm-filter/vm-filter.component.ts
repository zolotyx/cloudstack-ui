import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstanceGroup, Zone } from '../../shared/models';
import { FilterConfig, FilterService } from '../../shared/services/filter.service';
import { InstanceGroupService } from '../../shared/services/instance-group.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { VmState } from '../shared/vm.model';
import { VmService } from '../shared/vm.service';
import { GroupsFilterService, noGroup } from './groups-filter/groups-filter.service';
import { GroupingsFilterService } from './groupings-filter/groupings-filter.service';
import { StatesFilterService } from './states-filter/states-filter.service';
import { ZonesFilterService } from './zones-filter/zones-filter.service';


export interface VmFilter {
  selectedGroups: Array<InstanceGroup | noGroup>;
  selectedStates: Array<VmState>;
  selectedZones: Array<Zone>;
  groupings: Array<any>;
}

@Component({
  selector: 'cs-vm-filter',
  templateUrl: 'vm-filter.component.html',
  styleUrls: ['vm-filter.component.scss']
})
export class VmFilterComponent {
  @Input() public availableGroupings: Array<any>;
  @Input() public groups: Array<InstanceGroup>;
  @Input() public zones: Array<Zone>;
  @Output() public updateFilters = new EventEmitter<VmFilter>();

  public selectedGroupings: Array<any>;
  public selectedGroups: Array<InstanceGroup>;
  public selectedZones: Array<Zone>;
  public selectedStates: Array<VmState>;

  private filters = [
    {
      service: this.zonesFilter,
      getSelected: () => this.selectedZones
    },
    {
      service: this.groupsFilter,
      getSelected: () => this.selectedGroups
    },
    {
      service: this.groupingsFilter,
      getSelected: () => this.selectedGroupings
    },
    {
      service: this.statesFilter,
      getSelected: () => this.selectedStates
    }
  ];

  private filtersKey = 'vmListFilters';

  private filterService = new FilterService(
    this.filtersConfig,
    this.router,
    this.storage,
    this.filtersKey,
    this.activatedRoute
  );

  constructor(
    private groupingsFilter: GroupingsFilterService,
    private groupsFilter: GroupsFilterService,
    private statesFilter: StatesFilterService,
    private zonesFilter: ZonesFilterService,

    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: LocalStorageService
  ) {}

  public update(): void {
    this.updateFilters.emit(this.updateFiltersEmitMessage);
    this.filterService.update(this.filtersKey, this.filterServiceUpdateMessage);
  }

  private get filtersConfig(): FilterConfig {
    return this.filters.reduce((acc, filter) => {
      return Object.assign(acc, {
        [filter.service.key]: filter.service.filterConfig
      });
    }, {});
  }

  private get updateFiltersEmitMessage(): any {
    return this.filters.reduce((acc, filter) => {
      return Object.assign(acc, {
        [filter.service.key]: filter.service.getUpdateFiltersEmitMessage(filter.getSelected())
      });
    }, {});
  }

  private get filterServiceUpdateMessage(): any {
    return this.filters.reduce((acc, filter) => {
      return Object.assign(acc, {
        [filter.service.key]: filter.service.stringifyEntities(filter.getSelected())
      });
    }, {});
  }
}
