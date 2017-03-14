import { Component } from '@angular/core';
import { APIService } from "../../services/api.service";

@Component({
  selector: 'es-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private apiService: APIService) { }

  isAuthenticated() {
    return this.apiService.isAuthenticated();
  }

}
