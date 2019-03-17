import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-user-edit',
  templateUrl: './editRequest.component.html',
  styleUrls: ['./editRequest.component.css']
})
export class RequestEditComponent implements OnInit {

  @Input() req: any = Request;
  public auxToSync: any = [];
  public providers: any = [];
  public products: any = [];
  public dRooms: any = [];
  public dRoomsName: any = [];
  public tmpdRoom: String;
  public selected: any = [{}];
  public ptypes: any = [];
  public arrayAuxBuild: any = [];
  public rowsUsed = 0;
  public pEditedToAdd: any = [];
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router, private refChange: ChangeDetectorRef) { }

  async ngOnInit() {
    this.getProviders();
    this.rest.getRequest(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.req = data;
      this.req = this.req.request;
      this.selected = this.req.products;
    });
    await this.getDRooms();
    await this.getProducts();
    await this.getProductTypes();
  }

  getProviders() {
    this.providers = [];
    this.rest.getProviders().subscribe((data: {}) => {
      this.providers = data;
      this.providers = this.providers.providers;
    });
  }

  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
      this.products = data;
      this.products = this.products.products;
      this.setRows(this.ptypes);
    });

  }
  setRows(array2B) {
    for (let index = 0; index < array2B.length; index++) {
      for (let counter = 0; counter < this.selected.length; counter++) {
        if (array2B[index].type === this.selected[counter].category) {
          this.arrayAuxBuild[index].push(counter + 1);
          this.addLine(counter + 1, true);

          let unitSelect = document.getElementById('includedU' + (counter + 1)) as HTMLSelectElement;
          let prodSelect = document.getElementById('includedP' + (counter + 1)) as HTMLSelectElement;
          let qttyInpt = document.getElementById(`includedC${counter + 1}`) as HTMLInputElement;
          let providSelect = document.getElementById(`includedPr${counter + 1}`) as HTMLSelectElement;

          let provTemp;
          this.providers.forEach(prov => {
            if (prov._id === this.selected[counter].provider) {
              provTemp = prov.name;
            }
          });

          prodSelect.add(new Option(this.selected[counter].name));
          prodSelect.selectedIndex = prodSelect.options.length - 1;

          document.getElementById('trigger' + (counter + 1)).click();

          for (let aux = 0; aux < providSelect.options.length; aux++) {
            if (providSelect.options[aux].text === provTemp) {
              providSelect.selectedIndex = aux;
            }
          }
          for (let aux = 0; aux < unitSelect.options.length; aux++) {
            if (unitSelect.options[aux].text === this.selected[counter].unit) {
              unitSelect.selectedIndex = aux;
            }
          }
          qttyInpt.value = this.selected[counter].quantity;

        }
      }
    }
  }
  deleteLine(indexA, indexB) {
    this.arrayAuxBuild[indexA].splice(indexB, 1);


    this.refChange.detectChanges();
  }

  addLine(index, included) {
    this.rowsUsed++;
    if (included) {
      this.refChange.detectChanges();
      let a = $('.searcher' + index);
      a.select2();
      a.on('select2:select', function (e) {
        document.getElementById('trigger' + e.target.id.replace('includedP', '')).click();
      });
    } else {
      this.arrayAuxBuild[index].push(this.rowsUsed);
      this.refChange.detectChanges();

      let a = $('.searcher' + this.rowsUsed);
      a.select2();
      a.on('select2:select', function (e) {
        document.getElementById('trigger' + e.target.id.replace('includedP', '')).click();
      });

    }

  }

  setInfo(idHelper) {
    let prodSelect = document.getElementById('includedP' + idHelper) as HTMLSelectElement;
    let unitSelect = document.getElementById('includedU' + idHelper) as HTMLSelectElement;
    let qttyInpt = document.getElementById(`includedC${idHelper}`) as HTMLInputElement;
    let providSelect = document.getElementById(`includedPr${idHelper}`) as HTMLSelectElement;
    let theProd: any = {};
    this.products.forEach(prod => {
      if (prod.name === prodSelect.value) {
        theProd = prod;
      }
    });
    while (unitSelect.options.length > 1) {
      unitSelect.options.remove(unitSelect.options.length - 1)
    }

    while (providSelect.options.length > 1) {
      providSelect.options.remove(providSelect.options.length - 1)
    }

    theProd.provider.forEach(prov => {
      providSelect.options.add(new Option(prov.name));
    });
    theProd.unit.forEach(unit => {
      unitSelect.options.add(new Option(unit.name));
    });




    unitSelect.hidden = false;
    providSelect.hidden = false;
    qttyInpt.hidden = false;
  }


  getDRooms() {
    this.dRooms = [];
    this.rest.getDRooms().subscribe((data: {}) => {
      this.dRooms = data;
      this.dRooms = this.dRooms.dRooms;
      this.dRooms.forEach(dR => {
        if (dR._id === this.req.dRoom) {
          this.tmpdRoom = dR.dRoom;
        }
        this.dRoomsName.push(dR.dRoom);
      });
    });
  }


  updateRequest() {
    this.pEditedToAdd = [];
    
    this.dRooms.forEach(dR => {
      if (dR.dRoom === this.tmpdRoom) {
        this.req.dRoom = dR._id;
      }
    });
    let x = 0;

    for (let counter = 0; counter < this.arrayAuxBuild.length; counter++) {
      for (let aux = 0; aux < this.arrayAuxBuild[counter].length; aux++) {
        x++;
        let prodSelect = document.getElementById('includedP' + this.arrayAuxBuild[counter][aux]) as HTMLSelectElement;
        let unitSelect = document.getElementById('includedU' + this.arrayAuxBuild[counter][aux]) as HTMLSelectElement;
        let qttyInpt = document.getElementById(`includedC${this.arrayAuxBuild[counter][aux]}`) as HTMLInputElement;
        let providSelect = document.getElementById(`includedPr${this.arrayAuxBuild[counter][aux]}`) as HTMLSelectElement;
        let tmpProvId;

        this.providers.forEach(prov => {
          if (prov.name === providSelect.value) {
            tmpProvId = prov._id;
          }
        });

        this.pEditedToAdd.push({
          name: prodSelect.value,
          unit: unitSelect.value,
          quantity: qttyInpt.value,
          provider: tmpProvId,
          category: this.ptypes[counter].type
        });



      }
    }

    this.req.products = this.pEditedToAdd;
    

    
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
      this.ptypes.forEach(pt => {
        this.arrayAuxBuild.push([]);
      });
    });
  }


}

