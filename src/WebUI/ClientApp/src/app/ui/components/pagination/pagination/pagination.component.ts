import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatLegacySelectChange as MatSelectChange, MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatIconModule } from '@angular/material/icon';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
// import { faStepBackward, faStepForward, faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export type currentPageDescription = {
  isCurrentPageStartPage: boolean;
  isCurrentPageLastPage: boolean;
};
export type PageNumberChangedEvent = {
  pageNumber: number;
};
export type PageSizeChangedEvent = {
  pageSize: number;
};

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
  ],
})
export class PaginationComponent implements OnInit {
  @Input() pageSize = 20;
  @Input() pageNumber = 1;

  iconBack = 'arrow_back_ios';
  iconFullBack = 'first_page';
  iconForward = 'arrow_forward_ios';
  iconFullForward = 'last_page';

  formSearch = this.formBuilder.group({
    PageSize: this.formBuilder.nonNullable.control(this.pageSize),
    PageNumber: this.formBuilder.nonNullable.control(this.pageNumber),
    Pages: this.formBuilder.nonNullable.array([1])
  });
  @Output() pageSelectedChanged: Observable<PageNumberChangedEvent> =
    this.formSearch.controls.PageNumber.valueChanges.pipe(
      startWith(this.pageNumber),
      map((x) => {
        return { pageNumber: x };
      })
    );

  @Output() nPageChanged: Observable<PageSizeChangedEvent> =
    this.formSearch.controls.PageSize.valueChanges.pipe(
      startWith(this.pageSize),
      map((x) => {
        return { pageSize: x };
      })
    );
  
  formChanges$ =this.formSearch.valueChanges.pipe(
    startWith(this.formSearch.value),
    distinctUntilChanged(),
    shareReplay({refCount:true,bufferSize:1})
  )
  isFirstPage$ = this.formChanges$.pipe(
    map(x=>{
      const indx = x.Pages.findIndex(y=>y === x.PageNumber)
      return indx === 0;
    }),
    shareReplay({refCount:true, bufferSize:1})
  );
  isLastPage$ = this.formChanges$.pipe(
    map(x=>{
      const indx = x.Pages.findIndex(y=>y === x.PageNumber)   
      return indx === x.Pages.length-1;
    }),
    shareReplay({refCount:true, bufferSize:1})
  )
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.setPagesNumbers(this.pageNumber);
  }

  setPagesNumbers(ns: number): void {  
    if (this.formSearch.controls.Pages.length !== ns) {
      this.pageNumber = ns;
      this.formSearch.controls.Pages.clear();
      for (let i = 0; i < ns; i++) {
        this.formSearch.controls.Pages.push(new FormControl(i+1));
      }
    }
  }

  setPageSize(n: number): void {
    this.formSearch.controls.PageSize.setValue(n);
  }
  setPageValue(v: number): void {
    this.formSearch.controls.PageNumber.setValue(v);
  }
  // button click
  nextPage(): void {
     this.setPageValue(this.formSearch.controls.PageNumber.value + 1);
  }
  fastNextPage(): void {
    this.setPageValue(this.formSearch.controls.Pages.length);
  }
  previousPage(): void {
    this.setPageValue(this.formSearch.controls.PageNumber.value - 1);
  }
  fastPreviousPage(): void {
    this.setPageValue(1);
  }
  // end button click

  selectPage(event: MatSelectChange): void {
    this.setPageValue(parseInt(event.value, 10));
  }
}
