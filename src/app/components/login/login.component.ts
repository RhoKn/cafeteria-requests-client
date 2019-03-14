import { Component, OnInit } from '@angular/core';

import {Router,ActivatedRoute} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { RestService } from '../../rest.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public tittle: String;
      loginUserData={}
    constructor(private rest:RestService,private router:Router) {
        this.tittle = 'Inicio de sesión';
    }

    ngOnInit() {
        console.log('Componente de inicio de sesión');
        if(this.rest.loggedIn()){
          this.router.navigate(['/users']);
          return true;
        }else{
          this.router.navigate(['/login']);
          return false;
        }
    }

    loginUser(){
      this.rest.loginUser(this.loginUserData)
      .subscribe(
        res=>{
          localStorage.setItem('token',res.token);
          localStorage.setItem('role',res.role);
          localStorage.setItem('name',res.person);
          this.router.navigate([`/users`]);
        },
        err=>console.log(err)
      );
    }
}
