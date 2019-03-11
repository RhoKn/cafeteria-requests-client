import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './editUser.component.html',
  styleUrls: ['./editUser.component.css']
})
export class UserEditComponent implements OnInit {

  @Input() user: any = { };
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    if(this.getRole()){
      this.rest.getUser(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.user = data;
        this.user = this.user.user;
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


  updateUser() {
    this.rest.updateUser(this.route.snapshot.params['id'], this.user).subscribe((result) => {
      this.router.navigate(['/users']);
    }, (err) => {
      console.log(err);
    });
  }

}
