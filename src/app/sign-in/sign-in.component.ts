import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "../services/user.service";

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

    showRedAlert = false;
    alertTitle = '';
    alertMessage = '';

    isBusy = false;

    user = {
        username: '',
        password: ''
    };

    constructor(private router: Router, private userService: UserService) {
        if (this.userService.isAuthenticated()) {
            console.log('User is already authenticated, navigating to events');
            this.router.navigate(['/events']);
        }
    }

    logIn() {
        this.isBusy = true;
        this.userService.authorize(this.user.username, this.user.password, () => {
            this.isBusy = false;
            this.router.navigate(['/events']);
        }, () => {
            this.isBusy = false;
            this.displayRedAlert();
        });
    }

    displayRedAlert() {
        this.alertTitle = 'Oops!';
        this.alertMessage = 'Incorrect username or password';
        this.showRedAlert = true;
    }

}
