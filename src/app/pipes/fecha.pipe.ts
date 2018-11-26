import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: any , limite: number): any {
    var fechanueva = (fecha.toString()).substring(0,limite);
    return fechanueva;
  }

}
