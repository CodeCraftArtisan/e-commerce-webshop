import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shop/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sign-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.fb.group(
      {
        firstname: ['', [Validators.required, Validators.minLength(3)]],
        lastname: ['', [Validators.required, Validators.minLength(3)]],
        street: ['', Validators.required],
        streetNumber: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordComplexityValidator,
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Getters for easier template access
  get firstname() {
    return this.signUpForm.get('firstname')!;
  }
  get lastname() {
    return this.signUpForm.get('lastname')!;
  }
  get street() {
    return this.signUpForm.get('street')!;
  }
  get streetNumber() {
    return this.signUpForm.get('streetNumber')!;
  }
  get postalCode() {
    return this.signUpForm.get('postalCode')!;
  }
  get city() {
    return this.signUpForm.get('city')!;
  }
  get country() {
    return this.signUpForm.get('country')!;
  }
  get email() {
    return this.signUpForm.get('email')!;
  }
  get password() {
    return this.signUpForm.get('password')!;
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword')!;
  }

  // Custom Validators
  passwordComplexityValidator(control: any) {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const isValidLength = value.length >= 8;

    if (hasUpperCase && hasLowerCase && hasNumeric && isValidLength) {
      return null;
    } else {
      return { passwordComplexity: true };
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // Submit form and register user
  onSubmit() {
    if (this.signUpForm.valid) {
      this.isSubmitting = true;

      const {
        firstname,
        lastname,
        email,
        password,
        street,
        streetNumber,
        postalCode,
        city,
        country,
      } = this.signUpForm.value;

      // Call AuthService to register the user
      this.authService
        .register(
          firstname,
          lastname,
          email,
          password,
          street,
          streetNumber,
          postalCode,
          city,
          country
        )
        .subscribe(
          (response) => {
            console.log('Registration successful', response);
            this.isSubmitting = false;
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Registration failed', error);
            this.isSubmitting = false;
            alert('Registration failed. Please try again.');
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
