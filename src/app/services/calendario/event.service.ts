import { Injectable } from '@angular/core';
import {  Observable, of} from 'rxjs';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Cita } from '../../models/cita.models';
@Injectable({
  providedIn: 'root'
})
export class EventService {
    token:string;
    constructor(public http: HttpClient){
        
    }
  public getCitasNutriologo() {
    this.token = localStorage.getItem('token');
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/citas/nutriologo';
    url+='?token='+this.token;
    
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
}
public getCitasPaciente(idPaciente:string) {
    console.log("este id busca",idPaciente);
    this.token = localStorage.getItem('token');
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/citas/paciente';
    url+='?id='+idPaciente;
    
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.citas;
              });
}
public getIdPaciente(id:string) {
   
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/paciente/id';
    url+='?id='+id;
    
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
}
public getIdNutriologo(id:string) {
   
  //this.nutriologo = localStorage.getItem('id');
  let url = URL_SERVICIOS + '/nutriologo/'+id;

  
  return this.http.get( url)
            .map( (resp: any) => {
             ///console.log(resp.usuario);
              //console.log(resp.paciente);
              return resp;
            });
}
public agendarCita(cita: Cita) {
    this.token = localStorage.getItem('token');
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/citas';
    url+='?token='+this.token;
    
    return this.http.post( url,cita)
              .map( (resp: any) => {
                  swal("Cita Agendada","Fecha: "+cita.start ,"success");
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
}
public actualizarCita(cita: Cita) {
    this.token = localStorage.getItem('token');
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/citas/'+cita._id;
      
    return this.http.put( url,cita)
              .map( (resp: any) => {
                  swal("Cita Actualizada","Fecha: "+cita.start ,"success");
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
}

}
