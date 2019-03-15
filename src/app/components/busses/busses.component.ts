import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from '../../models/bus';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-busses',
  templateUrl: './busses.component.html',
  styleUrls: ['./busses.component.css']
})
export class BussesComponent implements OnInit {

  public title: String;
  public busses: any = [];
  public bus: Bus;
  public users: any = [];
  public reactiveForm: FormGroup;

  constructor(public rest: RestService, private route: ActivatedRoute,
    private router: Router,private formBuilder:FormBuilder) {
      this.title = 'Usuarios';
      this.bus = new Bus( 0,'','');

     }

  ngOnInit() {
    if(this.getRole()){
      this.reactiveForm = this.formBuilder.group({
          space_box: ['', Validators.required],
          user: ['', Validators.required],
          license_plate: ['', Validators.required]
      });
        this.getTheBusses();
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

  getTheBusses() {
      this.rest.getBusses().subscribe((data: {}) => {
          this.busses = data;
          this.busses = this.busses.busses;
      });
    }

  createBusses() {
      this.bus=this.reactiveForm.value;
      this.rest.createBus(this.bus).subscribe((result) => {
          this.getTheBusses();
        }, (err) => {
          console.log(err);
        });
  }

  getUsers() {
      this.users = [];
      this.rest.getUsers().subscribe((data: {}) => {
          this.users = data;
          this.users = this.users.users;
          this.users=this.users.filter(n => n.user_type=='Chofer');
      });
  }
  deleteBus(id) {
      this.rest.deleteBus(id)
        .subscribe(res => {
            this.getTheBusses();
          }, (err) => {
            console.log(err);
          }
        );
  }
}
