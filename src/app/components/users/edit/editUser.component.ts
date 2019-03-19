import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class UserEditComponent implements OnInit {

  @Input()
  user: any = { };
  public prueba;
  public filro=[{user_type:"Admin"},
                {user_type:"Gerente"},
                {user_type:"Chef"},
                {user_type:"Compras"},
                {user_type:"Chofer"}];

  public filroles;
  public reactiveForm:FormGroup;
  constructor(public rest: RestService, private route: ActivatedRoute,
    private router: Router,private fb: FormBuilder) {
       this.createForm();
    }

  ngOnInit() {

    if(this.getRole()){
      this.rest.getUser(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.user = data;
        this.user = this.user.user;
        this.reactiveForm.get('first_name').setValue(this.user.first_name);
        this.reactiveForm.get('last_name').setValue(this.user.last_name);
        this.reactiveForm.get('nick_name').setValue(this.user.nick_name);
        this.reactiveForm.get('email').setValue(this.user.email);
        this.prueba=this.user.user_type;
        this.filroles=this.filro.filter(n=>n.user_type!=this.user.user_type);
      })
    }else{
      this.router.navigate(['/requests']);
    }
  }

  createForm(){
    this.reactiveForm = this.fb.group({
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        nick_name: ['', [Validators.required,Validators.minLength(5)]],
        user_type: [],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getRole(){
    if(this.rest.getRole()=='Admin'){
      return true;
    }else{
      return false;
    }
  }


  updateUser() {
    this.rest.updateUser(this.route.snapshot.params['id'], this.user).subscribe((result) => {
      this.router.navigate(['/users']);
    }, (err) => {
      console.log(err);
    });
  }

}
