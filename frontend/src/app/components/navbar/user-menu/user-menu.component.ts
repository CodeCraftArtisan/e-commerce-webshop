import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core'; // Adding OnInit for debugging
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../shop/services/auth.service';

@Component({
  selector: 'app-user-menu',
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (!this.authService) {
      console.error('AuthService is not injected');
    }
  }

  isUserAuth(): boolean {
    return this.authService.isUserAuthenticated();
  }
}
