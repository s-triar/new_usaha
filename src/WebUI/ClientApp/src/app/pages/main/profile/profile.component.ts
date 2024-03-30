import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
    NzIconModule,
    NzButtonModule,
    NzDescriptionsModule,
    NzCardModule,
    NzListModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  host:{
    'class':'app-page-container-top-bottom main',
    ngSkipHydration: 'true',
  }
})
export class ProfileComponent {
  
 

}
