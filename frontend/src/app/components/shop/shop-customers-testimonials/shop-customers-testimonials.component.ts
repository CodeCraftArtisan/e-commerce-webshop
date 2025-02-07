import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'shop-customers-testimonials',
    imports: [CommonModule],
    templateUrl: './shop-customers-testimonials.component.html',
    styleUrl: './shop-customers-testimonials.component.css'
})
export class ShopCustomersTestimonialsComponent {
  testimonials = [
    {
      id: 1,
      name: 'John Doe',
      location: 'New York, NY',
      feedback: 'Amazing products! The quality is top-notch, and the delivery was quick.'
    },
    {
      id: 2,
      name: 'Jane Smith',
      location: 'Los Angeles, CA',
      feedback: 'I absolutely love my new wireless headphones! The sound quality is incredible.'
    },
    {
      id: 3,
      name: 'Sam Wilson',
      location: 'Chicago, IL',
      feedback: 'Great customer service and fast shipping. Highly recommend this store!'
    },
    {
      id: 4,
      name: 'Sarah Lee',
      location: 'San Francisco, CA',
      feedback: 'The smartwatch I bought works perfectly and was easy to set up. Thank you!'
    }
  ];

  onViewDetails(testimonialId: number) {
    console.log(`View Details clicked for testimonial ID: ${testimonialId}`);
    // Logic for navigating to testimonial details can be added here
  }
}
