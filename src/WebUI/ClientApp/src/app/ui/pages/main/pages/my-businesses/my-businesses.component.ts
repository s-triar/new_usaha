import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-businesses',
  templateUrl: './my-businesses.component.html',
  styleUrls: ['./my-businesses.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MyBusinessesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
