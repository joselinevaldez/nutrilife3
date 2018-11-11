import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS +'/img';
  
    if(!img){
      return url + '/usuarios/nada';
    }
    switch(tipo){
      case 'usuario':
       url += '/usuarios/'+img;
      break;
      default:
      url += '/usuarios/nada';
    }
    return url;
  }

}
