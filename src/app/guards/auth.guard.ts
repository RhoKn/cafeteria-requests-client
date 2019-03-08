import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {RestService} from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private rest:RestService, private router:Router) { }

  canActivate():boolean{
    if(this.rest.loggedIn()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }



  }
}
