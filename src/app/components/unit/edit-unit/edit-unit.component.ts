import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../../../models/unit';

@Component({
  selector: 'app-edit-unit',
  templateUrl: './edit-unit.component.html',
  styleUrls: ['./edit-unit.component.css']
})
export class EditUnitComponent implements OnInit {

  @Input() unit: any = { };
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.rest.getUnit(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.unit = data;
      this.unit = this.unit.unit;
      console.log(this.unit);
    });
  }

  updateUnit() {
    this.rest.updateUnit(this.route.snapshot.params['id'], this.unit).subscribe((result) => {
      this.router.navigate(['/units']);
    }, (err) => {
      console.log(err);
    });
  }

}
