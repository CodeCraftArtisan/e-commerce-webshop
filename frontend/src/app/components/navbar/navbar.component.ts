import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LanguageMenuComponent } from './language-menu/language-menu.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterModule,
    CommonModule,
    LanguageMenuComponent,
    MobileMenuComponent,
    UserMenuComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {}
}
