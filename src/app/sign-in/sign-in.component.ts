import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

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

    constructor(private router: Router, private apiService: APIService) {
        if (this.apiService.isAuthenticated()) {
            console.log('User is already authenticated, navigating to home');
            this.router.navigate(['/events']);
        }
    }

    logIn(form: NgForm) {
        this.isBusy = true;
        this.apiService.authorize(this.user.username, this.user.password, () => {
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
