import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal } from '@angular/core';
import { CharacterService } from '../services/character.service';
import { Character } from '../models';
import { FormArray, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemForm } from '../models/item-form';
import { FormChildComponent } from '../form-child/form-child.component';
import { toSignal } from '@angular/core/rxjs-interop';

export type CustomFormGroup = FormGroup<ItemForm>;

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [ReactiveFormsModule, FormChildComponent],
  templateUrl: './forms-demo.component.html',
  styleUrl: './forms-demo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsDemoComponent {
  CharacterService = inject(CharacterService);
  characters: Signal<Character[] | undefined> = computed(() => this.CharacterService.getFormattedCharacters());

  fb = inject(NonNullableFormBuilder);

  form: FormGroup<{ items: FormArray<CustomFormGroup> }> = this.fb.group({
    items: this.fb.array<CustomFormGroup>([]),
  });

  get items() {
    return this.form.controls.items;
  }

  itemChanges = toSignal(this.form.valueChanges);

  totalValue = computed(() => {
    const value = this.itemChanges()?.items?.reduce((total, item) => total + Number(item?.value) || 0, 0) ?? 0;
    return value;
  });

  addItem() {
    const id = this.items.length + 1;
    const itemForm = this.fb.group<ItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', { validators: [Validators.required] }),
      value: this.fb.control(0, { validators: [Validators.required] }),
    });

    this.form.controls.items.push(itemForm);
  }
}
