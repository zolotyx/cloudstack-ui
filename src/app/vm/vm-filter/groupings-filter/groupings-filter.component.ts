import { Component, forwardRef, Input, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GroupingsFilterService } from './groupings-filter.service';


@Component({
  selector: 'cs-groupings-filter',
  templateUrl: 'groupings-filter.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupingsFilterComponent),
      multi: true
    }
  ]
})
export class GroupingsFilterComponent implements ControlValueAccessor {
  @Input() public availableGroupings: Array<any>;
  public _selectedGroupings: Array<any>;

  constructor(public groupingsFilterService: GroupingsFilterService) {}

  @Input() public get selectedGroupings(): Array<any> {
    return this._selectedGroupings;
  }

  public set selectedGroupings(groupings: Array<any>) {
    this._selectedGroupings = groupings;
    this.update();
  }

  public writeValue(value): void {
    if (value) {
      this.selectedGroupings = value;
    }
  }

  public propagateChange: any = () => {};
  public registerOnTouched(): any {}

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  private update(): void {
    this.selectedGroupings = this.groupingsFilterService.getSelectedEntities(this.availableGroupings);

    this.availableGroupings = this.groupingsFilterService.sortAvailableGroupings(
      this.availableGroupings,
      this.selectedGroupings
    );
  }
}
