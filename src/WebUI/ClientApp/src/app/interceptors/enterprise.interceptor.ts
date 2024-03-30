import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ShopInterceptor implements HttpInterceptor {

  // constructor(
  //   private readonly shopTokenService: ShopTokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.shopTokenService.getTokenAsString();
    // // console.log(token, 'interceptor');
    // if (!!token){
    //   req = req.clone({
    //     setHeaders: {
    //       'shop-authorization': `${token}`
    //     }
    //   });
    // }
    return next.handle(req);
  }
}
