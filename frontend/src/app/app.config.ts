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
import { UniversalTranslateLoader } from '../app/components/shop/services/universaltranslateloader.service'

// Factory function for TranslateHttpLoader
export function universalLoaderFactory(http: HttpClient) {
  return new UniversalTranslateLoader(http, 'assets/i18n/', '.json');
}

// Initialization function for TranslateService
export function initializeApp(envInjector: EnvironmentInjector) {
  return () =>
    runInInjectionContext(envInjector, () => {
      const translate = inject(TranslateService);

      console.log('Initializing TranslateService...');
      translate.addLangs(['en', 'fr']);
      translate.setDefaultLang('fr');

      const result = translate.use('fr');

      return result;
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    provideHttpClient(withInterceptors([authInterceptor])),

    provideClientHydration(),

    TranslateStore,

    provideTranslateService({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: universalLoaderFactory,
        deps: [HttpClient],
      },
    }),

    provideAppInitializer(() => {
      const envInjector = inject(EnvironmentInjector);
      return initializeApp(envInjector)(); 
    }),
  ],
};
