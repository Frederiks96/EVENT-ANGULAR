import {Component, OnDestroy} from '@angular/core';
import { UserService } from "./user.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'es-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private tabs = ['Events', 'Login'];
  private currentIndex = 1;
  private subscription: Subscription;

  constructor(private userService: UserService) {
    this.subscription = userService.events.subscribe((value) => {
      if (value) {
        this.tabs = ['Home', 'Events', 'User'];
        this.currentIndex = 2;
      } else {
        this.tabs = ['Events', 'Login'];
        this.currentIndex = 1;
      }
    });
  }

  isActive(index: number) {
    return this.currentIndex == index;
  }

  onTabChange(newIndex: number) {
    this.currentIndex = newIndex;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
