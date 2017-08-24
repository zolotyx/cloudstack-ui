import { Injectable } from '@angular/core';
import { Zone } from '../../../shared/models/zone.model';
import { FilterItemConfig, FilterType } from '../../../shared/services/filter.service';
import { Filter } from '../filter';
import * as sortBy from 'lodash/sortBy';


@Injectable()
export class ZonesFilterService extends Filter<Zone> {
  public key = 'zones';
  public type: FilterType = 'array';
  public defaultOption = [];

  public get filterConfig(): FilterItemConfig {
    return {
      type: this.type,
      defaultOption: this.defaultOption
    };
  }

  public getSelectedEntities(zones: Array<Zone>): Array<Zone> {
     return zones.filter(zone =>
      this.paramsEntities.find(id => id === zone.id)
    );
  }

  public stringifyEntities(zones: Array<any>): Array<string> {
    return zones.map(zone => zone.id);
  }

  public getUpdateFiltersEmitMessage(zones: Array<any>): Array<any> {
    sortBy(zones, 'name');
    return zones;
  }
}
