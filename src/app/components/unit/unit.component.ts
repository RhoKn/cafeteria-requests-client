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
      this.title = 'Usuarios';
      this.unit = new Unit( '');
  }

  ngOnInit() {
    if(this.getRole()){
        this.getTheUnits();
    }else{
      this.router.navigate(['/requests']);
    }
  }

  getRole(){
    if(this.rest.getRole()!='Compras'){
      return true;
    }else{
      return false;
    }
  }


  getTheUnits() {

      this.rest.getUnits().subscribe((data: {}) => {
          this.units = data;
          this.units = this.units.units;
          console.log(this.units)
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
    console.log(this.unit);
      this.rest.createObject(this.unit,'units/create').subscribe((result) => {
          this.getTheUnits();
        }, (err) => {
          console.log(err);
        });
  }
}
