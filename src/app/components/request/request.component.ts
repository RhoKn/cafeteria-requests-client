import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../models/request';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
    public title: String;
    public requests: any = [];
    public products: any = [];
    public dRooms: any = [];
    public selected: any = [{}];
    public request: Request;
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Usuarios';
        this.request = new Request( '', [{}]);
    }

    ngOnInit() {
        this.getProducts();
        this.getDRooms();
        this.getRequests();
    }

    getRequests() {
        this.requests = [];
        this.rest.getRequests().subscribe((data: {}) => {
            this.requests = data;
            this.requests = this.requests.requests;
            
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

    getDRooms() {
        this.dRooms = [];
        this.rest.getDRooms().subscribe((data: {}) => {
            this.dRooms = data;
            this.dRooms = this.dRooms.dRooms;
            
            
        });
    }

    addProduct(name,unit){

        this.selected.push({name:name,unit:unit});
    }

    deleteRequest(id) {
        this.rest.deleteRequest(id)
          .subscribe(res => {
              this.getRequests();
            }, (err) => {
              console.log(err);
            }
          );
    }

    createRequest() {
        this.request.products = this.selected;
        console.log(this.request);
        this.rest.createRequest(this.request).subscribe((result) => {
            this.getRequests();
          }, (err) => {
            console.log(err);
          });
    }
}
