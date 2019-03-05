import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-404',
    templateUrl: './notFound.component.html',
    styleUrls: ['./notFound.component.css']
})

export class NotFoundComponent implements OnInit {
    public tittle: Number;
    public textoso: String;

    constructor() {
        this.tittle = 404;
        this.textoso = 'Opps!! Page not found';
    }

    ngOnInit() {
        console.log('Componente de 404');
    }
}
