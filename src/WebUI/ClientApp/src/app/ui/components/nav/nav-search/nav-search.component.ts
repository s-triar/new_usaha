import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faArrowLeft, faFilter } from '@fortawesome/free-solid-svg-icons';
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
    MatIconModule,
  ]

})
export class NavSearchComponent implements OnInit {
  @Input() replaceUrl = false;
  @Input() linkBack: string|null = null;
  @Input() title!: string;
  @Input() color = '';
  backIcon = 'arrow_back';
  iconFilter = 'filter_alt';
  constructor() { }

  ngOnInit(): void {
  }

}
