import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../../../models/unit';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './editUnit.component.html',
  styleUrls: ['./editUnit.component.css']
})
export class UnitEditComponent implements OnInit {

  @Input()
  unit: any = { };
  public reactiveForm:FormGroup;
  constructor(public rest: RestService, private route: ActivatedRoute,
     private router: Router,private fb: FormBuilder) {
       this.createForm();
      }

  ngOnInit() {
    if(this.getRole()){
      this.rest.getUnit(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.unit = data;
        this.unit = this.unit.unit;
        this.reactiveForm.get('name').setValue(this.unit.name);
        this.reactiveForm.get('weigh').setValue(this.unit.weigh);
      });
    }else{
      this.router.navigate(['/requests']);
    }
  }

  createForm(){
    this.reactiveForm = this.fb.group({
        name: ['', Validators.required],
        weigh: ['', Validators.required]
    });
  }

  getRole(){
    if(this.rest.getRole()=='Admin' || this.rest.getRole()=='Gerente'){
      return true;
    }else{
      return false;
    }
  }


  updateUnit() {
    this.unit=this.reactiveForm.value;
    this.rest.updateUnit(this.route.snapshot.params['id'], this.unit).subscribe((result) => {
      this.router.navigate(['/units']);
    }, (err) => {
      console.log(err);
    });
  }

}
