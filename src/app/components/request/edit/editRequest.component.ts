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

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getRequest(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.req = data;
      this.req = this.req.request;
      this.selected = this.req.products;
      console.log('********')
      console.log(this.req)
    });
    this.getProducts();
    this.getDRooms();

  }

  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
        this.products = data;
        this.products = this.products.products;
        console.log(this.products)
    });
  }
  addProduct(name,unit){

    this.selected.push({name:name,unit:unit});
}
getDRooms() {
  this.dRooms = [];
  this.rest.getDRooms().subscribe((data: {}) => {
      this.dRooms = data;
      this.dRooms = this.dRooms.dRooms;
      
      
  });
}
deleteItem(item){
  this.selected.splice(item,1);
}

  updateRequest() {
    this.req.products = this.selected;
    this.rest.updateRequest(this.route.snapshot.params['id'], this.req).subscribe((result) => {
      this.router.navigate(['/requests']);
    }, (err) => {
      console.log(err);
    });
  }


}

