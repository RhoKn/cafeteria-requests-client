import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.css']
})
export class EditProductComponent implements OnInit {

  @Input() product: any = { };
  public units: any = [];
  public ptypes: any = [];

  public providers: any = [];
  public unitsToAdd: any = [];
  public providersToAdd: any = [];
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

    if(this.getRole()){
      this.rest.getProduct(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.product = data;
        this.product = this.product.product;
        console.log(this.product);
      });
      this.getTheUnits();
      this.getProductTypes();
      this.getProviders();
      this.product.unit = this.unitsToAdd;
      this.product.provider = this.providersToAdd;
    }else{
      this.router.navigate(['/requests']);
    }
  }

  getRole(){
    if(this.rest.getRole()!='Compras' && this.rest.getRole()!='Chofer' && this.rest.getRole()!='Chef'){
      return true;
    }else{
      return false;
    }
  }

  updateProduct() {

    this.product.unit = this.unitsToAdd;
    this.product.provider = this.providersToAdd;
    this.rest.updateProduct(this.route.snapshot.params['id'], this.product).subscribe((result) => {
      this.router.navigate(['/products']);
    }, (err) => {
      console.log(err);
    });
  }
  getTheUnits() {

    this.rest.getUnits().subscribe((data: {}) => {
        this.units = data;
        this.units = this.units.units;
    });
  }
  getProductTypes() {

    this.rest.getProductTypes().subscribe((data: {}) => {
        this.ptypes = data;
        this.ptypes = this.ptypes.types;
    });
  }

  addProvider(provId){
    this.providersToAdd.push(provId)
    console.log(this.providersToAdd)
    //this.product.providers.push(provId);
}
addUnit(unitId){
    this.unitsToAdd.push(unitId)
    console.log(this.unitsToAdd)
    //
}
getProviders() {
  this.providers = [];
  this.rest.getProviders().subscribe((data: {}) => {
      this.providers = data;
      this.providers = this.providers.providers;
  });
}


}
