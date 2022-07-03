import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopOverRef } from './pop-over-ref';
import { Event, NavigationStart, Router } from '@angular/router';
import { filter, tap, take } from 'rxjs';

@Component({
  selector: 'app-pop-over',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-over.component.html',
  styleUrls: ['./pop-over.component.scss']
})
export class PopOverComponent implements OnInit {

  contentType!: 'template' | 'string' | 'component';
  // content!: string | TemplateRef<any> | Type<any>;
  content: any;
  context: any;

  constructor(private ref: PopOverRef, private router: Router) {
    this.router.events.pipe(
      filter((event: Event) => event instanceof NavigationStart),
      tap(() => this.ref.detach()),
      take(1)
    ).subscribe();
  }

  close(): void {
    this.ref.close(null);
  }

  ngOnInit(): void {
    this.content = this.ref.content;

    if (typeof this.content === 'string') {
      this.contentType = 'string';
    } else if (this.content instanceof TemplateRef) {
      this.contentType = 'template';
      this.context = {
        close: this.ref.close.bind(this.ref)
      };
    } else {
      this.contentType = 'component';
    }
  }

}