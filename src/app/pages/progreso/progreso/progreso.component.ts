import { Component, OnInit } from '@angular/core';
import { Expediente } from '../../../models/expediente.models';
import { Usuario } from '../../../models/usuario.model';
import { EventService, PacienteService } from '../../../services/service.index';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.css']
})
export class ProgresoComponent implements OnInit {
  exp:any;
  existe:boolean=false;
  usuario: Usuario;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  }
  public barChartLabels= [];
  public barChartType='bar';;
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [], label: 'Cintura (cm)'},
    {data: [], label: 'Abdomen (cm)'},
    {data: [], label: 'Cadera (cm)'},
    {data: [], label: 'Peso (kg)'},
    {data: [], label: 'Brazo (cm)'},
    {data: [], label: 'Gluteo (cm)'},
    {data: [], label: 'Muslo (cm)'},
    {data: [], label: 'Grasa corporal(%)'},
    {data: [], label: 'Grasa Viceral(%)'}

  ];
 mostrargrafica:boolean=false;
  public chartColors: any[]  = [ 
    {backgroundColor: '#F585CC'}, 
    {backgroundColor: '#85BBF5'}, 
    {backgroundColor: '#3AF227'},
    {backgroundColor:'#F2D027'},
    {backgroundColor:'#BAB59D'},
    {backgroundColor:'#AEF9C5'},
    { backgroundColor:'#B1AEF9'},
    {backgroundColor:'#E6A3F3'},
    {backgroundColor:'#E0B989'}
    ];
  constructor(
   public eventService: EventService,
   public _pacienteService:PacienteService
  ) { 
   
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
        console.log("PACIENTE",resp.pacientes[0]._id);
         this._pacienteService.consultarMedidas(resp.pacientes[0]._id)
          .subscribe(resp=>{
            if(resp.medidas.length==0){
              console.log("no hay nada");
              this.mostrargrafica=false;
            }else{
              this.mostrargrafica=true;
                for(var p in resp.medidas){
                  this.barChartData[0].data.push(resp.medidas[p].cintura);
                  this.barChartData[1].data.push(resp.medidas[p].abdomen);
                  this.barChartData[2].data.push(resp.medidas[p].cadera);
                  this.barChartData[3].data.push(resp.medidas[p].peso);
                  this.barChartData[4].data.push(resp.medidas[p].brazo);
                  this.barChartData[5].data.push(resp.medidas[p].gluteo);
                  this.barChartData[6].data.push(resp.medidas[p].muslo);
                  this.barChartData[7].data.push(resp.medidas[p].grasacorporal);
                  this.barChartData[8].data.push(resp.medidas[p].grasaviceral);
                  this.barChartLabels.push((resp.medidas[p].fecha).toString().substring(0,10));
                }
              }
          });
       // this.exp=resp.pacientes[0].expediente
           
            
      });
  }

}
