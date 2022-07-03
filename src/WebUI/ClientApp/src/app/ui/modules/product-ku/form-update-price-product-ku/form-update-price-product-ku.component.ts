import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap } from 'rxjs';
import { GoodsService } from 'src/app/infrastructure/backend/goods.service';
import { InputCurrencyComponent } from 'src/app/ui/components/form/input-currency/input-currency.component';
import { PopUpNotifService } from 'src/app/ui/components/pop-up/pop-up-notif/pop-up-notif.service';


@UntilDestroy()
@Component({
  selector: 'app-form-update-price-product-ku',
  templateUrl: './form-update-price-product-ku.component.html',
  styleUrls: ['./form-update-price-product-ku.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputCurrencyComponent,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule
  ]
})

export class FormUpdatePriceProductKuComponent implements OnInit {
  @Input() id!: string;

  @Output() Submitted: EventEmitter<string> = new EventEmitter<string>();
  @Output() Canceled: EventEmitter<void> = new EventEmitter<void>();

  form: FormGroup = this.fb.group({
    Id: [this.id, [Validators.required]],
    Price: [0, [Validators.required, Validators.min(1)]],
    WholesalerPrice: [0, [Validators.required, Validators.min(1)]],
    WholesalerMin: [1, [Validators.required, Validators.min(1)]],
    IsWholesalerPriceAuto: [false],
  });
  get PriceProduct(): AbstractControl|null{
    return this.form.get('Price');
  }
  get WholesalerPriceProduct(): AbstractControl|null{
    return this.form.get('WholesalerPrice');
  }
  get WholesalerMinProduct(): AbstractControl|null{
    return this.form.get('WholesalerMin');
  }
  get IsWholesalerPriceAutoProduct(): AbstractControl|null{
    return this.form.get('IsWholesalerPriceAuto');
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
      Price: [0, [Validators.required, Validators.min(1)]],
      WholesalerPrice: [0, [Validators.required, Validators.min(1)]],
      WholesalerMin: [1, [Validators.required, Validators.min(1)]],
      IsWholesalerPriceAuto: [false],
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
    this.goodsService.changeSellPrice(temp)
        .pipe(
          untilDestroyed(this),
          switchMap(x =>
            this.notifService.show({message: 'Harga jual produk berhasil diubah.', title: 'Sukses', type: 'success'}).afterClosed()
                             .pipe(switchMap(y => of(x)))
          )
        )
        .subscribe(
          (x: string) => this.Submitted.emit(x)
        );
  }
}
