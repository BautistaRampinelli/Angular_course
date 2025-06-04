import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsDemoComponent } from './forms-demo/forms-demo.component';
import { DeferComponent } from './defer/defer.component';
import { AdvancedDeferComponent } from './advanced-defer/advanced-defer.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';
import { IfComponent } from './if/if.component';
import { ForComponent } from './for/for.component';
import { SwitchComponent } from './switch/switch.component';
import { DragDropDemoComponent } from './drag-drop-demo/drag-drop-demo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'forms', component: FormsDemoComponent },
  { path: 'defer', component: DeferComponent },
  { path: 'advanced-defer', component: AdvancedDeferComponent },
  { path: 'placeholder', component: PlaceholderComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'if', component: IfComponent },
  { path: 'for', component: ForComponent },
  { path: 'switch', component: SwitchComponent },
  { path: 'drag-drop', component: DragDropDemoComponent },
  { path: '**', redirectTo: '' },
];

