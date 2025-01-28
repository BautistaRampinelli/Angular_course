import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ItemForm } from '../app.component';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomInputComponent),
    multi: true,
  }]
})
export class CustomInputComponent implements ControlValueAccessor{
  control = input.required<FormControl<any>>();

  onTouched = () => {};
  onChange = (_value: any) => {};



  writeValue(value: any): void {
      if (value !==  this.control().value) {
        this.control().setValue(value, {emitEvent: false});
      }
  }

  registerOnChange(fn: any): void {
      this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
      this.onTouched = fn;
  }
}
