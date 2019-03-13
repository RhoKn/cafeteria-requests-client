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
    public selected: any = [];
    public pSelected: any ={};
    public pSelected2: any={};
    public pToAdd: any ={};
    public request: Request;
    public pStatusEdit: any ={};
    public statusEdit: any={};
    public ptypes: any = [];
    public action: String;
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
        this.title = 'Usuarios';
        this.request = new Request( '', [{}],'','');
    }

    ngOnInit() {
        this.getProducts();
        this.getDRooms();
        this.getRequests();
        this.getProductTypes();
    }

    deleteElement(i){
        this.selected.splice(i,1);
    }
    getRequests() {
        this.requests = [];
        this.rest.getRequests().subscribe((data: {}) => {
            this.requests = data;
            this.requests = this.requests.requests;
            console.log(this.requests)
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
        
        this.request.user= 'Lyria';
        
        console.log(this.request);
        this.rest.createRequest(this.request).subscribe((result) => {
            this.getRequests();
          }, (err) => {
            console.log(err);
          });
    }
    copyReq(reqst){
        this.pStatusEdit = reqst;
        this.action = this.pStatusEdit.status === 'Creado' ? 'Autorizar' :
                                        this.pStatusEdit.status === 'Autorizado' ? 'Aprobar' : 'Aprobar';
    }
    authRequest(auth){
        this.statusEdit.user = 'Lyria';
        if(auth){
            this.statusEdit.type = this.action === 'Autorizar' ? 'Authorization' : 'Approved';
        }else{
            this.statusEdit.type = 'Rechazado';
        }
        this.rest.updateStatus(this.pStatusEdit._id,this.statusEdit).subscribe((result) =>{
            this.getRequests();
        }, (err) => {
            console.log(err);
        });
    }

    canStatusUpgrade(status){
        //if(this.rest.getRole() === 'Chef') {
          //  return false;
        //}
        if(this.rest.getRole() === 'Gerente'){
            return status !== 'Rechazado' && status === 'Creado';
        }
        if(this.rest.getRole() === 'Compras'){
            return status !== 'Rechazado' && status === 'Autorizado';
        }
        return this.rest.getRole()!=='Chef' && status !== 'Rechazado' && status !== 'Aprobado';
    }
    canStatusDownGrade(status){
        //if(this.rest.getRole() === 'Chef') {
         //   return false;
        //}
        if(this.rest.getRole() === 'Gerente'){
            return status !== 'Rechazado' && status === 'Creado';
        }
        if(this.rest.getRole() === 'Compras'){
            return status !== 'Rechazado' && status === 'Autorizado';
        }
        return this.rest.getRole()!== 'Chef' && status !== 'Rechazado' && status !== 'Aprobado';
    }

    canEdit(status){
        if(this.rest.getRole() === 'Chef') {
            return status === 'Creado';
        }
        if(this.rest.getRole() === 'Gerente'){
            return status !== 'Rechazado' && status === 'Creado';
        }
        if(this.rest.getRole() === 'Compras'){
            return status !== 'Rechazado' && status === 'Autorizado';
        }
        return status !== 'Rechazado' && status !== 'Aprobado';
    }
    canDelete(status){
        return this.rest.getRole() === 'Admin';
    }

    getProductTypes() {

        this.rest.getProductTypes().subscribe((data: {}) => {
            this.ptypes = data;
            this.ptypes = this.ptypes.types;
            console.log(this.ptypes)
        });
      }
}
