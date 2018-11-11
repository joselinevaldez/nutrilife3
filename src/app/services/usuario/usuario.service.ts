import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {
usuario: Usuario;
token: string;
  constructor(
    public router : Router,
      public http: HttpClient
  ) {  this.cargarStorage();
  }
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
    } else {
      this.token = '';
      this.usuario = null;
    }

  }
  guardarStorage( id: string, token: string, usuario: Usuario ) {

    localStorage.setItem('id', id );
    localStorage.setItem('token', token );
    localStorage.setItem('usuario', JSON.stringify(usuario) );

    this.usuario = usuario;
    this.token = token;
  }
  

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

login(usuario: Usuario, recordar:boolean=false){

  if(recordar){
    localStorage.setItem('email', usuario.email);
  }else{
    localStorage.removeItem('email');
  }
  let url = URL_SERVICIOS + '/login';
  return this.http.post( url, usuario )
              .map( (resp: any) => {

                this.guardarStorage( resp.id, resp.token, resp.usuario );

                return true;
              });

}
crearUsuario(usuario: Usuario){
    let url = URL_SERVICIOS + '/usuario';


   

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                console.log(resp.usuario._id);
                return resp.usuario;
              });
  }


}