import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpaceModule } from "ng-zorro-antd/space";
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule, 
    NzLayoutModule,
    NzButtonModule,
    RouterModule,
    NzIconModule,
    NzGridModule,
    NzSpaceModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
