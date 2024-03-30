import { ApplicationConfig, importProvidersFrom, inject, LOCALE_ID  } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import en from '@angular/common/locales/en';
registerLocaleData(en);
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { 
  UserOutline, 
  LockOutline, 
  ArrowLeftOutline,
  LoadingOutline,
  EyeInvisibleOutline,
  EyeOutline,
  MailOutline,
  PhoneOutline,
  HomeOutline,
  ShopOutline,
  EditOutline,
  LogoutOutline,
  ShareAltOutline,
  SolutionOutline,
  TeamOutline,
  SearchOutline,
  PlusOutline,
  DropboxOutline,
  FundProjectionScreenOutline,
  LaptopOutline,
  LeftOutline,
  RightOutline,
  QrcodeOutline,
  BarcodeOutline,
  InboxOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  DeleteOutline,
  InfoOutline,
  ScanOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ 
  UserOutline,
  LockOutline, 
  ArrowLeftOutline,
  LoadingOutline,
  EyeInvisibleOutline,
  EyeOutline,
  MailOutline,
  PhoneOutline,
  HomeOutline,
  ShopOutline,
  EditOutline,
  LogoutOutline,
  ShareAltOutline,
  SolutionOutline,
  TeamOutline,
  SearchOutline,
  PlusOutline,
  DropboxOutline,
  FundProjectionScreenOutline,
  LaptopOutline,
  LeftOutline,
  RightOutline,
  QrcodeOutline,
  BarcodeOutline,
  InboxOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  DeleteOutline,
  InfoOutline,
  ScanOutline,
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(NzIconModule.forRoot(icons)),
    {
      provide: NZ_I18N,
      useFactory: () => {
        const localId = inject(LOCALE_ID);
        switch (localId) {
          case 'en':
            return en_US;
          default:
            return en_US;
        }
      }
    }
]
};
