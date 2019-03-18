import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DRoom } from '../../../models/dRoom';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-droom-edit',
  templateUrl: './editDRooms.component.html',
  styleUrls: ['./editDRooms.component.css']
})
export class DRoomEditComponent implements OnInit {
  public users: any = [];
  dRoom: any = { };
  public reactiveForm: FormGroup;
  constructor(public rest: RestService, private route: ActivatedRoute,
     private router: Router,private formBuilder:FormBuilder) {
       this.createForm();
     }

  ngOnInit() {

    if(this.getRole()){
      this.getUsers();
      this.rest.getDRoom(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.dRoom = data;
        this.dRoom = this.dRoom.droom;
        this.reactiveForm.get('dRoom').setValue(this.dRoom.dRoom);
        this.reactiveForm.get('observations').setValue(this.dRoom.observations);
        this.reactiveForm.get('street').setValue(this.dRoom.street);
        this.reactiveForm.get('street_number').setValue(this.dRoom.street_number);
        this.reactiveForm.get('suite_number').setValue(this.dRoom.suite_number);
        this.reactiveForm.get('colony').setValue(this.dRoom.colony);
        this.reactiveForm.get('postal_code').setValue(this.dRoom.postal_code);
      });
    }else{
      this.router.navigate(['/requests']);
    }
  }

  createForm(){
    this.reactiveForm = this.formBuilder.group({
        user: ['', Validators.required],
        dRoom: ['', Validators.required],
        observations: ['', Validators.required],
        street: ['', [Validators.required,Validators.minLength(3)]],
        street_number: ['',[Validators.required,Validators.minLength(3)]],
        suite_number:[],
        colony: ['', [Validators.required, Validators.minLength(3)]],
        postal_code: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(5)]]
    });
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

  updateDRoom() {
    this.reactiveForm.value.user=this.dRoom.user;
    this.dRoom=this.reactiveForm.value;
    this.rest.updateDRoom(this.route.snapshot.params['id'], this.dRoom).subscribe((result) => {
      this.router.navigate(['/dinningRooms']);
    }, (err) => {
      console.log(err);
    });
  }

}
