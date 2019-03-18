import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DRoom } from '../../../models/dRoom';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-droom-list',
    templateUrl: './dRoomsList.component.html',
    styleUrls: ['./dRoomsList.component.css']
})
export class DRoomsListComponent implements OnInit {
    public title: String;
    public users: any = [];
    public dRooms: any = [];
    public dinning: DRoom;

    public reactiveForm: FormGroup;

    constructor(public rest: RestService, private route: ActivatedRoute,
       private router: Router,private formBuilder:FormBuilder) {
        this.title = 'Usuarios';
        this.dinning = new DRoom( '', '', '','',0,'','',0);
    }

    ngOnInit() {
      if(this.getRole()){
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
          this.getUsers();
          this.getDRooms();
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
    getDRooms() {
        this.dRooms = [];
        this.rest.getDRooms().subscribe((data: {}) => {
            this.dRooms = data;
            this.dRooms = this.dRooms.dRooms;
        });
    }
    deleteDRoom(id) {
        this.rest.deleteDRoom(id)
          .subscribe(res => {
              this.getDRooms();
            }, (err) => {
              console.log(err);
            }
          );
    }

    createDRoom() {
        this.dinning=this.reactiveForm.value;
        this.rest.createDRoom(this.dinning).subscribe((result) => {
            this.getDRooms();
          }, (err) => {
            console.log(err);
          });
    }


}
