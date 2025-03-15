import {
  ApplicationConfig,
  provideAppInitializer,
  provideZoneChangeDetection,
  inject,
  EnvironmentInjector,
  runInInjectionContext,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  provideTranslateService,
  TranslateLoader,
  TranslateService,
  TranslateStore,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { authInterceptor } from '../app/components/shop/services/auth.interceptor';

// Factory function for TranslateHttpLoader
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

// Initialization function for TranslateService
export function initializeApp(envInjector: EnvironmentInjector) {
  return () =>
    runInInjectionContext(envInjector, () => {
      const translate = inject(TranslateService);
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('fr');
      return translate.use('fr').toPromise();
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withInterceptors([authInterceptor]), withFetch()),

    provideClientHydration(),

    TranslateStore,

    provideTranslateService({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    provideAppInitializer(() => {
      const envInjector = inject(EnvironmentInjector);
      return initializeApp(envInjector)(); 
    }),
  ],
};
