import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, take } from 'rxjs/operators';
import { ProductApiService } from 'src/app/apis/product-api.service';
import { ProductGroupNameApiService } from 'src/app/apis/product-group-name-api.service';


export class ProductGroupNameAvailabilityValidator{
    static validate(
        productGroupService: ProductGroupNameApiService
    ): (ctrl: AbstractControl) => Observable<ValidationErrors | null> {
    return (ctrl: AbstractControl) => {
        return ctrl.valueChanges.pipe(
            debounceTime(700),
            // distinctUntilChanged(),
            switchMap(val => productGroupService.checkDuplicateBarcode({Name: val})),
            map(duplicate => {
                console.log(duplicate);
                return (!!duplicate && duplicate === true ? { duplicateGoodsGroupNameError: true } : null  );
            }),
            catchError((e) => {
                console.log('error duplicate', e);
                return of( { duplicateGoodsGroupNameError: true });
            }),
            take(1)
        );
        };
    }
}


export function productGroupNameAvailabilityValidator(productGroupService: ProductGroupNameApiService, routes: ActivatedRoute): AsyncValidatorFn |null {
    return (c: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return c.valueChanges.pipe(
            debounceTime(700),
            take(1),
            switchMap(val => productGroupService.checkDuplicateBarcode({Name: val})),
            map(duplicate => {
                return (!!duplicate && duplicate === true ?  { duplicateGoodsGroupNameError: true } : null );
            }),
            catchError(() => {
                return of({ duplicateGoodsGroupNameError: true });
            })
        );
    };
  }

