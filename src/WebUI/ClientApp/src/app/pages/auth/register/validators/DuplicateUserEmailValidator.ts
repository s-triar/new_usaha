
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, debounceTime, map, switchMap, take } from 'rxjs/operators';
import { AccountApiService } from 'src/app/apis/account-api.service';



export class DuplicateUserEmailValidator{
    static validate(
        accService: AccountApiService
    ): (ctrl: AbstractControl) => Observable<ValidationErrors | null> {
    return (ctrl: AbstractControl) => {
        return ctrl.valueChanges.pipe(
            debounceTime(700),
            // distinctUntilChanged(),
            switchMap(val => accService.checkEmailExist(val)),
            map(duplicate => {
                return (!!duplicate && duplicate === true ? { duplicateUserEmail: true } : null  );
            }),
            catchError((e) => {
                return of( { duplicateUserEmail: true });
            }),
            take(1)
        );
        };
    }
}


export function userEmailCheck(accService: AccountApiService): AsyncValidatorFn |null {
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
