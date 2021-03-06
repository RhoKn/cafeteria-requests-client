import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductType } from '../../models/productType';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-unit',
  templateUrl: './productType.component.html',
  styleUrls: ['./productType.component.css']
})
export class PTypeComponent implements OnInit {
  public ptypes: any = [];
  public ptype: ProductType;

  public reactiveForm: FormGroup;

  constructor(public rest: RestService, private route: ActivatedRoute,
     private router: Router,private formBuilder:FormBuilder) {
      this.ptype = new ProductType('');
  }

  ngOnInit() {

    if(this.getRole()){
      this.reactiveForm = this.formBuilder.group({
          type: ['', Validators.required]
      });
        this.getProductTypes();
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


  getProductTypes() {

      this.rest.getProductTypes().subscribe((data: {}) => {
          this.ptypes = data;
          this.ptypes = this.ptypes.types;
      });
    }
  deleteProductTypes(id) {
      this.rest.deleteProductType(id)
        .subscribe(res => {
            this.getProductTypes();
          }, (err) => {
            console.log(err);
          }
        );
  }

  createProductTypes() {
    this.ptype=this.reactiveForm.value;
      this.rest.createProductTypes(this.ptype).subscribe((result) => {
          this.router.navigate(['/productTypes']);
        }, (err) => {
          console.log(err);
        });
  }
}
