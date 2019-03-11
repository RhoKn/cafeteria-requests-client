import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
    selector: 'app-user',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    public title: String;
    public users: any = [];
    public user: User;
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Usuarios';
        this.user = new User( '', '', '', '', '', '');
    }

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.users = [];
        this.rest.getUsers().subscribe((data: {}) => {
            this.users = data;
            this.users = this.users.users;
            console.log(this.users);
        });
      }
    deleteUser(id) {
        this.rest.deleteUser(id)
          .subscribe(res => {
              this.getUsers();
            }, (err) => {
              console.log(err);
            }
          );
    }

    createUser() {
        this.rest.createUser(this.user).subscribe((result) => {
            this.getUsers();
          }, (err) => {
            console.log(err);
          });
    }
}
