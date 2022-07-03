import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCardModule } from '@angular/material/card';
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
    FontAwesomeModule,
    RouterModule,
    ShowCaseRatingComponent
  ]

})
export class ShowCaseItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
