import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
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
import { authInterceptor } from '../app/components/shop/services/auth.interceptor'; // ✅ Import functional interceptor

/*
 * Factory function for TranslateHttpLoader.
 * This function configures the loader to fetch translation files from 'assets/i18n/'.
 */
export function httpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

/*
 * Initialization function for TranslateService.
 * This function adds supported languages, sets the default language, and loads the initial translations.
 */
export function initializeApp(translate: TranslateService) {
  return () => {
    translate.addLangs(['en', 'fr']); // Add supported languages
    translate.setDefaultLang('fr'); // Set the default language
    return translate.use('fr').toPromise(); // Load translations for the default language
  };
}

/*
 * Application configuration object.
 * This centralizes the app-level providers for better modularity and maintainability.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /* Enable optimized zone-based change detection */
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    /* Provide HttpClient with an authentication interceptor */
    provideHttpClient(withInterceptors([authInterceptor]), withFetch()), // ✅ Use the functional interceptor

    /* Enable client-side hydration for server-side rendering */
    provideClientHydration(),

    /* Include TranslateStore for managing translation state */
    TranslateStore,

    /* Provide TranslateService with a loader for translation files */
    provideTranslateService({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    

    /* Ensure TranslateService is initialized before the app starts */
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [TranslateService],
      multi: true,
    },
  ],
};
