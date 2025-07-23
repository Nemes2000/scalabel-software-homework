import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTransloco } from '@jsverse/transloco';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { TranslocoHttpLoader } from './services/transloco-loader';
import { provideStore } from '@ngrx/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appEffects, appReducer } from './states/app.state';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideNativeDateAdapter } from '@angular/material/core';
import { BackendInterceptor } from './interceptors/backend.interceptor';
import { EncryptStorage } from 'encrypt-storage';
import { encryptedStorageFactory } from './factories/encrypted-storage.factory';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(appReducer),
    provideEffects(appEffects),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideTransloco({
      config: {
        availableLangs: ['hu'],
        defaultLang: 'hu',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAnimationsAsync(),
    provideStoreDevtools({
      maxAge: 30,
      logOnly: true,
    }),
    provideNativeDateAdapter(),
    { provide: EncryptStorage, useFactory: encryptedStorageFactory },
  ],
};
