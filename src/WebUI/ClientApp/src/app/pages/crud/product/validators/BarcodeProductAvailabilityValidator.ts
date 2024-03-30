import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { ProductApiService } from 'src/app/apis/product-api.service';


export class BarcodeProductAvailabilityValidator {
  static validate(
    productApiService: ProductApiService
  ): (ctrl: AbstractControl) => Observable<{ shopCodeAvailabilityError: boolean } | null> {
    return (ctrl: AbstractControl) => {
      return ctrl.valueChanges.pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(val => productApiService.checkDuplicateBarcode({Barcode: val})),
        map(available => (!!available && available === true ?  null : { shopCodeAvailabilityError: true })),
        catchError((e) => of({ shopCodeAvailabilityError: true })),
        take(1)
      );
    };
  }
}


export function barcodeProductAvailabilityValidator(productApiService: ProductApiService): AsyncValidatorFn |null {
    return (c: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return c.valueChanges.pipe(
            debounceTime(700),
            distinctUntilChanged(),
            switchMap(val => productApiService.checkDuplicateBarcode({Barcode: val})),
            map(available => (!!available && available === true ?  null : { shopCodeAvailabilityError: true })),
            catchError((e) => of({ shopCodeAvailabilityError: true })),
            take(1)
        );
    };
  }
