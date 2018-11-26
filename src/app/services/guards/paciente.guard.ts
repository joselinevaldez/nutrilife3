import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class PacienteGuard implements CanActivate {
  constructor(
    public _usuarioService : UsuarioService,
    public router:Router
  ){

  }
  canActivate(
   ) {
    if( this._usuarioService.usuario.role ==='PACIENTE_ROLE'){
      return true;
    }else{
      console.log('Bloqueado por el PACIENTE GUARD');
      this._usuarioService.logout();
      return false;
    }
  }
}
