import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
import { ButtonBackDirective } from 'src/app/ui/directives/button-back/button-back.directive';

@Component({
  selector: 'app-nav-search',
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    ButtonBackDirective,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    FontAwesomeModule,
  ]

})
export class NavSearchComponent implements OnInit {
  @Input() replaceUrl = false;
  @Input() linkBack: string|null = null;
  @Input() title!: string;
  @Input() color = '';
  backIcon = faArrowLeft;
  iconFilter = faFilter;
  constructor() { }

  ngOnInit(): void {
  }

}
