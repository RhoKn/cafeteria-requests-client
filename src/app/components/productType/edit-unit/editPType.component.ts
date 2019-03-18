import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from '../../../models/productType';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './editPType.component.html',
  styleUrls: ['./editPType.component.css']
})
export class PTypeEditComponent implements OnInit {

  @Input()
  ptype: any = { };
  public reactiveForm:FormGroup;
  constructor(public rest: RestService, private route: ActivatedRoute,
     private router: Router,private fb: FormBuilder) {
       this.createForm();
     }

  ngOnInit() {
    if(this.getRole()){
      this.rest.getProductType(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.ptype = data;
        this.ptype = this.ptype.type;
        this.reactiveForm.get('type').setValue(this.ptype.type);
      });
    }else{
      this.router.navigate(['/requests']);
    }

  }

  getRole(){
    if(this.rest.getRole()=='Admin' || this.rest.getRole()=='Gerente'){
      return true;
    }else{
      return false;
    }
  }
  createForm(){
    this.reactiveForm = this.fb.group({
        type: ['', Validators.required]
    });
  }


  updatePType() {
    this.ptype=this.reactiveForm.value;
    this.rest.updateProductType(this.route.snapshot.params['id'], this.ptype).subscribe((result) => {
      this.router.navigate(['/productTypes']);
    }, (err) => {
      console.log(err);
    });
  }

}
