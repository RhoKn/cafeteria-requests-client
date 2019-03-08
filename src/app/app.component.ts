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

  constructor(private rest:RestService) {
    this.cafeName = 'LA BIG CAFE';
  }
}
