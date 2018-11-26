import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
token:string;
  constructor(
    public http: HttpClient
  ) { }

  getNumPacientes( ){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/conteo/pacientes';
    url+='?token='+this.token;
   
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  getNumAlimentos( ){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/conteo/alimentos';
    url+='?token='+this.token;
   
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  getNumPlatillos( ){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/conteo/platillos';
    url+='?token='+this.token;
   
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
  getNumDietas( ){
    this.token = localStorage.getItem('token');
    let url = URL_SERVICIOS + '/conteo/dietas';
    url+='?token='+this.token;
   
    return this.http.get( url)
              .map( (resp: any) => {
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
  }
}
