import { FilterItemConfig, FilterService } from '../../shared/services/filter.service';
import { Injectable } from '@angular/core';


@Injectable()
export abstract class Filter<M> {
  public abstract key: string;

  constructor(protected filterService: FilterService) {}

  public abstract get filterConfig(): FilterItemConfig;

  public get paramsEntities(): Array<string> {
    return this.filterService.getParams(this.key, { [this.key]: this.filterConfig })[this.key];
  }

  public abstract getSelectedEntities(entities: Array<M>): void;

  public abstract stringifyEntities(entities: Array<any>): Array<string>;

  public abstract getUpdateFiltersEmitMessage(zones: Array<any>): Array<any>;
}
