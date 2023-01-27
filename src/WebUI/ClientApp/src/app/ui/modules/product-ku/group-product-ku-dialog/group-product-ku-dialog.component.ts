import { CommonModule } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { currentPageDescription } from 'src/app/core/types';
import { MyGoodsGroupsListItemDto, MyGoodsGroupsListContainerDto } from 'src/app/domain/backend/Dtos';
import { MyGoodsGroupService } from 'src/app/infrastructure/backend/my-goods-group.service';
import { PaginationComponent, PageSizeChangedEvent, PageNumberChangedEvent } from 'src/app/ui/components/pagination/pagination/pagination.component';
import { AddGroupProductKuDialogComponent } from '../add-group-product-ku-dialog/add-group-product-ku-dialog.component';
import { MemberGroupProductKuDialogComponent } from '../member-group-product-ku-dialog/member-group-product-ku-dialog.component';

type MyGoodsGroupsListItemChoiceDto= MyGoodsGroupsListItemDto&{
  selected: boolean;
};

@Component({
  templateUrl: './group-product-ku-dialog.component.html',
  styleUrls: ['./group-product-ku-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    PaginationComponent,
    // FlexLayoutModule
  ],
})
export class GroupProductKuDialogComponent implements OnInit {
  @ViewChild(PaginationComponent, {static: true}) pagination!: PaginationComponent;
  // @Input() groupSelected: MyGoodsGroupsListItemDto[] = [];

  displayedColumns: string[] = [ 'name', 'id'];
  form: FormGroup = this.fb.group({
    Search: [''],
    PageSize: [6],
    PageNumber: [1]
  });
  groupList: MyGoodsGroupsListItemChoiceDto[] = [];
  pages: number[] = [1];
  currentPage: currentPageDescription = {
    isCurrentPageStartPage: true,
    isCurrentPageLastPage: true
  };
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GroupProductKuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public groupSelected: MyGoodsGroupsListItemDto[],
    private dialog: MatDialog,
    private readonly goodsGroupService: MyGoodsGroupService
  ) { }

  ngOnInit(): void {
    this.searchGroupProduct();
    this.setPaginationConfig();
    this.form.controls.Search.setValue('', {onlySelf: true});
    this.form.controls.Search.updateValueAndValidity();
  }
  searchGroupProduct(): void{
    this.form.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(x => this.callSearchProductApi())
    )
    .subscribe(x => {
      this.mappingDtoToVar(x);
      this.pagination.setPagesNumbers(x.totalPages);
    });
  }
  mappingDtoToVar(x: MyGoodsGroupsListContainerDto): void{
    this.groupList = x.items.map(y => {
      const temp: MyGoodsGroupsListItemChoiceDto = {
        ...y,
        selected: this.groupSelected.find(z => y.id === z.id) ? true : false
      };
      return temp;
    });
    this.pages = [];
    for (let i = 0; i < x.totalPages; i++){
      this.pages.push(i + 1);
    }
  }
  callSearchProductApi(): Observable<MyGoodsGroupsListContainerDto>{
    return this.goodsGroupService.getMyGoodsGroup({
      Search: this.form.controls.Search.value,
      PageNumber: this.form.controls.PageNumber.value,
      PageSize: this.form.controls.PageSize.value
    });
  }
  setPaginationConfig(): void{
    this.pagination.setPageSize(this.form.controls.PageSize.value);
    this.pagination.setPagesNumbers(this.form.controls.PageNumber.value);
  }
  paginationNChanged(event: PageSizeChangedEvent): void{
    this.form.controls.PageSize.setValue(event.pageSize);
    this.form.updateValueAndValidity();
  }

  pageSelectedChanged(event: PageNumberChangedEvent): void{
    this.form.controls.PageNumber.setValue(event.pageNumber);
    this.form.updateValueAndValidity();
  }
  selectGroup(id: string): void{
    const temp = this.groupList.find(x => x.id === id);
    if (temp){
      this.groupSelected.push({id: temp.id, name: temp.name, members: temp.members});
    }
    this.reRenderGroupList();
  }
  reRenderGroupList(): void{
    this.groupList = this.groupList.map(y => {
      const temp: MyGoodsGroupsListItemChoiceDto = {
        ...y,
        selected: this.groupSelected.find(z => y.id === z.id) ? true : false
      };
      return temp;
    });
  }
  unselectGroup(id: string): void{
    const index = this.groupSelected.findIndex(x => x.id === id);
    this.groupSelected.splice(index, 1);
    this.reRenderGroupList();
  }
  showMemberDialog(id: string): void{
    const temp = this.groupList.find(x => x.id === id);
    this.dialog.open(MemberGroupProductKuDialogComponent,
      {
        data: temp && temp.members.length > 0 ? temp.members : [],
        maxWidth: '480px',
        width: '80%',
        disableClose: true
      })
      .afterClosed().subscribe();
  }
  openDialogAddGroup(): void{
    this.dialog.open(AddGroupProductKuDialogComponent,
      {data: [], hasBackdrop: true, maxWidth: '480px', width: '80%', disableClose: true })
    .afterClosed()
    .pipe(switchMap(x => this.callSearchProductApi()))
    .subscribe(x => {
      this.mappingDtoToVar(x);
      this.pagination.setPagesNumbers(x.totalPages);
    });
  }
  close(): void{
    this.dialogRef.close(this.groupSelected);
  }
}
