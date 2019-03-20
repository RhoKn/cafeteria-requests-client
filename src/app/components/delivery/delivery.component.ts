import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../models/request';
declare var $;

import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-delivery',
    templateUrl: './delivery.component.html',
    styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
    public providers: any = [];
    public flag=0;
    public $: any;
    public requests: any = [];
    public products: any = [];
    public dRooms: any = [];
    public plates: any;
    public box_size: any;
    public busses: any = [];
    public delivery: any = {};
    public searcher;
    public searched;
    public added = false;
    public prodAdded: any = [];

    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router,
        private refChange: ChangeDetectorRef, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        if (this.getRole()) {
            this.getProducts();
            this.getDRooms();
            this.getRequests();
            this.getProviders();
            this.getTheBusses();
            this.searcher = $('.driverSearcher').select2();
            this.searcher.on('select2:select', function (e) {
                document.getElementById('searcherTrigger').click();
            });
        } else {
            this.router.navigate(['/requests']);
        }
    }

    getRole() {
        if (this.rest.getRole() == 'Admin' || this.rest.getRole() == 'Chef' || this.rest.getRole() == 'Gerente') {
            return true;
        } else {
            return false;
        }
    }

    getProviders() {
        this.providers = [];
        this.rest.getProviders().subscribe((data: {}) => {
            this.providers = data;
            this.providers = this.providers.providers;
        });
    }

    getRequests() {
        this.requests = [];
        this.rest.getRequests().subscribe((data: {}) => {
            this.requests = data;
            this.requests = this.requests.requests;
            this.requests.forEach(element => {
                this.prodAdded.push([]);
            });
        });
    }

    getProducts() {
        this.products = [];
        this.rest.getProducts().subscribe((data: {}) => {
            this.products = data;
            this.products = this.products.products;
        });
    }

    getDRooms() {
        this.dRooms = [];
        this.rest.getDRooms().subscribe((data: {}) => {
            this.dRooms = data;
            this.dRooms = this.dRooms.dRooms;
        });
    }

    getTheBusses() {
        this.rest.getBusses().subscribe((data: {}) => {
            this.busses = data;
            this.busses = this.busses.busses;
        });
    }

    setInfo() {
        this.searched = (document.getElementById('selectedDriver') as HTMLSelectElement).value;
        if (this.searched !== 'Elegir...') {
            this.busses.forEach(buss => {
                if (buss.user.nick_name === this.searched) {
                    (document.getElementById('plateslbl') as HTMLTitleElement).innerText = buss.license_plate;
                    (document.getElementById('boxSpacelbl') as HTMLTitleElement).innerText = buss.space_box;
                    this.delivery.bus = buss._id;
                }
            });
        }
    }
    addElement(indexA, indexB) {
        this.flag++;
        (document.getElementById('add' + indexA + indexB) as HTMLButtonElement).hidden = true;
        (document.getElementById('del' + indexA + indexB) as HTMLButtonElement).hidden = false;
        let pTemp = {
            name: this.requests[indexA].products[indexB].name,
            provider: this.requests[indexA].products[indexB].provider,
            quantity: this.requests[indexA].products[indexB].quantity,
            unit: this.requests[indexA].products[indexB].unit,
            sTs: true
        };
        this.prodAdded[indexA].push(pTemp);

        console.log(this.prodAdded);
    }
    deleteElement(indexA, indexB) {
        this.flag--;
        (document.getElementById('add' + indexA + indexB) as HTMLButtonElement).hidden = false;
        (document.getElementById('del' + indexA + indexB) as HTMLButtonElement).hidden = true;
        this.prodAdded[indexA].splice(indexB, 1);
        console.log(this.prodAdded);
    }
    createDelivery() {
        let finalP: any = [];
        let pHelper: any = [];
        let rHelper: any = [];
        for (let counter = 0; counter < this.prodAdded.length; counter++) {
            if (this.prodAdded[counter].length > 0) {
                rHelper.push(this.requests[counter]._id);
                this.prodAdded[counter].forEach(prod => {
                    pHelper.push(prod);
                });
                finalP.push({
                    dRoom: this.requests[counter].dRoom._id,
                    products: pHelper
                });
            }
        }
        this.delivery.deliver = finalP;
        this.delivery.status = 'Creado';
        this.delivery.user = this.rest.getRole();
        this.delivery.requests = rHelper;

        this.rest.createDelivery(this.delivery).subscribe((result) => {
            this.router.navigate(['/deliveries']);
          }, (err) => {
            console.log(err);
          });
    }

    test(){
        while(true){
              this.searched = (document.getElementById('selectedDriver') as HTMLSelectElement).value;
              if(this.searched!='Elegir...' && this.flag!=0){
                return false
              }else{
                return true
              }
        }
      }
}
