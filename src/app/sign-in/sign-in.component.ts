import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { APIService } from '../services/api.service';

@Component({
    selector: 'sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    private showRedAlert = false;
    private showGreenAlert = false;
    private alertTitle = '';
    private alertMessage = '';

    private isBusy = false;

    user = {
        username: '',
        password: ''
    };

    constructor(private router: Router, private apiService: APIService) {
        if (this.apiService.isAuthenticated()) {
            console.log("User is already authenticated, navigating to home");
            this.router.navigate(['/home']);
        }
    }

    logIn(form: NgForm) {
        this.isBusy = true;
        this.apiService.authorize(this.user, () => {
            this.isBusy = false;
            this.router.navigate(['/home']);
        }, () => {
            this.isBusy = false;
            this.displayRedAlert();
        });
    }

    displayRedAlert() {
        this.showGreenAlert = false;
        this.alertTitle = 'Oops!';
        this.alertMessage = 'Incorrect username or password';
        this.showRedAlert = true;
    }

    displayGreenAlert(username: string) {
        this.showRedAlert = false;
        this.alertTitle = 'Success!';
        this.alertMessage = 'Successfully signed in: ' + username;
        this.showGreenAlert = true;
    }

    ngOnInit() {

    }

    signup() {

    }

}
