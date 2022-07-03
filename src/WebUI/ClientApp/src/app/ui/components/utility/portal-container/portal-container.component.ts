import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkPortal, DomPortalOutlet, PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-portal-container',
  standalone: true,
  imports: [CommonModule, PortalModule],
  templateUrl: './portal-container.component.html',
  styleUrls: ['./portal-container.component.scss'],
})
export class PortalContainerComponent implements AfterViewInit, OnDestroy {
  @Input()
  querySelector!: string;
  @ViewChild(CdkPortal)
  portal!: CdkPortal;
  host!: DomPortalOutlet;

  constructor() {}

  ngOnDestroy(): void {
    if (!!this.host) {
      this.host.detach();
    }
  }
  ngAfterViewInit(): void {
    const d = document.querySelector(this.querySelector);
    if (!!d) {
      this.host = new DomPortalOutlet(d);
      this.host.attach(this.portal);
    }
  }
}
