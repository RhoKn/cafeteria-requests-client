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
    public dRoom: DRoom;
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Usuarios';
        this.dRoom = new DRoom( '', '', '');
    }

    ngOnInit() {
        this.getUsers();
        this.getDRooms();
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
        console.log(this.dRoom)
        this.rest.createDRoom(this.dRoom).subscribe((result) => {
            this.getDRooms();
          }, (err) => {
            console.log(err);
          });
    }
}
