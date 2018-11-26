import { Injectable } from '@angular/core';
import { CanActivate,  Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
     public _usuarioService: UsuarioService,
     public router: Router
    ){

  }
  canActivate() {
    ///aqui tu vas a comprarar la variable en donde tengas el rol de tu usuario
    if( this._usuarioService.usuario.role ==='NUTRIOLOGO_ROLE') {
      return true;
    }else{
      console.log('Bloqueado por el ADMIN GUARD'); //si no tiene el rol de admin entonces lo sacas y llamas tu 
                                                  //funcion en donde haces el logout
      this._usuarioService.logout();
      return false;
    }
    
  }
}
