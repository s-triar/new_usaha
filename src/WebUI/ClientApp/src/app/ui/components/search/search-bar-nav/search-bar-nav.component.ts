import { CdkConnectedOverlay, CdkOverlayOrigin, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { PortalContainerComponent } from '../../utility/portal-container/portal-container.component';
@Component({
  selector: 'app-search-bar-nav',
  templateUrl: './search-bar-nav.component.html',
  styleUrls: ['./search-bar-nav.component.scss'],
  standalone:true,
  imports:[
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    PortalContainerComponent
  ]
})
export class SearchBarNavComponent implements OnInit {
  @Input() isFeature = false;
  isScannerOpen = false;
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;
  constructor(private overlay: Overlay){

  }

  ngOnInit(): void {
    console.log(this.isFeature, 'feature?');



    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  openScanner(): void{
    if (this.isFeature === false){
      alert('main scanner');
    }
    this.isScannerOpen = !this.isScannerOpen;

  }
}
