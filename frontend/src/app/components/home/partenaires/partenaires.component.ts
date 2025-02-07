import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-partenaires',
    imports: [CommonModule],
    templateUrl: './partenaires.component.html',
    styleUrls: ['./partenaires.component.css']
})
export class PartenairesComponent implements AfterViewInit {
  logos = [
    {
      id: 1,
      url: 'https://upload.wikimedia.org/wikipedia/commons/0/00/ABB_logo.svg',
    },
    {
      id: 2,
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Logo_Legrand_SA.svg',
    },
    {
      id: 3,
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Philips_logo_new.svg',
    },
    {
      id: 4,
      url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg',
    },
    {
      id: 5,
      url: 'https://images.seeklogo.com/logo-png/48/1/rittal-logo-png_seeklogo-485591.png?v=1957122227481271152',
    },
    {
      id: 6,
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Schneider_Electric_2007.svg',
    },
    {
      id: 7,
      url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Logo_SMA.svg',
    },
  ];

  duplicatedLogos: any[] = [];

  @ViewChild('scrollContent') scrollContent!: ElementRef;

  ngOnInit() {
    this.generateDuplicatedLogos();
  }

  ngAfterViewInit() {
    const scrollContent = this.scrollContent.nativeElement;

    // Calculăm durata animației pe baza dimensiunii conținutului
    const contentWidth = scrollContent.offsetWidth; // Lățimea întregului container
    const duration = contentWidth / 50; // Viteza: cu cât numărul este mai mic, cu atât mai rapidă
    scrollContent.style.animationDuration = `${duration}s`;
  }

  generateDuplicatedLogos() {
    // Creăm un efect infinit prin duplicarea logo-urilor
    this.duplicatedLogos = [...this.logos, ...this.logos]; // Dublăm lista logo-urilor
  }
}
