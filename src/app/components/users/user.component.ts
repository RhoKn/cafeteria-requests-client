import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    public title: String;
    public users: any = [];
    public user: User;
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Usuarios';
        this.user = new User( '', '', '', '', '', '');
    }

    ngOnInit() {
      if(this.getRole()){
        this.getUsers();
      }else{
        this.router.navigate(['/requests']);
      }
    }

    getRole(){
      if(this.rest.getRole()=='Admin'){
        return true;
      }else{
        return false;
      }
    }


    getUsers() {
        this.users = [];
        this.rest.getUsers().subscribe((data: {}) => {
            this.users = data;
            this.users = this.users.users;
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
        this.rest.createObject(this.user,'users/register').subscribe((result) => {
          console.log("as");
            this.getUsers();
          }, (err) => {
            console.log(err);
          });
    }



}
