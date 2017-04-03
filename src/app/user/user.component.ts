import { Component, OnInit } from '@angular/core';
import { APIService } from "../../services/api.service";

@Component({
    selector: 'es-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    private fields = ['FIRST NAME', 'LAST NAME', 'EMAIL', 'STUDYNUMBER','ROLE'];
    private user = ['Jacob', 'Nordfalk','jacno@dtu.dk','-','Teacher'];

    constructor(private apiService: APIService) {

    }

    ngOnInit() {
        /*
        this.apiService.getUser(response => {
           console.log(response.text());
        }, error => {
            console.log(error.text());
        });
        */
    }

}
