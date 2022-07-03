import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { OidcSecurityService } from 'angular-auth-oidc-client';
import { OAuthService } from 'angular-oauth2-oidc';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeServerInterceptor implements HttpInterceptor {
  constructor(private oidcSecurityService: OAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.oidcSecurityService.getAccessToken();
    if (!!token && this.isSameOriginUrl(req)){
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(req);
  }

  private isSameOriginUrl(req: any): boolean {
    // It's an absolute url with the same origin.
    if (req.url.startsWith(`${environment.auth_server}/`)) {
      return true;
    }

    // It's a protocol relative url with the same origin.
    // For example: //www.example.com/api/Products
    const spt = environment.auth_server.split('//');
    if (req.url.startsWith(`//${spt[1]}/`)) {
      return true;
    }

    // It's a relative url like /api/Products
    if (/^\/[^\/].*/.test(req.url)) {
      return true;
    }

    // It's an absolute or protocol relative url that
    // doesn't have the same origin.
    return false;
  }
}
