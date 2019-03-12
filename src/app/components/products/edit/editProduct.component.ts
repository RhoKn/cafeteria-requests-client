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
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getProduct(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.product = data;
      this.product = this.product.product;
      console.log(this.product);
    });
    this.getTheUnits();
    this.getProductTypes();
  }

  updateProduct() {
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


}
