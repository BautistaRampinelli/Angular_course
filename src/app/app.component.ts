import { map } from 'rxjs';
import { CharacterService } from './services/character.service';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, Signal } from '@angular/core';
import { DeferComponent } from './defer/defer.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { LoadingComponent } from './loading/loading.component';
import { AdvancedDeferComponent } from './advanced-defer/advanced-defer.component';
import { Character } from './models';
import { FormArray, FormBuilder, FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormChildComponent } from './form-child/form-child.component';
import { toSignal } from '@angular/core/rxjs-interop';

export interface ItemForm {
  id: FormControl<number>,
  name: FormControl<string>,
  value: FormControl<number>
}

export type CustomFormGroup = FormGroup<ItemForm>;

@Component({
  selector: 'app-root',
  imports: [DeferComponent, PlaceholderComponent, LoadingComponent, AdvancedDeferComponent, ReactiveFormsModule, FormChildComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
  CharacterService = inject(CharacterService)
  characters: Signal<Character[] | undefined> =  computed(() => this.CharacterService.getFormattedCharacters());

  // forms
  fb = inject(NonNullableFormBuilder);

  form: FormGroup<{items: FormArray<CustomFormGroup>}> = this.fb.group({
    items: this.fb.array<CustomFormGroup>([]),
  })

  get items() {
    return this.form.controls.items;
  }

  itemChanges = toSignal(this.form.valueChanges);

  totalValue = computed(() => {
    const value = this.itemChanges()?.items?.reduce((total, item) => total + (Number(item?.value)) || 0, 0)
    console.log('Computing total value: ', value);
    return value;
  })


  addItem() {
    const id = this.items.length + 1;
    const itemForm = this.fb.group<ItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', {validators: [Validators.required]}),
      value: this.fb.control(0, {validators: [Validators.required]}),
    })

  this.form.controls.items.push(itemForm);

  }


}
