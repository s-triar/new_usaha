import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observer, of, switchMap } from 'rxjs';
import { MyGoodsGroupService } from 'src/app/infrastructure/backend/my-goods-group.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';
import { DuplicateGroupNameValidator } from './DuplicateGroupNameValidator';

@UntilDestroy()
@Component({
  selector: 'app-form-add-group-product-ku',
  templateUrl: './form-add-group-product-ku.component.html',
  styleUrls: ['./form-add-group-product-ku.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    // FlexLayoutModule
  ]
})
export class FormAddGroupProductKuComponent implements OnInit {
  @Output() Submitted: EventEmitter<string> = new EventEmitter<string>();
  @Output() Canceled: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup = this.fb.group({
    Name: ['',
      [Validators.required, Validators.maxLength(255)],
      [DuplicateGroupNameValidator.validate(this.goodsGroupService)]
    ],
    Description: ['',
      [Validators.maxLength(255)],
    ],
  });
  get NameGroup(): AbstractControl|null{
    return this.form.get('Name') as AbstractControl;
  }
  get DescriptionGroup(): AbstractControl|null{
    return this.form.get('Description') as AbstractControl;
  }
  constructor(
    private fb: FormBuilder,
    private readonly goodsGroupService: MyGoodsGroupService,
    private readonly notifService: PopUpNotifService,

    ) { }

  ngOnInit(): void {
  }
  submit(): void{
    if (this.form.valid){
      this.goodsGroupService.create(this.form.value)
          .pipe(
            untilDestroyed(this),
            switchMap(x =>
                this.notifService.show({message: 'Grup produk berhasil ditambah.', title: 'Sukses', type: 'success'}).afterClosed()
                                 .pipe(switchMap(y => of(x)))
              )
            )
          .subscribe(
            (x: string) => this.Submitted.emit(x)
          );
    }
  }
  cancel(): void{
    this.Canceled.emit();
  }
}
