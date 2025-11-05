import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './core/interceptors/auth-interceptor';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './core/store/reducers/auth.reducer';
import { AuthEffects } from './core/store/effects/auth.effects';
import { AuthService } from './core/services/auth.service';
import { adminAuthInterceptor } from './core/interceptors/admin-auth-interceptor';




export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor,adminAuthInterceptor])),
    importProvidersFrom(ReactiveFormsModule),
    provideStore({
      auth: authReducer,
    }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    AuthService
]
};
