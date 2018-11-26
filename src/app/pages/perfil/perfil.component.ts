import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Nutriologo } from '../../models/nutriologo.models';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
usuario: Usuario;
nutriologo: Nutriologo;
imagenSubir:File;
imagenTemp:File;
  constructor(
    public _usuarioService: UsuarioService
    
  ) {
    this.usuario=this._usuarioService.usuario;
    this.nutriologo=this._usuarioService.nutriologo;
   }

  ngOnInit() {
    this.usuario = JSON.parse( localStorage.getItem('usuario') );
    console.log(this.usuario.role);
    if ( localStorage.getItem('datos')) {
      this.nutriologo = JSON.parse( localStorage.getItem('datos') );
      
    }
    console.log("este es el nutriologo: ",this.nutriologo);
        //console.log(this.nutriologo[0].nombreconsultorio);
  }
guardarUsuario( usuario: Usuario){
  this.usuario.nombre=usuario.nombre;
  this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe(resp =>{
      console.log(resp);
    });
  }
  guardarDatos(nutriologo:Nutriologo){
    this.nutriologo.direccion=nutriologo.direccion;
    this.nutriologo.nombreconsultorio=nutriologo.nombreconsultorio;
    this.nutriologo.telefono=nutriologo.telefono;
    this.nutriologo.horario=nutriologo.horario;
    this._usuarioService.actualizarNutriologo(this.nutriologo,this.nutriologo)
        .subscribe(resp =>{
          console.log(resp);
        });
    console.log("datos recibidos",this.nutriologo[0]);
  }
  seleccionImage( archivo: File){
    if(!archivo){
      this.imagenSubir=null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir=archivo;
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

   // console.log(event);
  }
  cambiarImagen(){
    this._usuarioService.cambiarImagen(this.imagenSubir,this.usuario._id);
  }
}

