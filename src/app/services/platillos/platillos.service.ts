import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platillo } from '../../models/platillo.models';
import { URL_SERVICIOS } from '../../config/config';
import { Alimentosp } from '../../models/alimentosp.models';

@Injectable({
  providedIn: 'root'
})
export class PlatillosService {
  token : string;
  nutriologo:any[]=[];
  constructor(
    public http: HttpClient
  ) { }

  crearPlatillo(platillo: Platillo){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/platillo';
    url+='?token='+this.token;
    return this.http.post( url, platillo )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  crearAlimentosp(alimentosp: Alimentosp){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/alimentosp';
    url+='?token='+this.token;
    return this.http.post( url, alimentosp )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  consultarPlatillos(desde: number = 0){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/platillo';
    url+='?token='+this.token;
    url+='&desde='+desde;
    return this.http.get( url )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  consultarPlatillosSelect(){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/platillo/select';
    url+='?token='+this.token;
   
    return this.http.get( url )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.platillos;
              });
  }
  consultarPlatillosPaciente(){
    this.nutriologo = JSON.parse(localStorage.getItem('datos'));
    //console.log(this.nutriologo["nutriologo"]._id);
    var idnutriologo = this.nutriologo["nutriologo"]._id;
    //this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/platillo/paciente/'+idnutriologo;
    //url+='?token='+this.token;
   
    return this.http.get( url )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.platillos;
              });
            
  }
  consultarAlimentosp(platillo:string){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/alimentosp';
    url+='?token='+this.token;
    url+='&platillo='+platillo;
    return this.http.get( url )
              .map( (resp: any) => {

                ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.alimentosp;
              });
  }

  buscarPlatillo( termino:string){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/busqueda/coleccion/platillos/'+termino;
    
    url+='?token='+this.token;

    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.platillos;
              });
  }
  bajaPlatillo( id:string){
  
    let url = URL_SERVICIOS + '/platillo/baja/'+id;
    
    return this.http.put(url,"hola")
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.platillos;
              });
  }
  altaPlatillo( id:string){
  
    let url = URL_SERVICIOS + '/platillo/alta/'+id;
    
      return this.http.put(url,"hola")
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp.platillos;
              });
  }
}
