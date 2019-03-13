import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './editRequest.component.html',
  styleUrls: ['./editRequest.component.css']
})
export class RequestEditComponent implements OnInit {

  @Input() req: any = Request;
  public products: any = [];
    public dRooms: any = [];
    public selected: any = [{}];

    public pSelected: any ={};
    public pSelected2: any={};
    public pToAdd: any ={};
    public ptypes: any = [];

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getRequest(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.req = data;
      this.req = this.req.request;
      this.selected = this.req.products;
    });
    this.getProducts();
    this.getDRooms();
    this.getProductTypes();

  }

  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
        this.products = data;
        this.products = this.products.products;
        console.log(this.products)
    });
  }
  
  addProduct(prod){
    this.pSelected = prod.unit;
    this.pSelected2 = prod.provider;
    this.pToAdd.name = prod.name;
    console.log(this.pSelected);
    //this.selected.push({name:name,unit:unit});
}
addToList(){
    this.selected.push(this.pToAdd);
    this.pToAdd = {};
}

deleteElement(i){
  this.selected.splice(i,1);
}

getDRooms() {
  this.dRooms = [];
  this.rest.getDRooms().subscribe((data: {}) => {
      this.dRooms = data;
      this.dRooms = this.dRooms.dRooms;
      
      
  });
}


  updateRequest() {
    this.req.products = this.selected;
    this.rest.updateRequest(this.route.snapshot.params['id'], this.req).subscribe((result) => {
      this.router.navigate(['/requests']);
    }, (err) => {
      console.log(err);
    });
  }
  getProductTypes() {

    this.rest.getProductTypes().subscribe((data: {}) => {
        this.ptypes = data;
        this.ptypes = this.ptypes.types;
        console.log(this.ptypes)
    });
  }

}

