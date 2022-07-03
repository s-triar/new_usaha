import { AbstractControl, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, debounceTime, switchMap, map, catchError, of, take } from 'rxjs';
import { GoodsGroupService } from 'src/app/infrastructure/backend/goods-group.service';


export class DuplicateGroupNameValidator{
    static validate(
        goodsGroupService: GoodsGroupService
    ): (ctrl: AbstractControl) => Observable<ValidationErrors | null> {
    return (ctrl: AbstractControl) => {
        return ctrl.valueChanges.pipe(
            debounceTime(700),
            // distinctUntilChanged(),
            switchMap(val => goodsGroupService.checkDuplicateBarcode({Name: val})),
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


export function groupNameCheck(goodsGroupService: GoodsGroupService, routes: ActivatedRoute): AsyncValidatorFn |null {
    return (c: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return c.valueChanges.pipe(
            debounceTime(700),
            take(1),
            switchMap(val => goodsGroupService.checkDuplicateBarcode({Name: val})),
            map(duplicate => {
                return (!!duplicate && duplicate === true ?  { duplicateGoodsGroupNameError: true } : null );
            }),
            catchError(() => {
                return of({ duplicateGoodsGroupNameError: true });
            })
        );
    };
  }
