import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../../models/request';
import * as $ from 'jquery';
import 'select2';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-request',
    templateUrl: './request.component.html',
    styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
    public $:any;
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
    public hours: any;
    public today: any;
    public text: any =[];
    public linesByCat = [];
    public reactiveForm: FormGroup;
    public reactiveForm2: FormGroup;
    constructor(public rest: RestService, private route: ActivatedRoute, private router: Router, 
        private refChange: ChangeDetectorRef, private formBuilder:FormBuilder) {
        this.title = 'Usuarios';
        this.request = new Request( '', this.selected,'','');
    }
    addLine(index){
        this.linesByCat[index].push(1);
        this.refChange.detectChanges();
        console.log(this.refChange.detectChanges());
        let a = (<any>$('.js-example-basic-single'));
        a.select2();
        //a.on('select2:select', function (e) {
       // document.getElementById('helper'+e.target.id.replace('product','')).click();
        //});
        //let exte = $('.chido'+index);
        //console.log(exte)
        //$('.js-example-basic-single').select2();
        
        console.log(this.linesByCat);
    }
    showReq(){
        console.log(this.request)
    }

    ngOnInit() {

      this.reactiveForm=this.formBuilder.group({
        uType: ['', Validators.required],
        pProv: ['', Validators.required],
        qtty: ['', Validators.required]
      });
        this.getProducts();
        this.getDRooms();
        this.getRequests();
        this.getProductTypes();
        this.hours = new Date().toLocaleTimeString();
        this.today = new Date().toLocaleDateString();
        
        
        
    }

    deleteElement(i){
        this.selected.splice(i,1);
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

    addProduct(prod){
        this.pSelected = prod.unit;
        this.pSelected2 = prod.provider;
        this.pToAdd.name = prod.name;
        
        //this.selected.push({name:name,unit:unit});
    }
    addToList(){
        this.pToAdd=this.reactiveForm.value;
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
        let nickName =this.rest.getNick();
        this.request.user= nickName;

        
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
      let nickName =this.rest.getNick();
        this.statusEdit.user = nickName;
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
            
        });
      }
}
