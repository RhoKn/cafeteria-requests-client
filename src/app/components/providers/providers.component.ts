import { Component, OnInit } from '@angular/core';
import { RestService } from '../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from '../../models/provider';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  public title: String;
  public providers: any = [];
  public provider: Provider;
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
      this.title = 'Usuarios';
      this.provider = new Provider('','','',0,'','',0,'',0,'','');
  }
  ngOnInit() {
    this.getProviders();
  }

  getProviders() {
      this.providers = [];
      this.rest.getProviders().subscribe((data: {}) => {
          this.providers = data;
          this.providers = this.providers.providers;
      });
    }

  createProvider() {
    this.provider.name=`${this.provider.contact_first_name} ${this.provider.contact_last_name}`;
      this.rest.createProvider(this.provider).subscribe((result) => {
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
