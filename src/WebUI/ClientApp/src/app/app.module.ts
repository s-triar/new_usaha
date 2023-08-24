import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, InjectionToken, LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthorizeInterceptor } from './shared/interceptors/authorize.interceptor';


// import { SplashComponent } from './core/splash/splash.component';

// import { SearchBarNavComponent } from './components/search-bar-nav/search-bar-nav.component';
// import { LoadingScreenComponent } from 'src/app/components/loading-screen/loading-screen.component';
import { environment } from '../environments/environment';
// import { AuthorizeServerInterceptor } from './shared/interceptors/authorize-server.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
// import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
// import { NotificationInterceptor } from './shared/interceptors/notification.interceptor';

import { PrintService, ThermalPrintModule } from 'ng-thermal-print';
// import { PopUpKuModule } from './components/pop-up-ku/pop-up-ku.module';
import { CurrencyPipe } from '@angular/common';
// import { EnterpriseInterceptor } from './shared/interceptors/enterprise.interceptor';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import { ZXingScannerModule } from '@zxing/ngx-scanner';
// import { AuthModule } from './core/auth/auth.module';
import { SplashComponent } from './ui/components/utility/splash/splash.component';
import { AuthorizeInterceptor } from './core/interceptors/authorize.interceptor';
import { EnterpriseInterceptor } from './core/interceptors/enterprise.interceptor';
// import { AuthorizeServerInterceptor } from './core/interceptors/authorize-server.interceptor';
import { NotificationInterceptor } from './core/interceptors/notification.interceptor';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
// import { NgxEchartsModule } from 'ngx-echarts';
export const BASE_URL = new InjectionToken<string>('BASE_URL');
// import { AgChartsAngularModule } from 'ag-charts-angular';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id'; 
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
registerLocaleData(localeId, 'id'); 
import * as echarts from 'echarts';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
// Import echarts extensions
// import 'echarts-gl';
// Import echarts themes
// import 'echarts/theme/macarons.js';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    // BrowserModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: { init: echarts.init }
    
    }),
    // FlexLayoutModule,
    // AuthModule.forRoot(),
    ThermalPrintModule,
    // PopUpKuModule,
    SplashComponent,
    // FontAwesomeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // AgChartsAngularModule,
    
    // NgxEchartsModule.forRoot({
    //   echarts: () => import('echarts')
    // }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "en-ID" },
    PrintService,
    CurrencyPipe,
    { provide: BASE_URL, useValue: environment.auth_server },
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EnterpriseInterceptor, multi: true },
    // {provide: NGX_ECHARTS_CONFIG, useFactory: () => import('echarts')},
    // { provide: HTTP_INTERCEPTORS, useClass: AuthorizeServerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor( private readonly eventService: PublicEventsService) {
  //   this.eventService
  //       .registerForEvents()
  //       .pipe(filter((notification: any) => notification.type === EventTypes.ConfigLoaded))
  //       .subscribe((config: any) => console.warn('ConfigLoaded', config));
  // }

}
