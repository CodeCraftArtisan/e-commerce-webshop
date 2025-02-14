import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  TranslateModule,
  TranslateService,
  LangChangeEvent,
} from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shop-customers-testimonials',
  imports: [CommonModule, TranslateModule],
  templateUrl: './shop-customers-testimonials.component.html',
  styleUrl: './shop-customers-testimonials.component.css',
})
export class ShopCustomersTestimonialsComponent implements OnInit, OnDestroy {
  testimonials: any[] = [];
  private langChangeSubscription!: Subscription;

  constructor(private translate: TranslateService) {}

  /**
   * Initialize the component and load translations.
   */
  ngOnInit() {
    this.loadTranslations();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(
      (event: LangChangeEvent) => {
        this.loadTranslations();
      }
    );
  }

  /**
   * Clean up the subscription when the component is destroyed.
   */
  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
  }

  /**
   * Load translations for the testimonials.
   */
  private loadTranslations() {
    this.translate.get('testimonials.list').subscribe((translations) => {
      this.testimonials = translations;
    });
  }

  /**
   * Handle the view details action for a testimonial.
   * @param testimonialId - The ID of the testimonial to view details for.
   */
  onViewDetails(testimonialId: number) {
    console.log(`View Details clicked for testimonial ID: ${testimonialId}`);
    // Logic for navigating to testimonial details can be added here
  }
}
