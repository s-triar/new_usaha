import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OAuthService, NullValidationHandler } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { authCodeFlowConfig } from './application/auth/auth-code-flow.config';
import { useHash } from './application/auth/auth-flags';
import { noDiscoveryAuthConfig } from './application/auth/auth-no-discovery.config';
import { authConfig } from './application/auth/auth.config';
import { APP_TOKEN, AppToken } from './application/constant/app-token';
import { AppViewService } from './infrastructure/backend/app-view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'usahaku-app';
  statusLoading$!: Observable<boolean>;

  constructor(
    @Inject(APP_TOKEN) private appToken: AppToken,
    private http: HttpClient,
    private router: Router,
    private oauthService: OAuthService,
    private breakpointObserver: BreakpointObserver,
    private appViewService: AppViewService
  ) {

    // Remember the selected configuration
    // if (sessionStorage.getItem('flow') === 'code') {
    // this.configureCodeFlow();
    // } else {
    // this.configureImplicitFlow();
    // }

    // Automatically load user profile
    // this.oauthService.events
    //   .pipe(filter((e) => e.type === 'token_received'))
    //   .subscribe((_) => {
    //     console.log('state', this.oauthService.state);
    //     this.oauthService.loadUserProfile();

    //     const scopes = this.oauthService.getGrantedScopes();
    //     console.log('scopes', scopes);
    //   });
  }
  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Web,
      Breakpoints.Tablet
    ]).subscribe(match => {
      if (match.breakpoints[Breakpoints.HandsetLandscape] || match.breakpoints[Breakpoints.HandsetPortrait]){
        this.appViewService.device.next('handset');
      }
      else if (match.breakpoints[Breakpoints.TabletPortrait] || match.breakpoints[Breakpoints.TabletLandscape]){
        this.appViewService.device.next('tablet');
      } else{
        this.appViewService.device.next('web');
      }
    });
    console.log(this.oauthService.getAccessToken());

  }
  private configureCodeFlow(): void {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((a) => {
      console.log('try login', a);
      if (useHash) {
        this.router.navigate(['/']);
      }
      console.log(this.oauthService.getAccessToken());
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh(undefined, 'any', false);
  }

  private configureImplicitFlow(): void {
    this.oauthService.configure(authConfig);
    // this.oauthService.tokenValidationHandler = new JwksValidationHandler();

    this.oauthService.loadDiscoveryDocumentAndTryLogin().then((_) => {
      if (useHash) {
        this.router.navigate(['/']);
      }
    });

    // Optional
    this.oauthService.setupAutomaticSilentRefresh();

    // Display all events
    this.oauthService.events.subscribe((e) => {
      // tslint:disable-next-line:no-console
      console.debug('oauth/oidc event', e);
    });

    this.oauthService.events
      .pipe(filter((e) => e.type === 'session_terminated'))
      .subscribe((e) => {
        // tslint:disable-next-line:no-console
        console.debug('Your session has been terminated!');
      });
  }

  //
  // Below you find further examples for configuration functions
  //

  private configureWithoutDiscovery(): void {
    this.oauthService.configure(noDiscoveryAuthConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.tryLogin();
  }

  private configureAuth(): void {
    //
    // This method demonstrated the old API; see configureWithNewConfigApi for new one
    //

    // URL of the SPA to redirect the user to after login
    this.oauthService.redirectUri = window.location.origin + '/index.html';

    // URL of the SPA to redirect the user after silent refresh
    this.oauthService.silentRefreshRedirectUri =
      window.location.origin + '/silent-refresh.html';

    // The SPA's id. The SPA is registerd with this id at the auth-server
    this.oauthService.clientId = 'spa-demo';

    // set the scope for the permissions the client should request
    // The first three are defined by OIDC. The 4th is a usecase-specific one
    this.oauthService.scope = 'openid profile email voucher';

    // Url of the Identity Provider
    this.oauthService.issuer =
      'https://steyer-identity-server.azurewebsites.net/identity';

    this.oauthService.tokenValidationHandler = new NullValidationHandler();

    this.oauthService.events.subscribe((e) => {
      // tslint:disable-next-line:no-console
      console.debug('oauth/oidc event', e);
    });

    // Load Discovery Document and then try to login the user
    this.oauthService.loadDiscoveryDocument().then((doc) => {
      this.oauthService.tryLogin();
    });

    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_expires'))
      .subscribe((e) => {
        // tslint:disable-next-line:no-console
        console.debug('received token_expires event', e);
        this.oauthService.silentRefresh();
      });
  }

  private configurePasswordFlow(): void {
    // Set a dummy secret
    // Please note that the auth-server used here demand the client to transmit a client secret, although
    // the standard explicitly cites that the password flow can also be used without it. Using a client secret
    // does not make sense for a SPA that runs in the browser. That's why the property is called dummyClientSecret
    // Using such a dummy secreat is as safe as using no secret.
    this.oauthService.dummyClientSecret = 'geheim';
  }
}
