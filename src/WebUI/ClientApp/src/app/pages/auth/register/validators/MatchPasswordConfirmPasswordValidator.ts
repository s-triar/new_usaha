
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { catchError, debounceTime, map, take, tap } from 'rxjs/operators';

export class CheckMatchPasswordValidator{
    static validate(passwordKey:string, confirmPasswordKey:string): (ctrl: AbstractControl) => Observable<ValidationErrors | null> {
    return (ctrl: AbstractControl) => {
        return ctrl.valueChanges.pipe(
            debounceTime(700),
            map(c=> c[passwordKey] !== c[confirmPasswordKey]),
            map(notMatch => {
                return (!!notMatch && notMatch === true ? { notMatchPassword: true } : null  );
            }),
            catchError((e) => {
                return of( { notMatchPassword: true });
            }),
            take(1)
        );
        };
    }
}


export function matchPasswordCheck(passwordKey:string, confirmPasswordKey:string): AsyncValidatorFn |null {
    return (c: AbstractControl): Observable<{ [key: string]: any } | null> => {
        return c.valueChanges.pipe(
            debounceTime(700),
            take(1),
            map(c=> c[passwordKey] !== c[confirmPasswordKey]),
            map(notMatch => {
                return (!!notMatch && notMatch === true ?  { notMatchPassword: true } : null );
            }),
            catchError(() => {
                return of({ notMatchPassword: true });
            })
        );
    };
  }
