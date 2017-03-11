import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'es-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userService: UserService) { }

  isAuthenticated() {
    return this.userService.isAuthenticated();
  }

}
