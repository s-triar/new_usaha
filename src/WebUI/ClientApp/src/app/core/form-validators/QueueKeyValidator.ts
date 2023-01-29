import { AbstractControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, map, catchError, take } from 'rxjs/operators';
import { PosCashierDataService } from 'src/app/ui/pages/workspace/pages/pos-cashier/services/pos-cashier-data.service';


export class QueueKeyValidator {
    static validate(
      cashierDataService: PosCashierDataService
    ): (ctrl: AbstractControl) => Observable<{ keyIsReservedError: boolean } | null> {
      return (ctrl: AbstractControl) => {
        return ctrl.valueChanges.pipe(
          debounceTime(700),
          distinctUntilChanged(),
          switchMap(val => of(cashierDataService.checkKey(val))),
          map(available => (available === false ?  null : { keyIsReservedError: true })),
          catchError((e) => of({ keyIsReservedError: true })),
          take(1)
        );
      };
    }
  }
