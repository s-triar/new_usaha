import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { AbstractSecurityStorage, OidcSecurityService } from 'angular-auth-oidc-client';
// import { StorageKeys } from 'angular-auth-oidc-client/lib/storage/storage-persistence.service';
import { environment } from 'src/environments/environment';
import { ReturnUrlType } from '../values/api-authorization.constants';

@Injectable({
  providedIn: 'root'
})
export class RedirectAfterLoginService {

  constructor(
    private router: Router,
    // private storagePersistentService: AbstractSecurityStorage,
    // private oidcSecurityService: OidcSecurityService,

    ) { }

  redirect(): void{
    // const token = this.oidcSecurityService.getToken();
    // console.log('token', token);
    // const key: StorageKeys = 'storageCustomRequestParams';
    // const returnParams = this.storagePersistentService.read('usahaku_app_' + key);
    // console.log(returnParams);
    // if (this.passingCheckStorage(returnParams) && this.passingCheckStorage(token)){
      // if (ReturnUrlType in returnParams){
        // const url = returnParams[ReturnUrlType];
        // const splt = url.split(environment.app_server);
        // this.storagePersistentService.remove('usahaku_app_' + key);
        // this.router.navigateByUrl(splt[1]);
      // }
    // }
  }
  private passingCheckStorage(token: any): boolean{
    return (token !== null && token !== '' && token !== undefined);
  }
}
