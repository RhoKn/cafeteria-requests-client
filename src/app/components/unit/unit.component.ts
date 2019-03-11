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
  public value: Number;

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
      this.title = 'Usuarios';
      this.unit = new Unit( '', this.value);
  }

  ngOnInit() {
      this.getTheUnits();
  }

  getTheUnits() {

      this.rest.getUnits().subscribe((data: {}) => {
          this.units = data;
          this.units = this.units.units;
      });
    }
  deleteUnits(id) {
      this.rest.deleteUnit(id)
        .subscribe(res => {
            this.getTheUnits();
          }, (err) => {
            console.log(err);
          }
        );
  }

  createUnits() {
      this.rest.createUnit(this.unit).subscribe((result) => {
          this.getTheUnits();
        }, (err) => {
          console.log(err);
        });
  }
}





