import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from '../../../models/bus';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-busses-edit',
  templateUrl: './editBusses.component.html',
  styleUrls: ['./editBusses.component.css']
})
export class BussesEditComponent implements OnInit {

  bus:any = {}
  public updatedbus:any=[];
  public users: any = [];
  public updateForm:FormGroup;
  public prueba;
  public filusers:any=[];

  constructor(public rest: RestService, private route: ActivatedRoute,
     private router: Router,private fb: FormBuilder) {
         this.createForm();
  }


  createForm(){
    this.updateForm=this.fb.group({
      space_box: ['', [Validators.required,Validators.min(1)]],
      user: [],
      license_plate: ['', [Validators.required,Validators.minLength(7),Validators.maxLength(7)]]
    });
  }



  ngOnInit() {

    if(this.getRole()){
        this.getUsers();
        this.rest.getBus(this.route.snapshot.params['id']).subscribe((data: {}) => {
          this.bus = data;
          this.bus = this.bus.bus;
          this.updateForm.get('space_box').setValue(this.bus.space_box);
          this.updateForm.get('license_plate').setValue(this.bus.license_plate);
          this.prueba=this.bus.user;
      });
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
          this.users=this.users.filter(n => n.user_type=='Chofer');
          this.filusers=this.users.filter(n=>n._id!=this.bus.user);
      });

    }


    updatedBus() {
      this.updateForm.value.user=this.bus.user;
      this.bus=this.updateForm.value;
      this.rest.updateBus(this.route.snapshot.params['id'], this.bus).subscribe((result) => {
        this.router.navigate(['/busses']);
      }, (err) => {
        console.log(err);
      });
    }

}
