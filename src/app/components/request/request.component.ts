import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../models/request';
declare var $;

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
    public providers: any = [];
    public $: any;
    public fieldsCounter = 0;
    public requests: any = [];
    public products: any = [];
    public dRooms: any = [];
    public selected: any = [];
    public pSelected: any = {};
    public pSelected2: any = {};
    public pToAdd: any = {};
    public request: Request;
    public pStatusEdit: any = {};
    public statusEdit: any = {};
    public ptypes: any = [];
    public action: String;
    public hours: any;
    public today: any;
    public text: any = [];
    public linesByCat = [];
    public reactiveForm: FormGroup;
    public reactiveForm2: FormGroup;
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router,
        private refChange: ChangeDetectorRef, private formBuilder: FormBuilder) {

        this.request = new Request('', this.selected, '', '');
    }
    addLine(index) {
        this.fieldsCounter++;
        this.linesByCat[index].push(this.fieldsCounter);
        this.refChange.detectChanges();

        let a = $('.searcher' + this.fieldsCounter);
        a.select2();
        a.on('select2:select', function (e) {
            document.getElementById('trigger' + e.target.id).click();
        });


    }
    deleteLine(index) {
        this.linesByCat[index].splice(index, 1);
        this.refChange.detectChanges();
    }
    setInfo(idHelper) {
        let prodSelect = document.getElementById(idHelper) as HTMLSelectElement;
        let unitSelect = document.getElementById('unit' + idHelper) as HTMLSelectElement;
        let qttyInpt = document.getElementById(`qtty${idHelper}`) as HTMLInputElement;
        let providSelect = document.getElementById(`provider${idHelper}`) as HTMLSelectElement;
        let theProd: any = {};
        this.products.forEach(prod => {
            if (prod.name === prodSelect.value) {
                theProd = prod;
            }
        });
        //Limpiar el select
    while(unitSelect.options.length>1){
        unitSelect.options.remove(unitSelect.options.length-1)
      }
      //Limpiar el provider
      while(providSelect.options.length>1){
        providSelect.options.remove(providSelect.options.length-1)
      }

        theProd.provider.forEach(prov => {
            providSelect.options.add(new Option(prov.name));
        });
        theProd.unit.forEach(un => {
            unitSelect.options.add(new Option(un.name));
        });

        unitSelect.hidden = false;
        providSelect.hidden = false;
        qttyInpt.hidden=false;
    }

    showReq() {
        console.log(this.request)
    }

    ngOnInit() {

      if(this.getRole()){
        this.reactiveForm = this.formBuilder.group({
            uType: ['', Validators.required],
            pProv: ['', Validators.required],
            qtty: ['', Validators.required]
        });
        this.getProducts();
        this.getDRooms();
        this.getRequests();
        this.getProductTypes();
        this.getProviders();
        this.hours = new Date().toLocaleTimeString();
        this.today = new Date().toLocaleDateString();
      }else{
        this.router.navigate(['/requests']);
      }
    }

    getRole(){
      if(this.rest.getRole()=='Admin' || this.rest.getRole()=='Chef' || this.rest.getRole()=='Gerente'){
        return true;
      }else{
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

    deleteElement(i) {
        this.selected.splice(i, 1);
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
            this.products.forEach(element => {
                this.linesByCat.push([]);
            });
        });
    }

    getDRooms() {
        this.dRooms = [];
        this.rest.getDRooms().subscribe((data: {}) => {
            this.dRooms = data;
            this.dRooms = this.dRooms.dRooms;
        });
    }

    addProduct(prod) {
        this.pSelected = prod.unit;
        this.pSelected2 = prod.provider;
        this.pToAdd.name = prod.name;

        //this.selected.push({name:name,unit:unit});
    }
    addToList() {
        this.pToAdd = this.reactiveForm.value;
        this.selected.push(this.pToAdd);
        this.pToAdd = {};
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
        let tmpDRoomId;
        this.dRooms.forEach(dR =>{
            if(this.request.dRoom === dR.dRoom){
                tmpDRoomId = dR._id;
            }
        });
        this.request.dRoom = tmpDRoomId;
        for(let counter = 0; counter < this.linesByCat.length;counter++){
            for (let aux = 0; aux < this.linesByCat[counter].length; aux++) {
                let prodSelect = document.getElementById(''+this.linesByCat[counter][aux]) as HTMLSelectElement;
                let unitSelect = document.getElementById('unit' + this.linesByCat[counter][aux]) as HTMLSelectElement;
                let qttyInpt = document.getElementById(`qtty${this.linesByCat[counter][aux]}`) as HTMLInputElement;
                let providSelect = document.getElementById(`provider${this.linesByCat[counter][aux]}`) as HTMLSelectElement;
                let tmpProvId ;

                this.providers.forEach(prov =>{
                    if (prov.name=== providSelect.value){
                        tmpProvId = prov._id;
                    }
                });
                this.selected.push({
                    name:   prodSelect.value,
                    unit:   unitSelect.value,
                    quantity:   qttyInpt.value,
                    provider:   tmpProvId,
                    category:   this.ptypes[counter].type
                });

            }
        }
        this.request.products = this.selected;

        this.request.user = this.rest.getNick();

        this.rest.createRequest(this.request).subscribe((result) => {
            this.router.navigate(['/requests']);
        }, (err) => {
            console.log(err);
        });
    }
    copyReq(reqst) {
        this.pStatusEdit = reqst;
        this.action = this.pStatusEdit.status === 'Creado' ? 'Autorizar' :
            this.pStatusEdit.status === 'Autorizado' ? 'Aprobar' : 'Aprobar';
    }
    authRequest(auth) {
        let nickName = this.rest.getNick();
        this.statusEdit.user = nickName;
        if (auth) {
            this.statusEdit.type = this.action === 'Autorizar' ? 'Authorization' : 'Approved';
        } else {
            this.statusEdit.type = 'Rechazado';
        }
        this.rest.updateStatus(this.pStatusEdit._id, this.statusEdit).subscribe((result) => {
            this.getRequests();
        }, (err) => {
            console.log(err);
        });
    }

    canStatusUpgrade(status) {
        //if(this.rest.getRole() === 'Chef') {
        //  return false;
        //}
        if (this.rest.getRole() === 'Gerente') {
            return status !== 'Rechazado' && status === 'Creado';
        }
        if (this.rest.getRole() === 'Compras') {
            return status !== 'Rechazado' && status === 'Autorizado';
        }
        return this.rest.getRole() !== 'Chef' && status !== 'Rechazado' && status !== 'Aprobado';
    }
    canStatusDownGrade(status) {
        //if(this.rest.getRole() === 'Chef') {
        //   return false;
        //}
        if (this.rest.getRole() === 'Gerente') {
            return status !== 'Rechazado' && status === 'Creado';
        }
        if (this.rest.getRole() === 'Compras') {
            return status !== 'Rechazado' && status === 'Autorizado';
        }
        return this.rest.getRole() !== 'Chef' && status !== 'Rechazado' && status !== 'Aprobado';
    }

    canEdit(status) {
        if (this.rest.getRole() === 'Chef') {
            return status === 'Creado';
        }
        if (this.rest.getRole() === 'Gerente') {
            return status !== 'Rechazado' && status === 'Creado';
        }
        if (this.rest.getRole() === 'Compras') {
            return status !== 'Rechazado' && status === 'Autorizado';
        }
        return status !== 'Rechazado' && status !== 'Aprobado';
    }
    canDelete(status) {
        return this.rest.getRole() === 'Admin';
    }

    getProductTypes() {

        this.rest.getProductTypes().subscribe((data: {}) => {
            this.ptypes = data;
            this.ptypes = this.ptypes.types;

        });
    }
}
