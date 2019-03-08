import { Component, OnInit,Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Provider } from '../../../models/provider';


@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.css']
})
export class EditProviderComponent implements OnInit {
    @Input() provider: any = { };
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.rest.getProvider(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.provider = data;
      this.provider = this.provider.provider;
      console.log(this.provider);
    });
  }

  updateProvider() {
    this.rest.updateProvider(this.route.snapshot.params['id'], this.provider).subscribe((result) => {
      this.router.navigate(['/providers']);
    }, (err) => {
      console.log(err);
    });
  }

}
