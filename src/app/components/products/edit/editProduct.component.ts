import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user';


@Component({
  selector: 'app-user-edit',
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() user: any = { };
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getUser(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.user = data;
      this.user = this.user.user;
      console.log(this.user);
    });
  }

  updateUser() {
    this.rest.updateUser(this.route.snapshot.params['id'], this.user).subscribe((result) => {
      this.router.navigate(['/users']);
    }, (err) => {
      console.log(err);
    });
  }

}
