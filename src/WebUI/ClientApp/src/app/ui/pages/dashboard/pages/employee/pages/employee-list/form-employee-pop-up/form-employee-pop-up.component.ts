import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyOptionModule as MatOptionModule } from '@angular/material/legacy-core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { catchError, debounce, debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import { EnterpriseRoleDto, UserMinimalInfo } from 'src/app/domain/backend/Dtos';
import { EmployeeService } from 'src/app/ui/pages/dashboard/pages/employee/employee.service';
import { RoleService } from 'src/app/ui/pages/dashboard/pages/employee/role.service';
import { PopUpConfirmationService } from 'src/app/ui/components/pop-up/pop-up-confirmation/pop-up-confirmation.service';
import { EmployeeEmailValidator } from '../../../../../../../../core/form-validators/EmployeeEmailValidator';
import {MatLegacyAutocompleteModule as MatAutocompleteModule, MatLegacyAutocompleteSelectedEvent as MatAutocompleteSelectedEvent} from '@angular/material/legacy-autocomplete';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { PopUpNotifComponent } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.component';
import { PopUpConfirmationComponent } from 'src/app/ui/components/pop-up/pop-up-confirmation/pop-up-confirmation.component';

export type FormEmployeeData= {
  id: null|string;
  mode: "create"|"read"|"update"|"delete"
};

@UntilDestroy()
@Component({
  templateUrl: './form-employee-pop-up.component.html',
  styleUrls: ['./form-employee-pop-up.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    PopUpNotifComponent,
    PopUpConfirmationComponent,
    FormsModule,
    MatDialogModule
  ]
})
export class FormEmployeePopUpComponent implements OnInit {
  // TODO Pakai EnterpriseRoleName saja
  form = this.formBuilder.group({
    Id: this.formBuilder.control(''),
    Email: this.formBuilder.nonNullable.control('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [EmployeeEmailValidator.validate(this.employeeService)],
    }),
    Name:this.formBuilder.control(''),
    EnterpriseRoleName: this.formBuilder.nonNullable.control('', [Validators.required])
  });
  listRole!: Observable<EnterpriseRoleDto[]>;
  get Email(): AbstractControl|null{
    return this.form.get('Email');
  }
  get Name(): AbstractControl|null{
    return this.form.get('Name');
  }
  get EnterpriseRoleName(): AbstractControl|null{
    return this.form.get('EnterpriseRoleName');
  }
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: FormEmployeeData,
    private confirmService: PopUpConfirmationService,
    private notifService: PopUpNotifService,
    private employeeService: EmployeeService,
    private roleService: RoleService
  ) { }

  ngOnInit(): void {
    if(this.data.id!==null){
      this.form.controls.Id.setValue(this.data.id);
      this.employeeService.getDetailEnterpriseEmployee({Id:this.data.id})
          .subscribe(x=>{
            this.form.patchValue({
              Email:x.email,
              EnterpriseRoleName:x.enterpriseRoleName,
              Id:x.employeeId,
              Name:x.name
            });
            this.form.updateValueAndValidity();
          });
    }
    if(this.data.id===null){
      console.log("regis email change");
      
      this.form.controls.Email.valueChanges
        .pipe(
          untilDestroyed(this),
          distinctUntilChanged(),
          debounceTime(1000),
          switchMap(x=> this.employeeService.getCandidateEmployee({CandidateEmployeeEmail: x})),
          catchError(x=>null),
          map(x=>{
            if(x===null){
              const t: UserMinimalInfo ={
                name:"",
                id:"",
                email:""
              }
              return t;
            }
            return x;
          }),
        ).subscribe((x:UserMinimalInfo)=> {
          console.log(x);
          
          this.form.controls.Name.setValue(x.name);
          this.form.updateValueAndValidity();
          console.log(this.form.value);
        })
    }
    this.listRole = this.roleService.getEnterpriseRoleList({Search: ''});
    this.form.controls.EnterpriseRoleName.valueChanges
      .pipe(
        untilDestroyed(this),
        map(x=>x.toLowerCase())
      ).subscribe(
        x=> this.searchRole(x)
      );
  }
  searchRole(val:string): void{
    this.listRole = this.roleService.getEnterpriseRoleList({Search: val});
  }
  selectRespectiveAPI(formVal:any):Observable<string>{
    let val:Observable<string> = of("");
    switch (this.data.mode) {
      case 'create':
        val = this.employeeService.createEmployee(formVal);
        break;
      case 'update':
          val = this.employeeService.updateEmployee(formVal);
          break;
      case 'delete':
          val = this.employeeService.deleteEmployee(formVal);
            break;
      default:
        break;
      }
    return val;
  }
  constructFormValueBasedOnMode(mode):Observable<any>{
    let val:any=null;
    switch (mode) {
      case 'create':
        val = this.form.value;
        delete val['Id'];
        delete val['Name'];
        break;
      case 'update':
          val = this.form.value;
          delete val['Id'];
          delete val['Email'];
          delete val['Name'];
          break;
      case 'delete':
            val = this.form.value;
            delete val['EnterpriseRoleName'];
            delete val['Email'];
            delete val['Name'];
            break;
      default:
        break;
      }
    return of(val);
  }
  submitForm(): void{
    if(this.form.valid){
      of(this.data.mode)
        .pipe(
          untilDestroyed(this),
          switchMap(x=>this.constructFormValueBasedOnMode(x)),
          switchMap(x=>this.selectRespectiveAPI(x)),
          switchMap(x=>this.notifService.show({message: 'Karyawan berhasil ditambah.', title: 'Sukses', type: 'success'}).afterClosed())
        )
        .subscribe(x=>
          this.dialog.closeAll()
          
        );
    }
  }

}
