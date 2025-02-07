import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shop/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'sign-in',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './sign-in.component.html',
    styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  signInForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.signInForm.get('email')!;
  }

  get password() {
    return this.signInForm.get('password')!;
  }

  onSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
  
      this.authService.login(email, password).subscribe({
        next: token => {
          console.log('Login successful, token received:', token);
          this.router.navigate(['/']); 
          // You can navigate to another page, store the token, or update UI here
        },
        error: err => {
          console.error('Login failed:', err);
        }
      });
  
    } else {
      console.log('Form is invalid');
    }
  }
  
}
