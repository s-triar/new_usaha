import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../utilities/local-storage.service';
import { KEY_ACCESS_TOKEN } from '../constants/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly localStorageService: LocalStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorageService.load(KEY_ACCESS_TOKEN);
    if (!!token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
