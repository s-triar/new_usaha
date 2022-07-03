import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    MainNavComponent,
    RouterModule
  ]
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
