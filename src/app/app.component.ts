import { Component } from '@angular/core';

@Component({
  selector: 'es-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private tabs = ['Tab1', 'Tab2', 'Tab3'];
  private currentIndex = 0;

  constructor() {

  }

  isActive(index: number) {
    return this.currentIndex == index;
  }

  onTabChange(newIndex: number) {
    this.currentIndex = newIndex;
  }


}
