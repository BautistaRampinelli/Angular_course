import { Component } from '@angular/core';
import { DeferComponent } from './defer/defer.component';

@Component({
  selector: 'app-root',
  imports: [DeferComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-control-flow-syntax';
}
