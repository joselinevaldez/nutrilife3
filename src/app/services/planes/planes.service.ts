import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dieta } from '../../models/planes.models';
import { URL_SERVICIOS } from '../../config/config';
import { Dietapaciente } from '../../models/dietapaciente';

@Injectable({
  providedIn: 'root'
})
export class PlanesService {
token:string;
  constructor(
    public http: HttpClient
  ) { }

  crearDieta(dieta: any){
   
    this.token = localStorage.getItem('token');
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/dietas';
    url+='?token='+this.token;
    return this.http.post( url, dieta)
              .map( (resp: any) => {

                swal('Dieta creada', dieta.nombre, 'success' );
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  AsignarDieta(dietaspaciente: Dietapaciente){
   
    this.token = localStorage.getItem('token');
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/dietapaciente';
    url+='?token='+this.token;
    return this.http.post( url, dietaspaciente)
              .map( (resp: any) => {

                swal('Dieta asignada', 'Haz asignado correctamente la dieta a tu paciente', 'success' );
                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  buscarDieta( termino:string){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/busqueda/coleccion/dietas/'+termino;
    
    url+='?token='+this.token;

    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.dietas;
              });
  }
  consultarDietas(desde: number = 0){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/dietas';
    url+='?token='+this.token;
    url+='&desde='+desde;
    return this.http.get( url )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  consultarDietasSelect(){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/dietas/select';
    url+='?token='+this.token;
    
    return this.http.get( url )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  editarDieta(id:string ,dieta:string){
    
    let url = URL_SERVICIOS + '/expediente/dieta/'+id+'/'+dieta;
   
    
    return this.http.put( url ,"hola")
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  consultarDietasPaciente(desde: number = 0,paciente:string){
  
    let url = URL_SERVICIOS + '/dietapaciente/'+paciente;
   
    url+='?desde='+desde;
    return this.http.get( url )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }

  bajaPlan( id:string){
  
    let url = URL_SERVICIOS + '/dietas/baja/'+id;
    
    return this.http.put(url,"hola")
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.dieta;
              });
  }
  altaPlan( id:string){
  
    let url = URL_SERVICIOS + '/dietas/alta/'+id;
    
      return this.http.put(url,"hola")
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.dieta;
              });
  }
}
