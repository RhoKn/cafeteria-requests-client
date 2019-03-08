import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../../models/unit';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrls: ['./unit.component.css']
})
export class UnitComponent implements OnInit {
  public title: String;
  public units: any = [];
  public unit: Unit;
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
    this.title = 'Unidades';
    this.unit = new Unit( '');
   }

  ngOnInit() {
    this.getUnits();
  }
  getUnits() {
      this.units = [];
      this.rest.getUnits().subscribe((data: {}) => {
          this.units = data;
          this.units = this.units.units;
          console.log(this.units);
      });
    }
  deleteUnit(id) {
      this.rest.deleteUnit(id)
        .subscribe(res => {
            this.getUnits();
          }, (err) => {
            console.log(err);
          }
        );
  }
  createUnit() {
      this.rest.createUnit(this.unit).subscribe((result) => {
          this.getUnits();
        }, (err) => {
          console.log(err);
        });
  }
}
