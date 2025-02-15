import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AddressService } from '../shop/services/address.service';
import { Address } from '../types';
import { AuthService } from '../shop/services/auth.service';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent implements OnInit {
  accountForm: FormGroup;
  isSubmitting = false;
  userEmail: string | null = null;
  address: Address | null = null;
  isAddressLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private addressService: AddressService
  ) {
    // Initialize form
    this.accountForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [{ value: '', disabled: true }], // Make email field read-only
      street: [''],
      streetNumber: [''],
      postalCode: [''],
      city: [''],
      country: [''],
    });
  }

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail();

    if (!this.userEmail) {
      console.warn('User is not logged in. Redirecting to home...');
      return;
    }

    // Set email in the form
    this.accountForm.patchValue({ email: this.userEmail });

    this.loadAddress();
  }

  // Load the user's address
  loadAddress(): void {
    if (!this.userEmail) return;

    this.isAddressLoading = true;
    this.addressService.getAddressByUserEmail(this.userEmail).subscribe({
      next: (addressData) => {
        this.address = addressData;
        this.isAddressLoading = false;

        // Populate form with existing address data
        this.accountForm.patchValue({
          street: addressData.street,
          streetNumber: addressData.streetNumber,
          postalCode: addressData.postalCode,
          city: addressData.city,
          country: addressData.country,
        });
      },
      error: (error) => {
        console.error('Error fetching address:', error);
        this.isAddressLoading = false;
      },
    });
  }

  // Method to update address
  updateAddress() {
    if (this.accountForm.valid && this.address) {
      this.isSubmitting = true;

      const updatedAddress: Address = {
        id: this.address.id, // Keep the existing address ID
        userEmail: this.userEmail!, // Keep email unchanged
        ...this.accountForm.value, // Merge updated form values
      };
      if (!this.address.id) return;

      this.addressService.updateAddress(this.address.id, updatedAddress).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['/']); // Redirect after update
        },
        error: (error) => {
          console.error('Failed to update address', error);
          this.isSubmitting = false;
        },
      });
    }
  }
}
