
import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CitasService, EventService } from '../../services/service.index';
import { Cita } from '../../models/cita.models';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import { NgForm } from '@angular/forms';
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
 
  datosfecha:any;
  cita:Cita = new Cita();
  idUser:string;
  idPaciente:string;
  calendarOptions: Options;
  displayEvent: any;
  events = null;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

 //etiqueta="label label-table label-success";
  constructor(
   
    private modalService: NgbModal,
    protected eventService: EventService) {

    
  }

 

  

  

  ngOnInit() {

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
  openLg(content) {
    this.modalService.open(content, { size: 'sm' });
  }
  loadevents() {
    this.idUser=localStorage.getItem("id");
    this.eventService.getIdPaciente(this.idUser).subscribe(res => {
      this.idPaciente=res.pacientes[0]._id;
      this.eventService.getCitasPaciente(this.idPaciente).subscribe(data => {
        this.events = data;
        console.log(this.events);
      });
      
    });
   
  }
  clickButton(model: any) {
    this.displayEvent = model;
    //console.log(this.displayEvent);
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
}
