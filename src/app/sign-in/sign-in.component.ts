import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from "../user.service";
import { Router } from "@angular/router";

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

  user = {
    username: 's123456',
    password: 'password'
  };

  constructor(private userService: UserService, private router: Router) {
    if (this.userService.isAuthenticated()) {
      console.log("User is already authenticated, navigating to home");
      this.router.navigate(['/home']);
    }
  }

  logIn(form: NgForm) {
    this.userService.signIn('','');
    this.router.navigate(['/home'])
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
    this.alertMessage = 'Successfully signed in: '+username;
    this.showGreenAlert = true;
  }

  ngOnInit() {

  }

  signup() {

  }

}
