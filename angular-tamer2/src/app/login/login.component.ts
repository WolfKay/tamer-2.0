import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    user: User = {
        email: 'admin3@gmail.com',
        password: '123'
    };

    constructor() { }

    ngOnInit() {
    }

}
