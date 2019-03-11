import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './editPType.component.html',
  styleUrls: ['./editPType.component.css']
})
export class PTypeEditComponent implements OnInit {

  @Input() ptype: any = { };
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getProductType(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.ptype = data;
      this.ptype = this.ptype.type;
    });
  }

  updatePType() {
    this.rest.updateProductType(this.route.snapshot.params['id'], this.ptype).subscribe((result) => {
      this.router.navigate(['/productTypes']);
    }, (err) => {
      console.log(err);
    });
  }

}
