import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.sass'],
})
export class SwitchButtonComponent {
  @Input('value')
  value: boolean = false;

  @Output('valueChange')
  valueChange: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  setValue(newValue: boolean) {
    this.valueChange.emit(newValue);
  }
}
