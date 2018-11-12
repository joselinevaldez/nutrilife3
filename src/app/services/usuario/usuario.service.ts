import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Nutriologo } from '../../models/nutriologo.models';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {
usuario: Usuario;
nutriologo: Nutriologo;
token: string;
  constructor(
    public router : Router,
      public http: HttpClient,
      public _subirArchivoService: SubirArchivoService
  ) {  this.cargarStorage();
  }
  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {

    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario') );
      this.nutriologo = JSON.parse(localStorage.getItem('datos'));
    } else {
      this.token = '';
      this.usuario = null;
      this.nutriologo= null;
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
    localStorage.removeItem('datos');
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
                if( resp.usuario.role ==="NUTRIOLOGO_ROLE"){
                  localStorage.setItem('datos', JSON.stringify(resp.nutriologos) );
                }
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
actualizarUsuario(usuario: Usuario){
  let url = URL_SERVICIOS+'/usuario/'+usuario._id;
  url+='?token='+this.token;
  return this.http.put(url,usuario)
  .map( (resp: any)=>{
   // this.usuario = resp.usuario;
   let usuarioDB: Usuario = resp.usuario;
   this.guardarStorage( usuarioDB._id,this.token,usuarioDB);
    swal('Perfil actualizado', usuario.nombre,'success');
    return true;
  })

}
actualizarNutriologo(nutriologo: Nutriologo,nutriologo2:Nutriologo){
  let url = URL_SERVICIOS+'/nutriologo/'+nutriologo._id;
  url+='?token='+this.token;
  return this.http.put(url,nutriologo)
  .map( (resp: any)=>{
   // this.usuario = resp.usuario;
   let nutriologoDB: Nutriologo = resp.nutriologo;
   localStorage.setItem('datos', JSON.stringify(nutriologo2) );
   swal('Informacion actualizada',this.usuario.nombre,'success');
    return true;
  })

}


cambiarImagen( archivo: File, id: string ) {

  this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (resp: any) => {

          this.usuario.img = resp.usuario.img;
          swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
          this.guardarStorage( id, this.token, this.usuario );
          console.log( resp );
        })
        .catch( resp => {
          console.log( resp );
        }) ;

}

}