import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent implements OnInit{
  isContentReady = false;

  ngOnInit(){
    setTimeout(() => {
      this.isContentReady = true;
    }, 4000)
  };



}
