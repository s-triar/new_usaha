import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { faStepBackward, faStepForward, faFastBackward, faFastForward } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


export type currentPageDescription = {
  isCurrentPageStartPage: boolean;
  isCurrentPageLastPage: boolean;
};
export type PageNumberChangedEvent = {
  pageNumber: number
};
export type PageSizeChangedEvent = {
  pageSize: number
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
    FontAwesomeModule
  ]
})
export class PaginationComponent implements OnInit {
  @Input() pageSize = 20;
  @Input() pageNumber = 1;
  @Output() pageSelectedChanged: EventEmitter<PageNumberChangedEvent> = new EventEmitter<PageNumberChangedEvent>();
  @Output() nPageChanged: EventEmitter<PageSizeChangedEvent> = new EventEmitter<PageSizeChangedEvent>();
  iconBack = faStepBackward;
  iconFullBack = faFastBackward;
  iconForward = faStepForward;
  iconFullForward = faFastForward;
  currentPage: currentPageDescription = {
    isCurrentPageStartPage: true,
    isCurrentPageLastPage: true
  };
  formSearch = this.formBuilder.group({
    PageSize: this.formBuilder.nonNullable.control(this.pageSize),
    PageNumber: this.formBuilder.nonNullable.control(this.pageNumber)
  });
  pages: number[] = [1];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formSearch.controls.PageNumber.valueChanges
        .subscribe(x => {
          this.pageSelectedChanged.emit({pageNumber: x});
        });
    this.formSearch.controls.PageSize.valueChanges
        .subscribe(x => {
          this.nPageChanged.emit({pageSize: x});
        });
  }
  setPagesNumbers(ns: number): void{
    const temp: number[] = [];
    for (let i = 0; i < ns; i++){
      temp.push(i + 1);
    }
    this.pages = temp;
    this.checkCurrentPagePos();
  }
  setPageSize(n: number): void{
    this.formSearch.controls.PageSize.setValue(n);
  }

  private switchCurrentPageDescription(s: boolean, l: boolean): void{
    this.currentPage.isCurrentPageStartPage = s;
    this.currentPage.isCurrentPageLastPage = l;
  }
  checkCurrentPagePos(): void{
    const index = this.getCurrentPageIndex();
    if (index === 0 && index === (this.pages.length - 1)){
      this.switchCurrentPageDescription(true, true);
    }
    else if (index === 0){
      this.switchCurrentPageDescription(true, false);
    }
    else if (index === (this.pages.length - 1)){
      this.switchCurrentPageDescription(false, true);
    }else{
      this.switchCurrentPageDescription(false, false);
    }
  }
  getCurrentPageIndex(): number{
    // const currentPage = parseInt(this.formSearch.controls.PageNumber.value, 10);
    const currentPage = this.formSearch.controls.PageNumber.value;
    const currentPageIndex = this.pages.findIndex(x => x === currentPage);
    return currentPageIndex;
  }
  setPageValue(v: number): void{
    this.formSearch.controls.PageNumber.setValue(v, {
      onlySelf: true
    });
    this.formSearch.controls.PageNumber.updateValueAndValidity();
    this.checkCurrentPagePos();

  }
  nextPage(): void{
    if (!this.currentPage.isCurrentPageLastPage){
      const v = this.pages[this.getCurrentPageIndex() + 1];
      this.setPageValue(v);
    }
  }

  fastNextPage(): void{
    const v = this.pages[this.pages.length - 1];
    this.setPageValue(v);
  }
  previousPage(): void{
    if (!this.currentPage.isCurrentPageStartPage){
      const v = this.pages[this.getCurrentPageIndex() - 1];
      this.setPageValue(v);
    }
  }
  fastPreviousPage(): void{
    const v = this.pages[0];
    this.setPageValue(v);
  }
  selectPage(event: MatSelectChange): void{
    this.setPageValue(parseInt(event.value, 10));
  }
}