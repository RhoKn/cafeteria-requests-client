import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';

@Component({
    selector: 'app-user',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    public title: String;
    public products: any = [];
    public ptypes: any = [];
    public product: Product;
    public providers: any = [];
    public x;
    public units: any = [];
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Usuarios';
        this.product = new Product( '', '', '', 0, '');
    }

    ngOnInit() {
        this.getProducts();
        this.getProductTypes();
        this.getTheUnits();
        this.getProviders();
    }

    getTheUnits() {

        this.rest.getUnits().subscribe((data: {}) => {
            this.units = data;
            this.units = this.units.units;
        });
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
