import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
   ajustes: Ajustes = {
     temaUrl:'assets/css/colors/blue.css',
     tema:'blue'

   }
  constructor(@Inject (DOCUMENT) private _document) { 
    this.cargarAjustes();
    console.log("cargando ajustes");
  }

  guardarAjustes(){
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
    console.log("guardado");
  }
  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes= JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
     
    }
  }
  aplicarTema(tema:string){
    let url = "assets/css/colors/";
    this._document.getElementById('tema').setAttribute('href',url+tema+".css");
    this.ajustes.tema=tema;
    this.ajustes.temaUrl=url;
    this.guardarAjustes();
  }
}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
