import { Component, OnInit } from '@angular/core';
import { HomeService, EventService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Paciente } from '../../models/paciente.model';

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
paciente:Paciente[]=[];
usuario: Usuario;
  constructor(
    public _homeService : HomeService,
    public eventService: EventService
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
    this.eventService.getIdPaciente(this.usuario._id)
    
      .subscribe(resp=>{
        //console.log(resp.paciente);
        //console.log(resp);
        this.peso=resp.pacientes[0].expediente.peso;
        this.pesoA=resp.pacientes[0].expediente.pesoA;
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
}
