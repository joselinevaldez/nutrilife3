import { Component, OnInit } from '@angular/core';
import { HomeService, EventService, PacienteService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Paciente } from '../../models/paciente.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; //esta linea
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
numPacientes:any;
numAlimentos:any;
numPlatillos:any;
numDietas:any;
pesoB:number=0;
pesoA:number=0;
peso:number=0;
role:any;
estadopeso:string="";
infopeso:string="";
paciente:Paciente[]=[];
usuario: Usuario;
  constructor(
    public _homeService : HomeService,
    public eventService: EventService,
    private modalService: NgbModal,
    public _pacienteService: PacienteService
  ) { }

  ngOnInit() {
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
    console.log(this.usuario.role);
    if(this.usuario.role==="NUTRIOLOGO_ROLE"){
        this._homeService.getNumPacientes()
           .subscribe((resp:any)=>{
              this.numPacientes=resp.total;
            });
        this._homeService.getNumAlimentos()
            .subscribe((resp:any)=>{
               this.numAlimentos=resp.total;
             });
        this._homeService.getNumPlatillos()
             .subscribe((resp:any)=>{
                this.numPlatillos=resp.total;
             });
       this._homeService.getNumDietas()
             .subscribe((resp:any)=>{
                this.numDietas=resp.total;
             });
  }else if (this.usuario.role==="PACIENTE_ROLE"){
    console.log("idUSUARIO",this.usuario._id);
    this.eventService.getIdPaciente(this.usuario._id)
    
      .subscribe(resp=>{
        //console.log(resp.paciente);
      console.log("RESPUESTA",resp);
      console.log("PACIENTE",resp.pacientes[0]._id);
      this._pacienteService.consultarMedidas(resp.pacientes[0]._id)
       .subscribe(resp=>{
         console.log("MEDIDAS CONSULTADAS",resp.medidas);
         var longitud = resp.medidas.length;
         this.peso=resp.medidas[0].peso;
         this.pesoA=resp.medidas[longitud-1].peso;
         if((this.peso-this.pesoA)>0){
           var kilos = this.peso-this.pesoA;
           this.infopeso=kilos+"kg";
           this.estadopeso="bajo";
         }else if((this.peso-this.pesoA)<0){
          var kilos = this.peso-this.pesoA;
          this.infopeso=Math.abs(kilos)+"kg";
           console.log("Haz subido: "+Math.abs(kilos)+"kg");
           this.estadopeso="subio";
          }else if((this.peso-this.pesoA)==0){
            console.log("Tu peso sigue igual");
            this.infopeso="Atencion";
            this.estadopeso="igual";
          }
       });
        
        
        this.pesoB=resp.pacientes[0].expediente.pesoB;
        this.paciente=resp.pacientes[0];
       
        console.log(this.paciente);
            this.eventService.getIdNutriologo(resp.pacientes[0].nutriologo)
            .subscribe(resp=>{
              console.log(resp);
             // this.paciente=resp.pacientes[0];
             localStorage.setItem('datos', JSON.stringify(resp.nutriologos[0]) );
            
         
              console.log(resp);
            });
      });
  
  
  }
  }
  modal(modal){
    this.modalService.open(modal, { size: 'lg' });
  }
}
