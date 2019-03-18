import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';



import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    public title: String;
    public users: any = [];
    public user: User;

    public reactiveForm: FormGroup;

    constructor(public rest: RestService, private route: ActivatedRoute,
      private router: Router, private formBuilder:FormBuilder) {
        this.title = 'Usuarios';
        this.user = new User( '', '', '', '', '', '');
    }

    ngOnInit() {
      if(this.getRole()){
        this.reactiveForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            nick_name: ['', [Validators.required,Validators.minLength(5)]],
            user_type: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });

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
      this.user=this.reactiveForm.value;
        this.rest.createObject(this.user,'users/register').subscribe((result) => {
          this.router.navigate(['/users']);
          }, (err) => {
            console.log(err);
          });
    }



}
