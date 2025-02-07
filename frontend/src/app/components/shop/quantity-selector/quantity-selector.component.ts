import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-quantity-selector',
    imports: [],
    templateUrl: './quantity-selector.component.html',
    styleUrl: './quantity-selector.component.css'
})
export class QuantitySelectorComponent {
  @Input() quantity: number = 1; // Default quantity
  @Input() min: number = 1; // Minimum quantity
  @Input() max: number = 100; // Maximum quantity
  @Output() quantityChange = new EventEmitter<number>();

  decrement(): void {
    if (this.quantity > this.min) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  increment(): void {
    if (this.quantity < this.max) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  onInputChange(event: Event): void {
    const inputValue = +(event.target as HTMLInputElement).value;
    if (inputValue >= this.min && inputValue <= this.max) {
      this.quantity = inputValue;
      this.quantityChange.emit(this.quantity);
    } else {
      (event.target as HTMLInputElement).value = this.quantity.toString(); // Reset invalid input
    }
  }
}
