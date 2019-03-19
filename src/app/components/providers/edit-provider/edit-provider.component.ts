import { Component, OnInit,Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from '../../../models/provider';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {
    @Input()
    provider: any = { };
    public reactiveForm:FormGroup;
  constructor(public rest: RestService, private route: ActivatedRoute,
     private router: Router,private fb: FormBuilder) {
     this.createForm();
    }

  ngOnInit() {

    if(this.getRole()){
      this.rest.getProvider(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.provider = data;
        this.provider = this.provider.provider;
        this.reactiveForm.get('contact_first_name').setValue(this.provider.contact_first_name);
        this.reactiveForm.get('contact_last_name').setValue(this.provider.contact_last_name);
        this.reactiveForm.get('phone_number').setValue(this.provider.phone_number);
        this.reactiveForm.get('email').setValue(this.provider.email);
        this.reactiveForm.get('RFC').setValue(this.provider.RFC);
        this.reactiveForm.get('postal_code').setValue(this.provider.postal_code);
        this.reactiveForm.get('street_name').setValue(this.provider.street_name);
        this.reactiveForm.get('street_number').setValue(this.provider.street_number);
        this.reactiveForm.get('suite_number').setValue(this.provider.suite_number);
        this.reactiveForm.get('colony').setValue(this.provider.colony);
      })
    }else{
      this.router.navigate(['/requests']);
    }

  }

  createForm(){
    this.reactiveForm = this.fb.group({
      contact_first_name: ['', Validators.required],
      contact_last_name: ['', Validators.required],
      phone_number: ['', [Validators.required,Validators.min(1000000000),Validators.max(9999999999)]],
      email: ['', [Validators.required, Validators.email]],
      RFC: ['', [Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      postal_code: ['', [Validators.required, Validators.min(10000),Validators.max(99999)]],
      street_name: ['', Validators.required],
      street_number: ['', [Validators.required,Validators.min(1)]],
      suite_number:[Validators.min(0)],
      colony: ['', [Validators.required, Validators.minLength(3)]]
    });
  }


  getRole(){
    if(this.rest.getRole()=='Admin'){
      return true;
    }else{
      return false;
    }
  }

  updateProvider() {
    this.provider=this.reactiveForm.value;
    // this.provider.name=`${this.provider.contact_first_name} ${this.provider.contact_last_name}`;
    this.rest.updateProvider(this.route.snapshot.params['id'], this.provider).subscribe((result) => {
      this.router.navigate(['/providers']);
    }, (err) => {
      console.log(err);
    });
  }

}
