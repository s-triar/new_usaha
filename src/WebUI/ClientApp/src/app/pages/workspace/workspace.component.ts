import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzIconModule,
    NzButtonModule,
    NzMenuModule
  ],
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.scss'
})
export class WorkspaceComponent {
  isCollapsed= signal<boolean>(false);

  siderCollapseChange(data: boolean):void{
    this.isCollapsed.update((prev)=>data);
  }

  toggleCollapse():void{
    this.isCollapsed.update((prev)=>!prev);
  }
}
