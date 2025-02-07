import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { initFlowbite } from 'flowbite';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, TranslateModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Mati-Onis';
  isLoaded = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService
  ) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setDefaultLang('fr');

    this.translate.use('fr').subscribe(() => {
      this.isLoaded = true;
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnInit(): void {
    // Safely initialize Flowbite only in the browser
    if (isPlatformBrowser(this.platformId)) {
      initFlowbite();
    }
  }
}
