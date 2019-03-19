import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { RestService } from '../../../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $;

@Component({
  selector: 'app-user-edit',
  templateUrl: './seeOne.component.html',
  styleUrls: ['./seeOne.component.css']
})
export class RequestOneComponent implements OnInit {

  @Input() req: any = Request;
  public providers: any = [];
  public theProv = [];
  public goingToReject = false;
  public goingToUpgrade = false;
  public cancel = false;
  public action = 'Autorizar';
  public statToSend: any = {};

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router, private refChange: ChangeDetectorRef) { }

  ngOnInit() {

    if(this.getRole()){
      this.getProviders();
      this.rest.getRequest(this.route.snapshot.params['id']).subscribe((data: {}) => {
        this.req = data;
        this.req = this.req.request;
        let date = document.getElementById('dateReq') as HTMLTitleElement;
        let created = document.getElementById('createdBy') as HTMLTitleElement;
        let comedor = document.getElementById('comedor') as HTMLTitleElement;
        let observations = document.getElementById('observations') as HTMLTitleElement;
        let stat = document.getElementById('stat') as HTMLTitleElement;

        for (let index = 0; index < this.req.products.length; index++) {
          this.providers.forEach(element => {
            if(element._id === this.req.products[index].provider){
              this.theProv.push(element.name);
            }
          });
        }
        console.log(this.req)
        date.innerText = this.req.created.date;
        created.innerText = `Creado por ${this.req.created.user} en `;
        comedor.innerText = `Pedido para el comedor ${this.req.dRoom.dRoom} - `;
        stat.innerText = `${this.req.status}`;
        observations.innerText = `${this.req.observations}`;
      });
    }else{
      this.router.navigate(['/requests']);
    }


  }


  getRole(){
    if(this.rest.getRole()!='Chofer'){
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

  canStatusUpgrade(status) {
    //if(this.rest.getRole() === 'Chef') {
    //  return false;
    //}
    if (this.rest.getRole() === 'Gerente') {
        return status !== 'Rechazado' && status === 'Creado';
    }
    if (this.rest.getRole() === 'Compras') {
        return status !== 'Rechazado' && status === 'Autorizado';
    }
    return this.rest.getRole() !== 'Chef' && status !== 'Rechazado' && status !== 'Aprobado';
}
canStatusDownGrade(status) {
    //if(this.rest.getRole() === 'Chef') {
    //   return false;
    //}
    if (this.rest.getRole() === 'Gerente') {
        return status !== 'Rechazado' && status === 'Creado';
    }
    if (this.rest.getRole() === 'Compras') {
        return status !== 'Rechazado' && status === 'Autorizado';
    }
    return this.rest.getRole() !== 'Chef' && status !== 'Rechazado' && status !== 'Aprobado';
}

canEdit(status) {
    if (this.rest.getRole() === 'Chef') {
        return status === 'Creado';
    }
    if (this.rest.getRole() === 'Gerente') {
        return status !== 'Rechazado' && status === 'Creado';
    }
    if (this.rest.getRole() === 'Compras') {
        return status !== 'Rechazado' && status === 'Autorizado';
    }
    return status !== 'Rechazado' && status !== 'Aprobado';
}
    canDelete(status) {
        return this.rest.getRole() === 'Admin';
    }

  actionToReq(){
    this.cancel = !this.cancel;
    this.action = this.req.status === 'Creado' ? 'Autorizar' :
    this.req.status === 'Autorizado' ? 'Aprobar' : 'Aprobar';
  }
  actionToReject(){
    this.cancel = !this.cancel;
    this.action = 'Rechazar';
  }

  getToAction(){
    this.statToSend.user = this.rest.getNick();
    this.statToSend.type = this.req.status === 'Creado' ? 'Authorization' :
                                                      this.req.status === 'Autorizado' ? 'Approved' : 'Approved';
    this.rest.updateStatus(this.req._id,this.statToSend).subscribe((data: {}) => {
      this.router.navigate(['/requests/see/' + this.req._id]);
    });
  }

  getToReject(){
    this.statToSend.user = this.rest.getNick();
    this.statToSend.type = 'Rejected';
    this.rest.updateStatus(this.req._id,this.statToSend).subscribe((data: {}) => {
      this.router.navigate(['/requests/see/' + this.req._id]);
    });
  }
  returnCancel(){
    this.cancel = !this.cancel;
  }


}
