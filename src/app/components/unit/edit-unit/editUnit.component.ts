import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Unit } from '../../../models/unit';


@Component({
  selector: 'app-unit-edit',
  templateUrl: './editUnit.component.html',
  styleUrls: ['./editUnit.component.css']
})
export class UnitEditComponent implements OnInit {

  @Input() unit: any = { };
  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if(this.getRole()){
      this.rest.getUnit(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.unit = data;
        this.unit = this.unit.unit;
        console.log(this.unit);
      });
    }else{
      this.router.navigate(['/requests']);
    }
  }

  getRole(){
    if(this.rest.getRole()=='Admin' || this.rest.getRole()=='Gerente'){
      return true;
    }else{
      return false;
    }
  }


  updateUnit() {
    this.rest.updateUnit(this.route.snapshot.params['id'], this.unit).subscribe((result) => {
      this.router.navigate(['/units']);
    }, (err) => {
      console.log(err);
    });
  }

}
