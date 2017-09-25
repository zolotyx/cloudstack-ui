import { Component, Inject, OnInit } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

import {
  TableDatabase,
  TableDataSource
} from '../../../../../shared/components/table/table';
import { Volume } from '../../../../../shared/models';
import { SnapshotActionsService } from '../../../../../snapshot/snapshot-actions.service';
import { WithUnsubscribe } from '../../../../../utils/mixins/with-unsubscribe';
import { SnapshotService } from '../../../../../shared/services/snapshot.service';

@Component({
  selector: 'cs-snapshot-modal',
  templateUrl: 'snapshot-modal.component.html',
  styleUrls: ['snapshot-modal.component.scss']
})
export class SnapshotModalComponent extends WithUnsubscribe() implements OnInit {
  public displayedColumns = ['name', 'date', 'actions'];
  public dataBase = new TableDatabase(this.volume.snapshots);
  public dataSource: TableDataSource | null;

  constructor(
    private dialogRef: MdDialogRef<SnapshotModalComponent>,
    private snapshotService: SnapshotService,
    public snapshotActionsService: SnapshotActionsService,
    @Inject(MD_DIALOG_DATA) public volume: Volume
  ) {
    super();
  }

  public ngOnInit() {
    this.dataSource = new TableDataSource(this.dataBase);
    this.snapshotService.onSnapshotDeleted
      .takeUntil(this.unsubscribe$)
      .subscribe(snapshot => {
        this.volume.snapshots = this.volume.snapshots.filter(_ => _.id !== snapshot.id);
        this.dataBase.update(this.volume.snapshots);
        if (!this.volume.snapshots.length) {
          this.dialogRef.close();
        }
      });
  }
}
