import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $;
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-deliv-edit',
  templateUrl: './deliveryEdit.component.html',
  styleUrls: ['./deliveryEdit.component.css']
})
export class DeliveryEditComponent implements OnInit {

  public providers: any = [];
  public $: any;
  public requests: any = [];
  public products: any = [];
  public users: any = [];
  public dRooms: any = [];
  public plates: any;
  public box_size: any;
  public busses: any = [];
  public delivery: any = {};
  public searcher;
  public searched;
  public added = false;
  public prodAdded: any = [];
  public theDeliv: any = {};

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router,
    private refChange: ChangeDetectorRef, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    if (this.getRole()) {
      this.getUsers();
      this.getDRooms();
      this.getTheBusses();

      this.getProducts();

      this.getRequests();
      this.getProviders();


      this.rest.getDelivery(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.theDeliv = data;
        this.theDeliv = this.theDeliv.delivery;
        this.searcher = $('.driverSearcher').select2();
        this.searcher.on('select2:select', function (e) {
          document.getElementById('searcherTrigger').click();
        });
        let driver = document.getElementById('selectedDriver') as HTMLSelectElement;
        (document.getElementById('plateslbl') as HTMLTitleElement).innerText = this.theDeliv.bus.license_plate;
        (document.getElementById('boxSpacelbl') as HTMLTitleElement).innerText = this.theDeliv.bus.space_box;
        this.users.forEach(usr => {
          if (usr._id === this.theDeliv.bus.user) {
            driver.add(new Option(usr.nick_name));
            driver.selectedIndex = driver.options.length - 1;
          }
        });
        for (let index = 0; index < this.dRooms.length; index++) {
          this.theDeliv.delivery.forEach(element => {
            if(element.dRoom === this.dRooms[index]._id){
              element.products.forEach(eProd => {
                this.prodAdded[index].push(eProd);
              });
            }
          });

        }
        console.log(this.prodAdded)
        for(let large = 0; large < this.prodAdded.length; large++){
          if(this.prodAdded[large].length > 0){
            console.log(this.prodAdded[large].length)
            for(let wide = 0; wide<this.prodAdded[large].length; wide++){
              (document.getElementById('add' + large + wide) as HTMLButtonElement).hidden = true;
              (document.getElementById('del' + large + wide) as HTMLButtonElement).hidden = false;
            }
          }
        }
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
      this.relate();
    });
  }

  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
      this.products = data;
      this.products = this.products.products;
    });
  }

  relate(){


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
    this.delivery.delivery = finalP;
    this.delivery.requests = rHelper;



    this.rest.updateDelivery(this.theDeliv._id,this.delivery).subscribe((result) => {
      console.log(result);
      this.router.navigate(['/deliveries']);
    }, (err) => {
      console.log(err);
    });
  }

  getUsers() {
    this.users = [];
    this.rest.getUsers().subscribe((data: {}) => {
      this.users = data;
      this.users = this.users.users;
    });
  }

}
