import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewService } from '../../components/shop/services/review.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
})
export class RatingComponent {
  @Input() maxStars: number = 5;
  @Input() currentRating: number = 0;
  @Input() readOnly: boolean = false;
  @Input() productId!: string;
  @Output() ratingChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(private reviewService: ReviewService) {}

  setRating(starIndex: number): void {
    if (!this.readOnly) {
      this.currentRating = starIndex;
      this.ratingChange.emit(this.currentRating);

      // Simplified payload for the backend
      const review = {
        productId: this.productId,
        userEmail: 'user@example.com',
        rating: this.currentRating,
      };

      this.reviewService.createReview(review).subscribe({
        next: (response) => console.log('Review created:', response),
        error: (error) => console.error('Error creating review:', error),
      });
    }
  }
}
