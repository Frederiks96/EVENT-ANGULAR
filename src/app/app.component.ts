import {Component, OnDestroy} from '@angular/core';
import { UserService } from "./user.service";
import { Subscription } from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'es-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private subscription: Subscription;

  constructor(private userService: UserService, private router: Router) {
    this.router.navigate(['/signin']);
    this.subscription = userService.events.subscribe((value) => {
      console.log("Emitted event with value: " + value);
      if (value == true) {
        console.log("Value was true");
      } else {
        console.log("Value was false, navigating to signin");
        this.router.navigate(['/']);
      }
    });
  }

  isAuthenticated() {
    return this.userService.isAuthenticated();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
