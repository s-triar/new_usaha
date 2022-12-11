import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, AbstractControl, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, of } from 'rxjs';
import { GoodsService } from 'src/app/infrastructure/backend/goods.service';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';


@UntilDestroy()
@Component({
  selector: 'app-form-adjust-stock-product-ku',
  templateUrl: './form-adjust-stock-product-ku.component.html',
  styleUrls: ['./form-adjust-stock-product-ku.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class FormAdjustStockProductKuComponent implements OnInit {
  @Input() id!: string;

  @Output() Submitted: EventEmitter<void> = new EventEmitter<void>();
  @Output() Canceled: EventEmitter<void> = new EventEmitter<void>();
  form: FormGroup = this.fb.group({
    Id: [this.id, [Validators.required]],
    ActualStock: [0, [Validators.required, Validators.min(0)]],

  });
  get ActualStockProduct(): AbstractControl|null{
    return this.form.get('ActualStock');
  }
  constructor(
    private fb: FormBuilder,
    private notifService: PopUpNotifService,
    private readonly goodsService: GoodsService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(): void{
    this.form = this.fb.group({
      Id: [this.id, [Validators.required]],
      ActualStock: [0, [Validators.required, Validators.min(0)]],
    });
  }
  cancel(): void{
    this.Canceled.emit();
  }
  submit(): void{
    if (!this.form.valid){
      this.notifService.show({title: 'Form Tidak Valid', message: 'Harap isi form dengan benar. Pastikan tidak ada peringatan.', type: 'warning'})
      .afterClosed().subscribe();
      return;
    }
    const temp = this.form.value;
    this.goodsService.adjustStock(temp)
        .pipe(
          untilDestroyed(this),
          switchMap(x =>
            this.notifService.show({message: x.message, title: 'Sukses', type: 'success'}).afterClosed()
                             .pipe(switchMap(y => of(x)))
          )
        )
        .subscribe(
          () => this.Submitted.emit()
        );
  }
}
