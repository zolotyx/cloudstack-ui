import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Zone } from '../../shared/models/zone.model';
import { VmFilter } from '../../vm/vm-filter/vm-filter.component';


export interface SpareDriveFilter {
  spareOnly: boolean;
  selectedZones: Array<Zone>;
  groupings: Array<any>;
}

@Component({
  selector: 'cs-spare-drive-filter',
  templateUrl: 'spare-drive-filter.component.html',
  styleUrls: ['spare-drive-filter.component.scss']
})
export class SpareDriveFilterComponent {
  @Input() public availableGroupings: Array<any>;
  @Input() public zones: Array<Zone>;
  @Output() public updateFilters = new EventEmitter<VmFilter>();

  public selectedZones: Array<Zone> = [];
  public selectedGroupings: Array<any> = [];

}
