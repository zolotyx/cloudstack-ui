import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { VmState } from '../../shared/vm.model';
import { StatesFilterService } from './states-filter.service';


@Component({
  selector: 'cs-states-filter',
  templateUrl: 'states-filter.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatesFilterComponent),
      multi: true
    }
  ]
})
export class StatesFilterComponent implements ControlValueAccessor {
  public _selectedStates: Array<VmState>;

  constructor(public statesFilterService: StatesFilterService) {}

  @Input() public get selectedStates(): Array<VmState> {
    return this._selectedStates;
  }

  public set selectedStates(states: Array<VmState>) {
    this._selectedStates = states;
    this.update();
  }

  public writeValue(value): void {
    if (value) {
      this.selectedStates = value;
    }
  }

  public propagateChange: any = () => {};
  public registerOnTouched(): any {}

  public registerOnChange(fn): void {
    this.propagateChange = fn;
  }

  private update(): void {
    this.selectedStates = this.statesFilterService.getSelectedEntities();
  }
}
