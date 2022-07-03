import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataNavList } from 'src/app/shared/interfaces';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';

@Component({
  selector: 'app-main-toolbar-header',
  templateUrl: './main-toolbar-header.component.html',
  styleUrls: ['./main-toolbar-header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    PortalContainerComponent,
    MatButtonModule,
    MatIconModule,
  ]
})
export class MainToolbarHeaderComponent implements OnInit {
  @Input()
  navList!: DataNavList[] ;
  constructor() { }

  ngOnInit(): void {
  }

}
