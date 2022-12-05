
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take } from 'rxjs/operators';
import { GoodsService } from 'src/app/infrastructure/backend/goods.service';

export class DuplicateBarcodeValidator{
    static validate(
        goodsService: GoodsService
    ): (ctrl: AbstractControl) => Observable<ValidationErrors | null> {
    return (ctrl: AbstractControl) => {
        return ctrl.valueChanges.pipe(
            debounceTime(700),
            // distinctUntilChanged(),
            switchMap(val => goodsService.checkDuplicateBarcode({Barcode: val})),
            map(duplicate => {
                console.log(duplicate);
                return (!!duplicate && duplicate === true ? { duplicateBarcodeError: true } : null  );
            }),
            catchError((e) => {
                console.log('error duplicate', e);
                return of( { duplicateBarcodeError: true });
            }),
            take(1)
        );
        };
    }
}


export function barcodeCheck(goodsService: GoodsService): AsyncValidatorFn |null {
    return (c: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return c.valueChanges.pipe(
            debounceTime(700),
            take(1),
            switchMap(val => goodsService.checkDuplicateBarcode({Barcode: val})),
            map(duplicate => {
                return (!!duplicate && duplicate === true ?  { duplicateBarcodeError: true } : null );
            }),
            catchError(() => {
                return of({ duplicateBarcodeError: true });
            })
        );
    };
  }
