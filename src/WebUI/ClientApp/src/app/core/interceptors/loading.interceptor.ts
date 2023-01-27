import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CUSTOM_HEADER } from '../constant';
import { PopUpLoadingService } from 'src/app/ui/components/pop-up/pop-up-loading/pop-up-loading.service';


const SHOW_LOADING_DIALOG_TOKEN = new HttpContextToken<boolean>(() => false);
export function setLoadingDialogContext(): HttpContext {
  return new HttpContext().set(SHOW_LOADING_DIALOG_TOKEN, true);
}

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService:PopUpLoadingService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if( request.context.get(SHOW_LOADING_DIALOG_TOKEN)){
      this.loadingService.show();
    }
   
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if( request.context.get(SHOW_LOADING_DIALOG_TOKEN)){
          this.loadingService.close();
        }
      }),
      catchError((error: any) => {
        if( request.context.get(SHOW_LOADING_DIALOG_TOKEN)){
          this.loadingService.close();
        }
        return throwError(()=>error);
      })
    );
  }
}
