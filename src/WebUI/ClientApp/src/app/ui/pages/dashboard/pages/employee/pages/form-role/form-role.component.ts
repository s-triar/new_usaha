import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatLegacyCheckbox as MatCheckbox, MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DuplicateRoleNameValidator } from '../../../../../../../core/form-validators/DuplicateRoleNameValidator';
import { CommonModule, Location } from '@angular/common';
import { PortalContainerComponent } from 'src/app/ui/components/utility/portal-container/portal-container.component';
import { NavPageComponent } from 'src/app/ui/components/nav/nav-page/nav-page.component';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { ButtonBackDirective } from 'src/app/ui/directives/button-back/button-back.directive';
import { EnterpriseClaimDto, EnterpriseRoleDetailDto } from 'src/app/domain/backend/Dtos';
import { RoleService } from 'src/app/ui/pages/dashboard/pages/employee/role.service';
import { DashboardStateService } from 'src/app/ui/pages/dashboard/components/dashboard-nav/dashboard-state.service';
import { PopUpConfirmationService } from 'src/app/ui/components/pop-up/pop-up-confirmation/pop-up-confirmation.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { PopUpConfirmationComponent } from 'src/app/ui/components/pop-up/pop-up-confirmation/pop-up-confirmation.component';
import { PopUpNotifComponent } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.component';

export type ContextType = {
  [key: string]: FeatureType;
};
export type FeatureType = {
  [key: string]: ActionType;
};
export type ActionType = {
  [key: string]: {
    id: string;
    description: string;
  }
};
export type CheckedStatus= {
  [key: string]: 'checked'|'indeterminated'|null
};
export type CheckedStatusChild= {
  [key: string]: CheckedStatus
};

@UntilDestroy()
@Component({
  templateUrl: './form-role.component.html',
  styleUrls: ['./form-role.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalContainerComponent,
    NavPageComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    ButtonBackDirective,
    PopUpConfirmationComponent,
    PopUpNotifComponent
  ]
})
export class FormRoleComponent implements OnInit {
  form!: FormGroup;
  mode: 'add'|'info'|'edit' = 'add';
  claimTree!: ContextType;
  claimTreeCheckStatus!: CheckedStatus;
  claimTreeCheckStatusChild!: CheckedStatusChild;
  data!: EnterpriseRoleDetailDto;
  constructor(
    private readonly routes: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dashboardStateService: DashboardStateService,
    private roleService: RoleService,
    private confirmationService: PopUpConfirmationService,
    private notifService: PopUpNotifService,
    private location: Location,
  ) { }
  get ClaimsControl(): FormArray{
    return this.form.controls.Claims as FormArray;
  }
  ngOnInit(): void {
    this.dashboardStateService.changeViewState({isFooterBarNeedToBeShown: false});
    this.generateForm();
    this.roleService.getEnterpriseClaims().subscribe(x => {
      this.setFormControlClaimItem(x);
      this.setClaimTree(x);
      this.checkMode();
    });
  }
  cancelEdit(): void{
    this.mode = 'info';
    this.supplyDataIntoForm();
    this.checkDisabledForm();
  }
  editMode(): void{
    this.mode = 'edit';
    this.checkDisabledForm();
  }
  checkMode(): void{
    this.data = this.routes.snapshot.data.data;
    console.log(this.data);
    if (this.data){
      this.mode = 'info';
      this.supplyDataIntoForm();
      this.checkDisabledForm();
    }
  }

  supplyDataIntoForm(): void{
    this.form.addControl('Id', this.formBuilder.control(this.data.id, [Validators.required]));
    this.form.controls.Name.setValue(this.data.name);
    for (const item of this.data.claims) {
      this.ClaimsControl.controls.find(x => x.get('Id')?.value === item)?.get('Authorize')?.setValue(true);
    }
    for (const key in this.claimTree) {
      if (Object.prototype.hasOwnProperty.call(this.claimTree, key)) {
        const element = this.claimTree[key];
        for (const key2 in element) {
          if (Object.prototype.hasOwnProperty.call(element, key2)) {
            this.updateFeatureCheck(key, key2);
          }
        }
        this.updateContextCheck(key);
      }
    }
  }
  checkDisabledForm(): void{
    const isDisabled = this.mode === 'info' ? true : false;
    if (isDisabled){
      this.form.controls.Name.disable();
      for (const item of this.ClaimsControl.controls) {
          item.disable();
      }
    }else{
      this.form.controls.Name.enable();
      for (const item of this.ClaimsControl.controls) {
        item.enable();
      }
    }
    // for (const key in this.claimTree) {
    //   if (Object.prototype.hasOwnProperty.call(this.claimTree, key)) {
    //     const element = this.claimTree[key];
    //     const t = (document.getElementById('mcb-' + key)! as unknown) as MatCheckbox;
    //     console.log(key, document.getElementById('mcb-' + key), t);
    //     t.setDisabledState(isDisabled);
    //     for (const key2 in element) {
    //       if (Object.prototype.hasOwnProperty.call(element, key2)) {
    //         const t2 = (document.getElementById('mcb2-' + key2)! as unknown) as MatCheckbox;
    //         console.log(key2, document.getElementById('mcb2-' + key2), t2);
    //         t2.setDisabledState(isDisabled);

    //       }
    //     }
    //   }
    // }
  }


  generateForm(): void{
    this.form = this.formBuilder.group({
      Name: [null, [Validators.required, Validators.maxLength(255)], [DuplicateRoleNameValidator.validate(this.roleService)]],
      Claims: this.formBuilder.array([])
    });
  }
  updateCheck(event: any, context: string, feature: string, action: string): void{
    this.updateFeatureCheck(context, feature);
    this.updateContextCheck(context);
  }
  updateFeatureCheck(context: string, feature: string): void{
    const ids: string[] = [];
    for (const key in this.claimTree[context][feature]) {
      if (Object.prototype.hasOwnProperty.call(this.claimTree[context][feature], key)) {
        ids.push(this.claimTree[context][feature][key].id);
      }
    }
    const t = this.ClaimsControl.controls.filter(x => ids.includes(x.get('Id')?.value) && x.get('Authorize')?.value === true);
    // console.log(ids, t);
    if (t.length === 0){
      this.claimTreeCheckStatusChild[context][feature] = null;
    }
    else if (t.length > 0 && t.length >= ids.length){
      this.claimTreeCheckStatusChild[context][feature] = 'checked';
    }
    else if (t.length > 0 && t.length < ids.length){
      this.claimTreeCheckStatusChild[context][feature] = 'indeterminated';
    }
  }
  updateContextCheck(context: string): void{
    const features: string[] = [];
    const featuresKey: any[] = [];

    for (const key in this.claimTree[context]) {
      if (Object.prototype.hasOwnProperty.call(this.claimTree[context], key)) {
        features.push(key);
        featuresKey.push(this.claimTreeCheckStatusChild[context][key]);
      }
    }
    if (featuresKey.filter(x => x === null).length === features.length){
      this.claimTreeCheckStatus[context] = null;
    }
    else if (featuresKey.filter(x => x === 'checked').length === features.length){
      this.claimTreeCheckStatus[context] = 'checked';
    }
    else {
      this.claimTreeCheckStatus[context] = 'indeterminated';
    }
  }
  setAllContext(event: any, context: string): void{
    const ids: string[] = [];
    for (const fKey in this.claimTree[context]) {
      if (Object.prototype.hasOwnProperty.call(this.claimTree[context], fKey)) {
        for (const acKey in this.claimTree[context][fKey]) {
          if (Object.prototype.hasOwnProperty.call(this.claimTree[context][fKey], acKey)) {
            ids.push(this.claimTree[context][fKey][acKey].id);
          }
        }
      }
    }
    this.ClaimsControl.controls.forEach(x => {
      if (ids.includes(x.get('Id')?.value)){
        x.get('Authorize')?.setValue(event.checked);
      }
    });
    for (const fKey in this.claimTree[context]) {
      if (Object.prototype.hasOwnProperty.call(this.claimTree[context], fKey)) {
       this.updateFeatureCheck(context, fKey);
      }
    }
    this.updateContextCheck(context);
  }
  setAllFeature(event: any, context: string, feature: string): void{
    const ids: string[] = [];
    for (const acKey in this.claimTree[context][feature]) {
      if (Object.prototype.hasOwnProperty.call(this.claimTree[context][feature], acKey)) {
        ids.push(this.claimTree[context][feature][acKey].id);
      }
    }
    this.ClaimsControl.controls.forEach(x => {
      if (ids.includes(x.get('Id')?.value)){
        x.get('Authorize')?.setValue(event.checked);
      }
    });
    this.updateFeatureCheck(context, feature);

    this.updateContextCheck(context);
  }
  setFormControlClaimItem(items: EnterpriseClaimDto[]): void{
    for (const item of items) {
      this.ClaimsControl.push(this.formBuilder.group({
        Id: [item.id, [Validators.required]],
        Authorize: [false],
      }));
    }
  }
  setClaimTree(items: EnterpriseClaimDto[]): void{
    // console.log(items);
    // SetContext
    const ctx: ContextType = {};
    const chkstatus: CheckedStatus = {};
    const chkstatusChild: CheckedStatusChild = {};
    for (const item of items.filter((x, i, self) => i === self.indexOf(x))) {
      ctx[item.context] = {};
      chkstatus[item.context] = null;
      chkstatusChild[item.context] = {};
      // set feature
      for (const item2 of items.filter(x => x.context === item.context)) {
        if (item2.context === item.context){
          const ftr: FeatureType = ctx[item.context];
          const act: ActionType = {};
          for (const item3 of items.filter(x => x.context === item.context && x.feature === item2.feature)) {
            act[item3.action] = {
              description: item3.description,
              id: item3.id
            };
          }
          ftr[item2.feature] = act;
          ctx[item.context] = ftr;
          chkstatusChild[item.context][item2.feature] = null;
        }
      }
    }
    this.claimTreeCheckStatus = chkstatus;
    this.claimTreeCheckStatusChild = chkstatusChild;
    this.claimTree = ctx;
  }
  getFormGroupClaims(id: string): FormGroup{
    return this.ClaimsControl.controls.find(x => x.get('Id')?.value === id) as FormGroup;
  }
  submitForm(): void{
    if (this.mode === 'add'){
      if (this.form.valid){
        this.confirmationService.show({
          title: 'Apa Anda Yakin?',
          buttonTheme: 'primary',
          message: 'Pastikan data yang diisi sudah benar. Jika sudah yakin tekan Submit.'
        })
        .afterClosed()
        .pipe(
          untilDestroyed(this),
          switchMap((x: any) => {
            if (!!x){
              return this.roleService.createEnterpriseRole(this.form.value);
            }
            return of(undefined);
          }),
          switchMap(x => {
            if (!!x){
              return this.notifService.show({message: 'Peran berhasil dibuat.', title: 'Sukses', type: 'success'}).afterClosed();
            }
            return of(undefined);
          })
        )
        .subscribe(x => {
          if (!!x) {this.location.back(); }
        });
      }
      else{
        this.notifService.show({title: 'Peringatan', message: 'Form tidak valid', type: 'warning'});
      }
    }
    else if (this.mode === 'info'){
      if (this.form.valid){
        this.confirmationService.show({
          title: 'Apa Anda Yakin?',
          buttonTheme: 'primary',
          message: 'Peran akan dihapus. Jika sudah yakin tekan Submit.'
        })
        .afterClosed()
        .pipe(
          untilDestroyed(this),
          switchMap((x: any) => {
            if (!!x){
              console.log(this.form.value);
              return this.roleService.deleteEnterpriseRole(this.form.value);
            }
            return of(undefined);
          }),
          switchMap(x => {
            if (!!x){
              return this.notifService.show({message: 'Peran berhasil dihapus.', title: 'Sukses', type: 'success'}).afterClosed();
            }
            return of(undefined);
          })
        )
        .subscribe(x => {
          if (!!x) {this.location.back(); }
        });
      }
      else{
        this.notifService.show({title: 'Peringatan', message: 'Form tidak valid', type: 'warning'});
      }
    }
    else if (this.mode === 'edit'){
      if (this.form.valid){
        this.confirmationService.show({
          title: 'Apa Anda Yakin?',
          buttonTheme: 'primary',
          message: 'Peran akan diubah. Jika sudah yakin tekan Submit.'
        })
        .afterClosed()
        .pipe(
          untilDestroyed(this),
          switchMap((x: any) => {
            if (!!x){
              return this.roleService.updateEnterpriseRole(this.form.value);
            }
            return of(undefined);
          }),
          switchMap(x => {
            if (!!x){
              return this.notifService.show({message: 'Peran berhasil diubah.', title: 'Sukses', type: 'success'}).afterClosed();
            }
            return of(undefined);
          })
        )
        .subscribe(x => {
          if (!!x) {this.location.back(); }
        });
      }
      else{
        this.notifService.show({title: 'Peringatan', message: 'Form tidak valid', type: 'warning'});
      }
    }
  }
}
