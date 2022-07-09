import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ButtonBackDirective } from 'src/app/ui/directives/button-back/button-back.directive';


@Component({
  selector: 'app-nav-page',
  templateUrl: './nav-page.component.html',
  styleUrls: ['./nav-page.component.scss'],
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
    MatIconModule

  ]
})
export class NavPageComponent implements OnInit {
  @Input() replaceUrl = false;
  @Input() linkBack: string|null = null;
  @Input() title!: string;
  @Input() color = '';
  backIcon = 'arrow_back';

  constructor() { }

  ngOnInit(): void {
  }

}
