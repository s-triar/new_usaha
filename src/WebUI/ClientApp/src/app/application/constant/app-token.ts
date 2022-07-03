import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface AppToken{
    experimentalEnabled: boolean;
    integrationWithServer: boolean;
}

export const APP_TOKEN = new InjectionToken<AppToken>(
    'APP_TOKEN',
    {
        providedIn: 'root',
        factory: () => ({
            experimentalEnabled: true,
            integrationWithServer: environment.production ? environment.production : false
        })
    }
);
