
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take } from 'rxjs/operators';
import { AccountService } from 'src/app/infrastructure/backend/account.service';

export class DuplicateUserPhoneValidator{
    static validate(
        accService: AccountService
    ): (ctrl: AbstractControl) => Observable<ValidationErrors | null> {
    return (ctrl: AbstractControl) => {
        return ctrl.valueChanges.pipe(
            debounceTime(700),
            // distinctUntilChanged(),
            switchMap(val => accService.checkPhoneExist(val)),
            map(duplicate => {
                console.log(duplicate);
                return (!!duplicate && duplicate === true ? { duplicateUserPhone: true } : null  );
            }),
            catchError((e) => {
                console.log('error duplicate', e);
                return of( { duplicateUserPhone: true });
            }),
            take(1)
        );
        };
    }
}


export function userPhoneCheck(accService: AccountService): AsyncValidatorFn |null {
    return (c: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return c.valueChanges.pipe(
            debounceTime(700),
            take(1),
            switchMap(val => accService.checkPhoneExist(val)),
            map(duplicate => {
                return (!!duplicate && duplicate === true ?  { duplicateUserPhone: true } : null );
            }),
            catchError(() => {
                return of({ duplicateUserPhone: true });
            })
        );
    };
  }
