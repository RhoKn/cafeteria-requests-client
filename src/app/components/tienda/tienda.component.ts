import { Component } from '@angular/core';

@Component({
    selector: 'app-tienda',
    templateUrl: './tienda.component.html',
    styleUrls: ['./tienda.component.css']
  })
  export class TiendaComponent {
    public title: String;
    constructor() {
        this.title = 'Tienda';
    }
}
