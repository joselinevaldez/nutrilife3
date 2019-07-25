import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alimento } from '../../models/alimento.models';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AlimentosService {
token:string;
  constructor(
    public http: HttpClient
  ) { }

  public guardarAlimento(alimento: Alimento) {
    this.token = localStorage.getItem('token');
    //this.nutriologo = localStorage.getItem('id');
    let url = URL_SERVICIOS + '/alimentos';
    url+='?token='+this.token;
    
    return this.http.post( url,alimento)
              .map( (resp: any) => {
                  swal("Alimento Creado",alimento.nombre ,"success");
               ///console.log(resp.usuario);
                //console.log(resp.paciente);
                return resp;
              });
}

public cargarAlimento(desde: number = 0) {
  this.token = localStorage.getItem('token');
  //this.nutriologo = localStorage.getItem('id');
  let url = URL_SERVICIOS + '/alimentos';
  url+='?token='+this.token;
  url+='&desde='+desde;
  return this.http.get( url)
            .map( (resp: any) => {
               ///console.log(resp.usuario);
              //console.log(resp.paciente);
              return resp;
            });
}
public buscarAlimento( termino:string){
  this.token = localStorage.getItem('token');
  let url = URL_SERVICIOS + '/busqueda/coleccion/alimentos/'+termino;
  
  url+='?token='+this.token;

  return this.http.get( url)
            .map( (resp: any) => {
             ///console.log(resp.usuario);
              //console.log(resp.paciente);
              return resp.alimentos;
            });
}

public buscarAlimentoCategoria( termino:string,categoria:string){
  this.token = localStorage.getItem('token');
  let url = URL_SERVICIOS + '/busqueda/coleccion/alimentos/'+termino;
  
  url+='?token='+this.token+'&categoria='+categoria;

  return this.http.get( url)
            .map( (resp: any) => {
             ///console.log(resp.usuario);
              //console.log(resp.paciente);
              return resp.alimentos;
            });
}
public cargarAlimentoSelect(grupo:string) {
  this.token = localStorage.getItem('token');
  //this.nutriologo = localStorage.getItem('id');
  let url = URL_SERVICIOS + '/alimentos/'+grupo;
  url+='?token='+this.token;
 
  return this.http.get( url)
            .map( (resp: any) => {
               ///console.log(resp.usuario);
              //console.log(resp.paciente);
              return resp;
            });
}
public actualizarAlimento(alimento: Alimento) {
  //this.token = localStorage.getItem('token');
  //this.nutriologo = localStorage.getItem('id');
  let url = URL_SERVICIOS + '/alimentos/'+alimento._id;
    
  return this.http.put( url,alimento)
            .map( (resp: any) => {
                swal("Alimento Actualizado",alimento.nombre ,"success");
             ///console.log(resp.usuario);
              //console.log(resp.paciente);
              return resp;
            });
}
}
