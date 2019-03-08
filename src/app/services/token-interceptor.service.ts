import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {RestService} from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector:Injector) { }

  intercept(req,next){
    let rest=this.injector.get(RestService)
    let tokenizedReq=req.clone({
      setHeaders:{
        Authorization:`Bearer ${rest.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }

}
