import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  citas: any[] =[
    {id:"1",nombre:'joseline',telefono:'6682414321',fecha:'14/02/2019',hora:'10:00:00 am',estatus:'1'},
    {id:"2",nombre:'raul',telefono:'6682414321',fecha:'14/02/2019',hora:'10:00:00 am',estatus:'0'},
    {id:"3",nombre:'lupita',telefono:'6682414321',fecha:'14/02/2019',hora:'10:00:00 am',estatus:'2'}

  ];
  constructor() { }
  getCitas(){
    return this.citas;
  }
}
