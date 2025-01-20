import { Component } from '@angular/core';

@Component({
  selector: 'app-for',
  standalone: true,
  imports: [],
  templateUrl: './for.component.html',
  styleUrl: './for.component.scss'
})
export class ForComponent {
 names: string[] = ["Maxi", "Gabi", "Carlos"];
}
