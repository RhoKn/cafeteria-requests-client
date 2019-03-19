import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../../models/request';
declare var $;

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-delivery-list',
    templateUrl: './deliveryList.component.html',
    styleUrls: ['./deliveryList.component.css']
})
export class DeliveriesListComponent implements OnInit {
    public deliveries: any = [];
    public users: any = [];
    public usersName = [];
    public requests: any = [];
    public dRoomsToV: any = [];

    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router,
        private refChange: ChangeDetectorRef, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        if (this.getRole()) {
            this.getRequests();
            this.getUsers();
            this.getDeliveries();
        } else {
            this.router.navigate(['/requests']);
        }
    }

    getDeliveries() {
        this.deliveries = [];
        this.rest.getDeliveries().subscribe((data: {}) => {
            this.deliveries = data;
            this.deliveries = this.deliveries.deliveries;
            for(let x = 0; x<this.deliveries.length;x++){

                this.dRoomsToV.push([]);
                this.deliveries[x].request.forEach((rq)=>{
                    this.requests.forEach(r => {
                        if(rq === r._id){
                            this.dRoomsToV[x].push(r.dRoom.dRoom);
                        }
                    });
                })
                this.users.forEach(usr => {
                    if (this.deliveries[x].bus.user === usr._id) {
                        this.usersName.push(usr.first_name + '' + usr.last_name);
                    }
                });
            }
            console.log(this.usersName)
            console.log(this.dRoomsToV)
            console.log(this.deliveries)
        });
    }

    getUsers() {
        this.users = [];
        this.rest.getUsers().subscribe((data: {}) => {
            this.users = data;
            this.users = this.users.users;
        });
    }

    getRequests() {
        this.requests = [];
        this.rest.getRequests().subscribe((data: {}) => {
            this.requests = data;
            this.requests = this.requests.requests;
            console.log(this.requests)
        });
    }

    deleteDl(id){
        this.rest.deleteDelivery(id)
        .subscribe(res => {
            this.getDeliveries();
          }, (err) => {
            console.log(err);
          }
        );
    }

    getRole() {
        if (this.rest.getRole() == 'Admin' || this.rest.getRole() == 'Chef' || this.rest.getRole() == 'Gerente') {
            return true;
        } else {
            return false;
        }
    }


}
