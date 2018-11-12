import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styles: []
})
export class PlanesComponent implements OnInit {
cabeceras:any=[ 
  "dia","pre entrenamiento","post entrenamiento","desayuno","comida","cena"
];
dias:any=[
    "lunes","martes","miercoles","jueves","viernes"
  ];
filas:any=[];
total = this.cabeceras.length-1;
  constructor() { }

  ngOnInit() {
    var contador=0;
    for ( var i in this.cabeceras) {
      if(contador===0){

      }else{
        var res = this.cabeceras[i].replace(" ", "");
        this.filas.push(res);
      }
      contador+=1;
    }
    console.log("filas: ",this.filas);
      
  
 
  }

}
