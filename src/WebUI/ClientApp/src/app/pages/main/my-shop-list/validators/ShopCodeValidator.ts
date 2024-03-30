import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { ShopApiService } from 'src/app/apis/shop-api.service';



export class ShopCodeAvailabilityValidator {
  static validate(
    shopService: ShopApiService
  ): (ctrl: AbstractControl) => Observable<{ shopCodeAvailabilityError: boolean } | null> {
    return (ctrl: AbstractControl) => {
      return ctrl.valueChanges.pipe(
        debounceTime(700),
        distinctUntilChanged(),
        switchMap(val => shopService.checkAvailableShopCode({Code: val})),
        map(available => (!!available && available === true ?  null : { shopCodeAvailabilityError: true })),
        catchError((e) => of({ shopCodeAvailabilityError: true })),
        take(1)
      );
    };
  }
}



export function shopCodeAvailability(shopService: ShopApiService): AsyncValidatorFn |null {
    return (c: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return c.valueChanges.pipe(
            debounceTime(700),
            distinctUntilChanged(),
            switchMap(val => shopService.checkAvailableShopCode({Code: val})),
            map(available => (!!available && available === true ?  null : { shopCodeAvailabilityError: true })),
            catchError((e) => of({ shopCodeAvailabilityError: true })),
            take(1)
        );
    };
  }
