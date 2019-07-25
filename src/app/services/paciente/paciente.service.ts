import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Paciente } from '../../models/paciente.model';
import { Expediente} from '../../models/expediente.models';
import { Medidas } from '../../models/medidas.models';
import { Metas } from '../../models/meta.modelts';
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
    let url = URL_SERVICIOS + '/paciente';
    this.token = localStorage.getItem('token');
    url+='?token='+this.token;
    return this.http.post( url, paciente )
              .map( (resp: any) => {
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
  crearMetas(metas:Metas){
    let url = URL_SERVICIOS + '/metas';
    this.token = localStorage.getItem('token');
    url+='?token='+this.token;
    return this.http.post( url, metas )
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
  actualizarMedidas(medidas:Expediente){
    let url = URL_SERVICIOS + '/medidas';
    this.token = localStorage.getItem('token');
   
    url+='?token='+this.token;
    
    return this.http.post( url, medidas )
              .map( (resp: any) => {
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                swal("Exito","Las medidas ah sido actualizadas","success");
                console.log(resp);
                return resp;
              });
  }

  consultarMedidas(id:string){
    let url = URL_SERVICIOS + '/medidas/'+id;
    this.token = localStorage.getItem('token');
   
    url+='?token='+this.token;
    
    return this.http.get( url )
              .map( (resp: any) => {
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
               // swal("Exito","Las medidas ah sido actualizadas","success");
                console.log(resp);
                return resp;
              });
  }
  consultarMetas(id:string){
    let url = URL_SERVICIOS + '/metas/'+id;
    this.token = localStorage.getItem('token');
   
    url+='?token='+this.token;
    
    return this.http.get( url )
              .map( (resp: any) => {
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
               // swal("Exito","Las medidas ah sido actualizadas","success");
                //console.log(resp.metas);
                return resp;
              });
  }
  editarMeta(meta: Metas , id:string){
    let url = URL_SERVICIOS + '/metas/'+id;
    console.log("URL",url);
    console.log("METITA",meta);
    return this.http.put( url, meta )
              .map( (resp: any) => {

                 ///console.log(resp.usuario);
                //console.log(resp.paciente);
                swal("Exito","Las metas se ah actualizado","success");
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
  buscarPacienteEstatus( termino:string){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/busqueda/coleccion/pacientes-estatus/'+termino;
    
    url+='?token='+this.token;

    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.pacientes;
              });
  }
}
