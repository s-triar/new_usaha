import { Component, Input, OnInit } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DataNavList } from 'src/app/shared/interfaces';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';

@Component({
  selector: 'app-main-toolbar-footer',
  templateUrl: './main-toolbar-footer.component.html',
  styleUrls: ['./main-toolbar-footer.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    PortalContainerComponent,
    MatButtonModule,
    MatIconModule
  ]
})
export class MainToolbarFooterComponent implements OnInit {
  @Input()
  navList!: DataNavList[] ;
  constructor() { }

  ngOnInit(): void {
  }

}
