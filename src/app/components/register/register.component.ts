import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { global } from '../../services/global';
import { RestService } from '../../rest.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {
    public tittle: String;
    public user: User;

    constructor(
        public rest: RestService, private route: ActivatedRoute, private router: Router
    ) {
        this.tittle = 'Registro';
        this.user = new User( '', '', '', '', '', '');
    }

    ngOnInit() {
        console.log('Componente de registro');
    }

    addProduct() {
        this.rest.createUser(this.user).subscribe((result) => {
            this.router.navigate(['/users']);
          }, (err) => {
            console.log(err);
          });
    }
}





