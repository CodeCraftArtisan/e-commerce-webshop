import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-menu',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.css'],
})
export class LanguageMenuComponent implements OnInit {
  selectedLanguage: string = 'fr';
  isNavbarOpen = false;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    console.log(
      'LanguageMenuComponent initialized with language:',
      this.selectedLanguage
    );
  }

  /**
   * Changes the language dynamically
   * @param language - The language code
   */
  useLanguage(language: string): void {
    this.translate.use(language);
    this.selectedLanguage = language;
    console.log('Language changed to:', language);
  }
}
