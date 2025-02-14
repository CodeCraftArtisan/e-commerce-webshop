import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'checkout-success-page',
  imports: [RouterModule, TranslateModule],
  templateUrl: './checkout-success-page.component.html',
  styleUrl: './checkout-success-page.component.css',
})
export class CheckoutSuccessPageComponent {}
