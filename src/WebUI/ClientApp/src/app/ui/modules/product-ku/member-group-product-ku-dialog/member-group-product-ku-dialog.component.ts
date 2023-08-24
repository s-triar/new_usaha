import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';
import { debounceTime, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';
import { currentPageDescription } from 'src/app/core/types';
import { MyGoodsGroupsListMemberItemDto } from 'src/app/domain/backend/Dtos';
import { PaginationComponent } from 'src/app/ui/components/pagination/pagination/pagination.component';

@Component({
  templateUrl: './member-group-product-ku-dialog.component.html',
  styleUrls: ['./member-group-product-ku-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    // FlexLayoutModule
  ]
})
export class MemberGroupProductKuDialogComponent implements OnInit {
  @ViewChild(PaginationComponent, {static: true}) pagination!: PaginationComponent;
  displayedColumns: string[] = ['name'];
  form: FormGroup = this.fb.group({
    Search: [''],
  });
  memberList: MyGoodsGroupsListMemberItemDto[] = [];
  pages: number[] = [1];
  currentPage: currentPageDescription = {
    isCurrentPageStartPage: true,
    isCurrentPageLastPage: true
  };
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberGroupProductKuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public members: MyGoodsGroupsListMemberItemDto[],
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.searchGroupProduct();
    this.form.controls.Search.setValue('', {onlySelf: true});
    this.form.controls.Search.updateValueAndValidity();
  }
  searchGroupProduct(): void{
    this.form.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(x => this.searchMemberForShow())
    )
    .subscribe(x => {
      this.memberList = x;
    });
  }
  searchMemberForShow(): Observable<MyGoodsGroupsListMemberItemDto[]>{
    return of(this.members.filter(x =>
        x.id.includes(this.form.controls.Search.value) ||
        x.name.includes(this.form.controls.Search.value)
      ));
  }
}
