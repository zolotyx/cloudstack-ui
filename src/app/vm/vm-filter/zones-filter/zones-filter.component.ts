import { Component, forwardRef, Input } from '@angular/core';
import { Zone } from '../../../shared/models/zone.model';
import { ZonesFilterService } from './zones-filter.service';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'cs-zones-filter',
  templateUrl: 'zones-filter.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZonesFilterComponent),
      multi: true
    }
  ]
})
export class ZonesFilterComponent implements ControlValueAccessor {
  @Input() public zones: Array<Zone>;
  public _selectedZones: Array<Zone>;

  constructor(public zoneFilterService: ZonesFilterService) {}

  @Input() public get selectedZones(): Array<Zone> {
    return this._selectedZones;
  }

  public set selectedZones(states: Array<Zone>) {
    this._selectedZones = states;
    this.update();
  }

  public writeValue(value): void {
    if (value) {
      this.selectedZones = value;
    }
  }

  public propagateChange: any = () => {};
  public registerOnTouched(): any {}

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  private update(): void {
    this.selectedZones = this.zoneFilterService.getSelectedEntities(this.zones);
  }
}
