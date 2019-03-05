import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public cafeName: String;
  title = 'client';

  constructor() {
    this.cafeName = 'LA BIG CAFE';
  }
}
