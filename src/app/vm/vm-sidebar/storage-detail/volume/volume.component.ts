import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MdDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { DiskOffering, Volume, VolumeType, Zone, } from '../../../../shared';
import { DiskOfferingService } from '../../../../shared/services/disk-offering.service';
import { StatsUpdateService } from '../../../../shared/services/stats-update.service';
import { ZoneService } from '../../../../shared/services/zone.service';
import { RecurringSnapshotsComponent } from '../../../../snapshot/recurring-snapshots/recurring-snapshots.component';
import { VolumeResizeComponent } from '../../volume-resize/volume-resize.component';

import { SnapshotCreationComponent } from './snapshot-creation/snapshot-creation.component';


@Component({
  selector: 'cs-volume',
  templateUrl: 'volume.component.html',
  styleUrls: ['volume.component.scss'],
})
export class VolumeComponent implements OnInit {
  @Input() public volume: Volume;
  @Output() public onDetach = new EventEmitter();
  @Output() public onResize = new EventEmitter();

  public expandDetails: boolean;
  private _loading = false;

  public get loading(): boolean {
    return this._loading || this.volume['loading'];
  }

  public ngOnInit(): void {
    this.expandDetails = false;
  }

  public get showAttachmentActions(): boolean {
    return this.volume.type === VolumeType.DATADISK;
  }

  public toggleDetails(): void {
    this.expandDetails = !this.expandDetails;
  }

  public detach(): void {
    this.onDetach.emit(this.volume);
  }
}
