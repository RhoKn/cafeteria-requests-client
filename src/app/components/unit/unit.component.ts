import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../../models/unit';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  public reactiveForm: FormGroup;

  constructor(public rest: RestService, private route: ActivatedRoute,
    private router: Router,private formBuilder:FormBuilder) {
      this.title = 'Usuarios';
      this.unit = new Unit( '', this.value);
  }

  ngOnInit() {
    if(this.getRole()){
      this.reactiveForm = this.formBuilder.group({
          name: ['', Validators.required],
          weigh: ['', [Validators.required,Validators.min(1)]]
      });
        this.getTheUnits();
    }else{
      this.router.navigate(['/requests']);
    }
  }

  getRole(){
    if(this.rest.getRole()!='Compras' && this.rest.getRole()!='Chofer'){
      return true;
    }else{
      return false;
    }
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
      this.unit=this.reactiveForm.value;
      this.rest.createObject(this.unit,'units/create').subscribe((result) => {
          this.router.navigate(['/units']);
        }, (err) => {
          console.log(err);
        });
  }
}
