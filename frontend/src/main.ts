/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the application configuration
import { appConfig } from './app/app.config';

/*
 * Bootstraps the Angular application using the root component (AppComponent).
 * The app-level configuration (providers) is imported from app.config.ts
 */
bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers, // Use the providers defined in app.config.ts
    importProvidersFrom(BrowserAnimationsModule), // Add BrowserAnimationsModule if required
  ],
}).catch((err) => console.error(err));
