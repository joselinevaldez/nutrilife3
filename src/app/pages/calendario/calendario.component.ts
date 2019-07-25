import { Component, OnInit,ViewChild ,ViewEncapsulation } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { NgbModal,NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectComponent}from '@ng-select/ng-select';
import { EventService, PacienteService } from '../../services/service.index';
import { Paciente } from '../../models/paciente.model';

import { Cita } from '../../models/cita.models';
import { NgForm } from '@angular/forms';
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
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
export class CalendarioComponent implements OnInit {
  

  datosfecha:any;
  cita:Cita = new Cita();
  pacientes:Paciente;
  calendarOptions: Options;
  displayEvent: any;
  events = null;
  alert:boolean=false;
  options=[
    "uno","dos","tres"
  ]
  
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(
    private _pacienteService: PacienteService,
    private modalService: NgbModal,
    protected eventService: EventService
  
  ) { }
  openLg(content) {
    this.modalService.open(content, { size: 'sm' });
  }//
  openNueva(content) {
    this.modalService.open(content, { size: 'sm' });
    this.limpiar();
  }//

    
  ngOnInit() {
    jQuery('select').selectpicker();
    this.getPacientes();
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: []
    };
    this.loadevents();
  }
  loadevents() {
    this.eventService.getCitasNutriologo().subscribe(data => {
      this.events = data.citas;
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
    //console.log(this.displayEvent);
  }
    getPacientes(){
    this._pacienteService.getPacienteSelect()
      .subscribe(resp=>{
        this.pacientes=resp.pacientes;
        console.log(this.pacientes);
      });
  }
  nuevaC(nuevaCita: NgForm){
    this.cita.color="#F2EB6A";
    this.cita.estatus="2";    
    console.log(this.cita);
    this.eventService.agendarCita(this.cita)
      .subscribe(resp=>{
        console.log(resp);
        this.loadevents();
      });
  }
 eventClick(model: any) {
    //var hora:number = parseInt(((model.event.start).toString()).substr(16,2));
    //var minutos:number =parseInt(((model.event.start).toString()).substr(19,2));
     //this.time2 = {hour: hora , minute: minutos};
    model = {
      event: {
        id: model.event._id,
        time:model.event.time,
        paciente:model.event.paciente,
        estatus:model.event.estatus,
        start: (model.event.start._i).toString().substring(0,10),
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
    this.cita._id=this.displayEvent.event.id;
    this.cita.estatus=this.displayEvent.event.estatus;
    this.cita.title=this.displayEvent.event.title;
    this.cita.paciente=this.displayEvent.event.paciente;
    this.cita.start=this.displayEvent.event.start;
    this.cita.time=this.displayEvent.event.time;
    console.log(this.cita);
   // this.abrirModal("content");
  }

  editarC(editarCita: NgForm){
    console.log("editada",this.cita);
    if( this.cita.estatus ==="0"){
      this.cita.color="#F5A585";
    }
    if( this.cita.estatus ==="2"){
      this.cita.color="#F2EB6A";
    }
    if( this.cita.estatus ==="1"){
      this.cita.color="#A3ECA7";
    }
    this.eventService.actualizarCita(this.cita)
      .subscribe(resp=>{
        console.log(resp);
        this.loadevents();
     
      });
     
  
  }
  limpiar(){
    this.cita._id='';
    this.cita.estatus='';
    this.cita.title='';
    this.cita.paciente='';
    this.cita.start=null;
    this.cita.time='';
  }
  modalbuscar(modal){
    this.modalService.open(modal);
 
  }

  buscarPaciente(termino:string){
    if (termino.length <= 0){
      this.getPacientes();
      return;
    }
    console.log(termino);
     
    ///
    this._pacienteService.buscarPaciente(termino)
      .subscribe( (pacientes)=>{
        this.pacientes=pacientes;
        //console.log(this.paciente);
      });
      //console.log("arreglo",this.paciente.length);
  }
  seleccionar(p:any,modal:any){
    console.log(p);
    this.cita.paciente=p._id;
    this.alert=true;
    
  }
  cancelar(){
    this.alert=false;
  }
  /*
  updateEvent(model: any) {
    alert("entroAqui");
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
    console.log(this.displayEvent);
    
  }*/

}
