
import { Component, OnInit,ViewEncapsulation } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitasService } from '../../services/service.index';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class CitasComponent implements OnInit {
 citas:any;
 cita2:any;
 
 
 //etiqueta="label label-table label-success";
  constructor(
    private _citasService: CitasService,
    private modalService: NgbModal) {

    
  }

 

  openLg(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  mostrarModal(cita:any,nombre) {
    this.cita2=cita;
    console.log(this.cita2);
    this.modalService.open(nombre, { size: 'lg' });
  }

  

  ngOnInit() {
   
    this.citas=this._citasService.getCitas();
    console.log(this.citas);

     
     
   
   

  }

}
