import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { EventService, PlatillosService } from '../../../services/service.index';
import { PlanesService } from '../../../services/planes/planes.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alimentosp } from '../../../models/alimentosp.models';


@Component({
  selector: 'app-misdietas',
  templateUrl: './misdietas.component.html',
  styleUrls: ['./misdietas.component.css'],
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
export class MisdietasComponent implements OnInit {
usuario:Usuario;

idPaciente:any;
desde:number=0;
platillo:any[];
dieta:any[]=[];
d:any[]=[];
alimentosp:Alimentosp[]=[];
totalRegistro:number=0;
  constructor(
    public eventService: EventService,
    public _planesService: PlanesService,
    private modalService: NgbModal,
    public _platillosService:PlatillosService
  ) { }

  ngOnInit() {
    this.consultarP();
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
    this.eventService.getIdPaciente(this.usuario._id)
      .subscribe(resp=>{
       
        this.idPaciente=resp.pacientes[0]._id;
        this.consultarDietas();
       
        //console.log(this.idPaciente);
      });
  }
  consultarDietas(){
    this._planesService.consultarDietasPaciente(this.desde,this.idPaciente)
    .subscribe(resp=>{
     
      this.dieta=resp.dieta;
      this.totalRegistro=resp.total;
      console.log(this.dieta);
    })
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
    this.consultarDietas();
  }
  consultarPlatillos(d:any,content:any){
    this.d=d.dias;
   console.log(d);
    //console.log(this.d["martes"].desayunoM);
    this.modalService.open(content, { size: 'lg' });
 }
 abrirModal(content:any){
  this.modalService.open(content, { size: 'lg' });
 }
 consultarP(){
  console.log("entra");
  this._platillosService.consultarPlatillosPaciente()
    .subscribe(resp=>{
      //console.log(resp);
      this.platillo=resp;
      console.log(resp);
             
    });
  

}

consultarAlimentos(p:string){
  
  console.log(p);
  
  var selector:any=document.getElementById(p);
  
  var select:string= selector.options[selector.selectedIndex].value; //El texto de la opción seleccionada
  if(select.length>0){
  console.log("este es el select" ,select);
  
  this._platillosService.consultarAlimentosp(select)
    .subscribe(resp=>{
      //console.log(resp);
      this.alimentosp=resp;
      console.log(this.alimentosp);
             
    });
  }
 
}
}
