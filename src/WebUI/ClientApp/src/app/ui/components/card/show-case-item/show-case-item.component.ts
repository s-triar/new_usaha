import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { ShowCaseRatingComponent } from '../../utility/show-case-rating/show-case-rating.component';
@Component({
  selector: 'app-show-case-item',
  templateUrl: './show-case-item.component.html',
  styleUrls: ['./show-case-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    ShowCaseRatingComponent
  ]

})
export class ShowCaseItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
