import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-user',
    templateUrl: './productList.component.html',
    styleUrls: ['./productList.component.css']
})
export class ProductListComponent implements OnInit {
    public title: String;
    public products: any = [];
    public ptypes: any = [];
    public product: Product;
    public providers: any = [];
    public unitsToAdd: any = [];
    public providersToAdd: any = [];
    public x;
    public units: any = [];


    public reactiveForm: FormGroup;

    constructor(public rest: RestService, private route: ActivatedRoute,
      private router: Router,private formBuilder:FormBuilder) {
        this.title = 'Usuarios';
        this.product = new Product( '', [''], '', '', 0,['']);
    }

    ngOnInit() {

      if(this.getRole()){
        this.reactiveForm = this.formBuilder.group({
            name: ['', Validators.required],
            category: ['', Validators.required],
            description: ['', Validators.required],
            price: ['', Validators.required]
        });
          this.getProducts();
          this.getProductTypes();
          this.getTheUnits();
          this.getProviders();
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

    getProducts() {
        this.products = [];
        this.rest.getProducts().subscribe((data: {}) => {
            this.products = data;
            this.products = this.products.products;
            console.log(this.products)
        });
      }
    deleteProducts(id) {
        this.rest.deleteProduct(id)
          .subscribe(res => {
              this.getProducts();
            }, (err) => {
              console.log(err);
            }
          );
    }
    getProductTypes() {

        this.rest.getProductTypes().subscribe((data: {}) => {
            this.ptypes = data;
            this.ptypes = this.ptypes.types;
        });
      }

    createProducts() {
        this.product=this.reactiveForm.value;
        this.product.unit = this.unitsToAdd;
        this.product.provider = this.providersToAdd;
        console.log(this.product);
        this.rest.createProduct(this.product).subscribe((result) => {
            this.getProducts();
          }, (err) => {
            console.log(err);
          });
    }

    getProviders() {
        this.providers = [];
        this.rest.getProviders().subscribe((data: {}) => {
            this.providers = data;
            this.providers = this.providers.providers;
        });
      }
}
