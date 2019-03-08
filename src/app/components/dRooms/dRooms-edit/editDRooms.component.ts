import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DRoom } from '../../../models/dRoom';


@Component({
  selector: 'app-droom-edit',
  templateUrl: './editDRooms.component.html',
  styleUrls: ['./editDRooms.component.css']
})
export class DRoomEditComponent implements OnInit {
  public users: any = [];
  dRoom: any = { };
  
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getUsers();
    this.rest.getDRoom(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.dRoom = data;
      this.dRoom = this.dRoom.droom;
      console.log(this.dRoom);
    });
  }

  getUsers() {
    this.users = [];
    this.rest.getUsers().subscribe((data: {}) => {
        this.users = data;
        this.users = this.users.users;
    });
}

  updateDRoom() {
    console.log(this.dRoom) 
    this.rest.updateDRoom(this.route.snapshot.params['id'], this.dRoom).subscribe((result) => {
      this.router.navigate(['/dinningRooms']);
    }, (err) => {
      console.log(err);
    });
  }

}
