import { Component } from '@angular/core';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@Component({
    selector: 'authenticate',
    imports: [SignInComponent, SignUpComponent],
    templateUrl: './authenticate.component.html',
    styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent {

}
