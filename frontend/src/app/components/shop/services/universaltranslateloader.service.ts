import { TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export class UniversalTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private prefix: string = 'assets/i18n/',
    private suffix: string = '.json'
  ) {}

  getTranslation(lang: string): Observable<any> {
    const isServer = typeof window === 'undefined';

    if (isServer) {
      try {
        // ⛔ Don't import at the top, do it here
        const fs = require('fs');
        const path = require('path');

        const filePath = path.join(process.cwd(), 'dist/browser', this.prefix, `${lang}${this.suffix}`);
        const file = fs.readFileSync(filePath, 'utf8');
        return of(JSON.parse(file));
      } catch (err) {
        console.error(`❌ Failed to read translation file for "${lang}":`, err);
        return of({});
      }
    }

    // ✅ Client-side: use HTTP
    return this.http.get(`${this.prefix}${lang}${this.suffix}`);
  }
}
