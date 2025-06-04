import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './placeholder.component.html',
  styleUrl: './placeholder.component.scss'
})
export class PlaceholderComponent {
  isImageVisible = false;
  showImage() {
    setTimeout(() => {
      this.isImageVisible = true;
    }, 4000);
  }
}
