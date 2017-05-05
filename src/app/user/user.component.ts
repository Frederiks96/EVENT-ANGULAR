import { Component, OnInit } from '@angular/core';
import {APIService} from '../services/api.service';
import {User} from './user';
import {UserService} from '../services/user.service';

@Component({
    selector: 'es-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    fields = ['FIRST NAME', 'LAST NAME', 'EMAIL', 'STUDENT ID'];
    user = ['', '', '', ''];

    showGreenAlert = false;
    alertTitle = '';
    alertMessage = '';

    constructor(private apiService: APIService, private userService: UserService) {}

    ngOnInit()
    {
        const user = this.apiService.getCurrentUser();

        this.user[0] = user.getFirstname();
        this.user[1] = user.getLastname();
        this.user[2] = user.getEmail();
        this.user[3] = user.getUsername();
    }

    onSubmit() {
        const newUser = new User(this.apiService.getCurrentUser().getID(), this.user[3], this.user[0], this.user[1], this.user[2]);
        this.userService.update(newUser, success => {
            if (success)
            {
                this.alertTitle = 'Success!';
                this.alertMessage = 'Your informations have been updated!';
                this.showGreenAlert = true;
            } else {
                console.log('Error');
            }
        });
    }

    dismissAlert() {
        this.showGreenAlert = false;
    }

}
