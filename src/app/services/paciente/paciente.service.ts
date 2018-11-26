import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Paciente } from '../../models/paciente.model';
import { Expediente} from '../../models/expediente.models';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {
token : string;
nutriologo: string;
  constructor(
    public http: HttpClient,
  ) { }

  crearPaciente(paciente: Paciente){
    let url = URL_SERVICIOS + '/usuario';
    
    return this.http.post( url, paciente )
              .map( (resp: any) => {

                swal('Usuario creado', paciente.email, 'success' );
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  ////
  crearExpediente(expediente:Expediente){
    let url = URL_SERVICIOS + '/expediente';
    this.token = localStorage.getItem('token');
    url+='?token='+this.token;
    return this.http.post( url, expediente )
              .map( (resp: any) => {
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                console.log(resp);
                return resp;
              });
  }
  getPaciente( desde: number = 0){
    this.token = localStorage.getItem('token');
    this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/paciente';
    url+='?token='+this.token;
    url+='&desde='+desde;
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }

  getPacienteSelect(){
    this.token = localStorage.getItem('token');
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/paciente/select';
    url+='?token='+this.token;
    
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  editarExpediente(expediente:Expediente){
    let url = URL_SERVICIOS + '/expediente/'+expediente._id;
   
    return this.http.put( url, expediente )
              .map( (resp: any) => {
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                swal("Exito","Expediente Actualizado","success");
                console.log(resp);
                return resp;
              });
  }

  editarPaciente(paciente: Paciente){
    let url = URL_SERVICIOS + '/paciente/';
    url+= paciente._id;
    return this.http.put( url, paciente )
              .map( (resp: any) => {

                swal('Paciente Actualizado', paciente.nombre, 'success' );
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }

  buscarPaciente( termino:string){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/busqueda/coleccion/pacientes/'+termino;
    
    url+='?token='+this.token;

    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.pacientes;
              });
  }
}
