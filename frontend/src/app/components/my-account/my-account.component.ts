import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
})
export class MyAccountComponent {
  accountForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialisation du formulaire
    this.accountForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      street: [''],
      streetNumber: [''],
      postalCode: [''],
      city: [''],
      country: [''],
    });
  }

  // Méthode pour envoyer les modifications au backend
  onSaveChanges() {
    if (this.accountForm.valid) {
      this.isSubmitting = true;

      // Récupérer les données du formulaire
      const formValues = this.accountForm.value;

      // Envoyer les données modifiées au backend
      this.http
        .put('http://localhost:8080/api/v1/auth/update', formValues)
        .subscribe(
          (response) => {
            this.isSubmitting = false;
            // rediriger l'utilisateur ou afficher un message de succès
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Échec de la mise à jour des données', error);
            this.isSubmitting = false;
          }
        );
    }
  }
}
