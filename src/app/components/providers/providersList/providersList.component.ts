import { Component, OnInit } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from '../../../models/provider';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-providers-list',
  templateUrl: './providersList.component.html',
  styleUrls: ['./providersList.component.css']
})
export class ProvidersListComponent implements OnInit {
  public title: String;
  public providers: any = [];
  public provider: Provider;

  public reactiveForm: FormGroup;

  constructor(public rest: RestService, private route: ActivatedRoute,
    private router: Router,private formBuilder:FormBuilder) {
      this.title = 'Usuarios';
      this.provider = new Provider('','','',0,'','',0,'',0,'','');
  }
  ngOnInit() {
    if(this.getRole()){
      this.reactiveForm = this.formBuilder.group({
          contact_first_name: ['', Validators.required],
          contact_last_name: ['', Validators.required],
          phone_number: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
          email: ['', [Validators.required, Validators.email]],
          RFC: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
          postal_code: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(5)]],
          street_name: ['', [Validators.required,Validators.minLength(3)]],
          street_number: ['', Validators.required],
          suite_number:[],
          colony: ['', [Validators.required, Validators.minLength(3)]]
      });
      this.getProviders();
    }else{
      this.router.navigate(['/requests']);
    }
  }

  getRole(){
    if(this.rest.getRole()=='Admin'){
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

  createProvider() {
    this.provider=this.reactiveForm.value;
    this.provider.name=`${this.provider.contact_first_name} ${this.provider.contact_last_name}`;
      this.rest.createObject(this.provider,'providers/create').subscribe((result) => {
          this.getProviders();
        }, (err) => {
          console.log(err);
        });
  }

  deleteUser(id) {
      this.rest.deleteProvider(id)
        .subscribe(res => {
            this.getProviders();
          }, (err) => {
            console.log(err);
          }
        );
  }

}
