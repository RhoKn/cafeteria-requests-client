import { Component } from '@angular/core';
import {RestService} from './rest.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public cafeName: String;
  title = 'client';
  public requests: any = [];
  public notif;
  constructor(private rest:RestService) {
    this.cafeName = 'LA BIG CAFE';
  }

    ngOnInit() {
      this.getRequests();
    }

  getRequests() {
      this.requests = [];
      this.rest.getRequests().subscribe((data: {}) => {
          this.requests = data;
          this.requests = this.requests.requests;
          let prueba=this.requests.filter(n => n.status=='Creado');
          console.log(prueba.length);
          this.notif=prueba.length;
      });
    }



}
