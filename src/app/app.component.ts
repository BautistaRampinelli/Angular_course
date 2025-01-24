import { CharacterService } from './services/character.service';
import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { DeferComponent } from './defer/defer.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { LoadingComponent } from './loading/loading.component';
import { AdvancedDeferComponent } from './advanced-defer/advanced-defer.component';
import { Character } from './models';

@Component({
  selector: 'app-root',
  imports: [DeferComponent, PlaceholderComponent, LoadingComponent, AdvancedDeferComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
  CharacterService = inject(CharacterService)
  characters: Signal<Character[] | undefined> =  computed(() => this.CharacterService.getFormattedCharacters());
}
