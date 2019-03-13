import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DRoom } from '../../models/dRoom';


@Component({
    selector: 'app-droom',
    templateUrl: './dRooms.component.html',
    styleUrls: ['./dRooms.component.css']
})
export class DRoomsComponent implements OnInit {
    public title: String;
    public users: any = [];
    public dRooms: any = [];
    public dinning: DRoom;
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Usuarios';
        this.dinning = new DRoom( '', '', '','',0,'','',0);
    }

    ngOnInit() {
      if(this.getRole()){
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
        console.log(this.dinning);
        this.rest.createDRoom(this.dinning).subscribe((result) => {
            this.getDRooms();
          }, (err) => {
            console.log(err);
          });
    }


}
