import { Component, OnInit } from '@angular/core';
import { Expediente } from '../../../models/expediente.models';
import { Usuario } from '../../../models/usuario.model';
import { EventService } from '../../../services/service.index';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.css']
})
export class ProgresoComponent implements OnInit {
  exp:any;
  existe:boolean=false;
  usuario: Usuario;
  
  constructor(
   public eventService: EventService
  ) { 
    this.cargar();
  }

  ngOnInit() {
   this.cargar();
   
  }
  cargar(){
    
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
    console.log(localStorage.getItem("expediente"));

    this.eventService.getIdPaciente(this.usuario._id)
      .subscribe(resp=>{
        this.existe=true
        //console.log(resp);
        this.exp=resp.pacientes[0].expediente
           
            
      });
  }

}
