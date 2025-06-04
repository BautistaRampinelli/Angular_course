import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced-defer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './advanced-defer.component.html',
  styleUrl: './advanced-defer.component.scss'
})
export class AdvancedDeferComponent {
 protected dataReady = false;
}
