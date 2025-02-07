import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-projects',
    imports: [CommonModule, TranslateModule],
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  imagesWemmel: string[] = [];
  imagesPont: string[] = [];
  currentIndexWemmel: number = 0;
  currentIndexPont: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeCarousel();

    // Reinitialize when navigating to the same page
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initializeCarousel();
      }
    });
  }

  private initializeCarousel(): void {
    const imageCount = 6;

    this.imagesWemmel = Array.from(
      { length: imageCount },
      (_, i) => `assets/projects/wemmel/${i + 1}.jpg`
    );

    this.imagesPont = Array.from(
      { length: imageCount },
      (_, i) => `assets/projects/rue-pont/${i + 1}.jpg`
    );

    this.currentIndexWemmel = 0;
    this.currentIndexPont = 0;
  }

  goToSlide(type: string, index: number): void {
    if (type === 'wemmel') {
      this.currentIndexWemmel = index;
    } else if (type === 'pont') {
      this.currentIndexPont = index;
    }
  }

  prevSlide(type: string): void {
    if (type === 'wemmel') {
      this.currentIndexWemmel =
        (this.currentIndexWemmel - 1 + this.imagesWemmel.length) %
        this.imagesWemmel.length;
    } else if (type === 'pont') {
      this.currentIndexPont =
        (this.currentIndexPont - 1 + this.imagesPont.length) %
        this.imagesPont.length;
    }
  }

  nextSlide(type: string): void {
    if (type === 'wemmel') {
      this.currentIndexWemmel =
        (this.currentIndexWemmel + 1) % this.imagesWemmel.length;
    } else if (type === 'pont') {
      this.currentIndexPont =
        (this.currentIndexPont + 1) % this.imagesPont.length;
    }
  }
}
