import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Make it available globally
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    // Add available languages and set the default language
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');
  }

  // Initialize the translations and load the default language
  initializeTranslations(): Observable<any> {
    return this.translate.use('fr'); // Load the default language (can be dynamic)
  }

  // Method to switch language dynamically
  switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
