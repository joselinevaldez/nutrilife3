import { Component, OnInit } from '@angular/core';
import { PlanesService } from '../../../services/planes/planes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Dieta } from '../../../models/planes.models';
import { Platillo } from '../../../models/platillo.models';
import { PlatillosService } from '../../../services/service.index';
import { Alimentosp } from '../../../models/alimentosp.models';

@Component({
  selector: 'app-lista-dietas',
  templateUrl: './lista-dietas.component.html',
  styleUrls: ['./lista-dietas.component.css'],
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
export class ListaDietasComponent implements OnInit {
desde:number=0
totalRegistro:number=0;
dietas:any[]=[];
alimentosp:Alimentosp[]=[];
platillo:Platillo[]=[];
d:any[]=[];
  constructor(
    public _planesService : PlanesService,
    private modalService: NgbModal,
    public _platillosService: PlatillosService
  ) { }

  ngOnInit(
   
  ) {
    this.cargarPlanes();
    this.consultarP();
  }
  cargarPlanes(){
    this._planesService.consultarDietas(this.desde)
      .subscribe(resp=>{
        this.totalRegistro=resp.total;
        this.dietas=resp.dieta;
        console.log(this.dietas);
      });
  }
  consultarPlatillos(d:any,content:any){
    this.d=d.dias;
   
    console.log(this.d["martes"].desayunoM);
    this.modalService.open(content, { size: 'lg' });
 }

 consultarP(){
  
  this._platillosService.consultarPlatillosSelect()
    .subscribe(resp=>{
      //console.log(resp);
      this.platillo=resp;
      console.log(this.platillo);
             
    });
  

}
consultarAlimentos(p:string){
  
  console.log(p);
  
  var selector:any=document.getElementById(p);
  var select:string= selector.options[selector.selectedIndex].value; //El texto de la opción seleccionada
 console.log(select);
  
  this._platillosService.consultarAlimentosp(select)
    .subscribe(resp=>{
      //console.log(resp);
      this.alimentosp=resp;
      console.log(this.alimentosp);
             
    });
  
 
}
abrirModal(content){
  this.modalService.open(content, { size: 'lg' });
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
  this.cargarPlanes();
}

buscarPlan(termino:string){
  if (termino.length <= 0){
    this.cargarPlanes();
    return;
  }
  console.log(termino);
   
  ///
  this._planesService.buscarDieta(termino)
    .subscribe( (dieta:any)=>{
      this.dietas=dieta;
      //console.log(this.paciente);
    });
    //console.log("arreglo",this.paciente.length);
}

desactivar(modelo:any){
  //console.log(modelo);

  //console.log(this.editado);
  swal({ 
    title: "¿Seguro que deseas suspender la dieta?",
    text: "Si la desactivas podras volver activarla..",
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
      this._planesService.bajaPlan(id)
      .subscribe( resp=>{
        swal("Se ah desactivado la dieta correctamente", {
          icon: "success",
        });
        this.desde=0
        this.cargarPlanes();
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
    title: "¿Seguro que deseas reactivar la dieta?",
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
      this._planesService.altaPlan(id)
      .subscribe( resp=>{
        swal("Se ah reactivado la dieta correctamente", {
          icon: "success",
        });
        this.desde=0
        this.cargarPlanes();
      });
      
    } else {
      
    }
  });

}


}
