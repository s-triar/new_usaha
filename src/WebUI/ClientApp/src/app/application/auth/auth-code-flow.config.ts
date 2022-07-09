import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { useSilentRefreshForCodeFlow } from './auth-flags';

export const authCodeFlowConfig: AuthConfig = {
  issuer: environment.auth_server,
  redirectUri:
    window.location.origin, // +
    // (localStorage.getItem('useHashLocationStrategy') === 'true'
    //   ? '/#/index.html'
    //   : '/index.html'),
  clientId: environment.clientIdIDS4,
  responseType: 'code',
  scope: useSilentRefreshForCodeFlow
    ? `openid profile email ${environment.clientAPIIDS4}`
    : `openid profile email offline_access ${environment.clientAPIIDS4}`,
  silentRefreshRedirectUri: `${window.location.origin}/silent-refresh.html`,
  useSilentRefresh: useSilentRefreshForCodeFlow,
  showDebugInformation: true,
  sessionChecksEnabled: true,
  timeoutFactor: 0.90,
  // disablePKCE: true,
  clearHashAfterLogin: true,
  // sessionCheckIntervall: 3600000,
  // silentRefreshTimeout: 5000,
  sessionCheckIntervall: 10000,
  silentRefreshTimeout: 20000,
  // customQueryParams:{prompt:'login'}
  // oidc:false,
  // nonceStateSeparator : 'semicolon'
};
