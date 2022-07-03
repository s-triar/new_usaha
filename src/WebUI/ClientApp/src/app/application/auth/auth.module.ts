import { APP_INITIALIZER, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { AuthRoutingModule } from './auth-routing.module';
import { AuthConfig, OAuthModule, OAuthModuleConfig, OAuthStorage } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { authAppInitializerFactory } from './auth-app-initializer.factory';
import { authCodeFlowConfig } from './auth-code-flow.config';
import { authModuleConfig } from './auth-module.config';
import { AuthGuard } from '../guards/auth.guard';
import { AuthWithForceLoginGuard } from '../guards/auth-with-force-login.guard';


export function storageFactory(): OAuthStorage {
  return localStorage;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AuthWithForceLoginGuard,
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders<AuthModule> {
    return {
      ngModule: AuthModule,
      providers: [
        { provide: APP_INITIALIZER, useFactory: authAppInitializerFactory, deps: [AuthService], multi: true },
        { provide: AuthConfig, useValue: authCodeFlowConfig },
        { provide: OAuthModuleConfig, useValue: authModuleConfig },
        { provide: OAuthStorage, useFactory: storageFactory },
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AuthModule) {
    if (parentModule) {
      throw new Error('AuthModule is already loaded. Import it in the AppModule only');
    }
  }
 }
