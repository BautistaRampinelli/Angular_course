import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{
  isContentReady = false;
  isContentReadyError = false;
  ngOnInit(): void {
      setTimeout(() => {
        this.isContentReady = true;
      }, 3000)

      setTimeout(() => {
        throw new Error('Simulated load error')
      }, 3000)
  }

}

