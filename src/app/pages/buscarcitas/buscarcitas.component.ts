import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/service.index';
import { Cita } from '../../models/cita.models';

@Component({
  selector: 'app-buscarcitas',
  templateUrl: './buscarcitas.component.html',
  styles: []
})
export class BuscarcitasComponent implements OnInit {
citas:Cita[];
public busquedaFechaDe = null;
public busquedaFechaHasta = null;
  constructor(
    public eventService:EventService
  ) { }

  ngOnInit() {
    this.citas=[];
   // this.cargarcitas();
  }
  cargarcitas(){
    console.log(this.busquedaFechaDe);
    console.log(this.busquedaFechaHasta);
    this.eventService.getCitasLista(this.busquedaFechaDe, this.busquedaFechaHasta).subscribe(data => {
      this.citas= data.citas;
      console.log(data.citas);
    });
  }
}
