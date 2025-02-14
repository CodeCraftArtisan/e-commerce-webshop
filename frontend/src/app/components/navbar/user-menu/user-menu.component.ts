import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../shop/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-menu',
  imports: [RouterModule, TranslateModule, CommonModule],
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css'],
})
export class UserMenuComponent implements OnInit, OnDestroy {
  private authStatusSubscription: Subscription = new Subscription();
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the auth status observable
    this.authStatusSubscription = this.authService.authStatus$.subscribe(
      (authStatus) => {
        this.isAuthenticated = authStatus;
      }
    );
  }

  isUserAuth(): boolean {
    return this.authService.isUserAuthenticated();
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    // Always clean up the subscription when the component is destroyed
    this.authStatusSubscription.unsubscribe();
  }
}
