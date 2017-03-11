import {Component, OnDestroy} from '@angular/core';
import { UserService } from "../services/user.service";
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
    this.subscription = userService.events.subscribe((value) => {
      if (value == true) {
        this.router.navigate(['/home']);
      } else {
        this.router.navigate(['/signin']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
