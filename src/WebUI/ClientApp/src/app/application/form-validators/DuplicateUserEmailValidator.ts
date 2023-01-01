
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take } from 'rxjs/operators';
import { AccountService } from '../auth-jwt/account.service';


export class DuplicateUserEmailValidator{
    static validate(
        accService: AccountService
    ): (ctrl: AbstractControl) => Observable<ValidationErrors | null> {
    return (ctrl: AbstractControl) => {
        return ctrl.valueChanges.pipe(
            debounceTime(700),
            // distinctUntilChanged(),
            switchMap(val => accService.checkEmailExist(val)),
            map(duplicate => {
                console.log(duplicate);
                return (!!duplicate && duplicate === true ? { duplicateUserEmail: true } : null  );
            }),
            catchError((e) => {
                console.log('error duplicate', e);
                return of( { duplicateUserEmail: true });
            }),
            take(1)
        );
        };
    }
}


export function userEmailCheck(accService: AccountService): AsyncValidatorFn |null {
    return (c: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return c.valueChanges.pipe(
            debounceTime(700),
            take(1),
            switchMap(val => accService.checkEmailExist(val)),
            map(duplicate => {
                return (!!duplicate && duplicate === true ?  { duplicateUserEmail: true } : null );
            }),
            catchError(() => {
                return of({ duplicateUserEmail: true });
            })
        );
    };
  }
