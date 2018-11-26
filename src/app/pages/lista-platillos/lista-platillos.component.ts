import { Component, OnInit  } from '@angular/core';
import { Platillo } from '../../models/platillo.models';
import { PlatillosService } from '../../services/service.index';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Alimentosp } from '../../models/alimentosp.models';
@Component({
  selector: 'app-lista-platillos',
  templateUrl: './lista-platillos.component.html',
  styleUrls: ['./lista-platillos.component.css'],
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
export class ListaPlatillosComponent implements OnInit {
platillos:Platillo=new Platillo();
platillover:Platillo=new Platillo();
alimentosp:Alimentosp[]=[];
totalRegistro:number=0;
desde:number=0;
    constructor(
      public _platillosService:PlatillosService,
      private modalService: NgbModal
    ) {}
  ngOnInit() {
    //this.platillos=null;
   this.consultarPlatillos();

  }
  consultarPlatillos(){
    this._platillosService.consultarPlatillos(this.desde)
    .subscribe(resp=>{
      this.platillos=resp.platillos;
      console.log(this.platillos);
      this.totalRegistro=resp.total;
    });
  }
  cambiarDesde( valor: number){
    let desde = this.desde+valor;

    if (desde>=this.totalRegistro){
      return;
    }
    if (desde < 0){
      return;
    }
    this.desde+=valor;
    this.consultarPlatillos();
  }
  consultarAlimentos(p:any,content:any){
    this.platillover=p;
    this._platillosService.consultarAlimentosp(p._id)
      .subscribe(resp=>{
        //console.log(resp);
        this.alimentosp=resp;
        console.log(this.alimentosp);
               
      });
    
    this.modalService.open(content, { size: 'lg' });
 }
  
 buscarPlatillo(termino:string){
  if (termino.length <= 0){
    this.consultarPlatillos();
    return;
  }
  console.log(termino);
   
  ///
  this._platillosService.buscarPlatillo(termino)
    .subscribe( (platillo:any)=>{
      this.platillos=platillo;
      //console.log(this.paciente);
    });
    //console.log("arreglo",this.paciente.length);
}
desactivar(modelo:any){
  //console.log(modelo);

  //console.log(this.editado);
  swal({ 
    title: "¿Seguro que deseas suspender el platillo?",
    text: "Si lo desactivas podras volver activarlo..",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
     // this.editado=modelo;
     // this.editado.estatus="0";
     var id = modelo._id
      console.log("le pico");
      this._platillosService.bajaPlatillo(id)
      .subscribe( resp=>{
        swal("Se ah desactivado el platillo correctamente", {
          icon: "success",
        });
        this.desde=0
        this.consultarPlatillos();
      });
      
    } else {
      //console.log("le pico");
    }
  });

}
reactivar(modelo:any){
  //console.log(modelo);
 
  //console.log(this.editado);
  swal({ 
    title: "¿Seguro que deseas reactivar el platillo?",
    text: "Preciona aceptar",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    
    if (willDelete ===true) {
      //this.editado=modelo;
      //this.editado.estatus="1";
      var id = modelo._id;
      this._platillosService.altaPlatillo(id)
      .subscribe( resp=>{
        swal("Se ah reactivado el platillo correctamente", {
          icon: "success",
        });
        this.desde=0
        this.consultarPlatillos();
      });
      
    } else {
      
    }
  });

}
}
