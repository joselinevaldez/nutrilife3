import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styles: []
})
export class PlatillosComponent implements OnInit {
datas:any=[];
select : any;
tabla:any;
cantidad: any;
contador:number;
acumulador:number;
numero:number;
total:number;
existe:boolean;
posicion:string;
  constructor() { }

  ngOnInit() {
    //this.agregarAlimento();
    this.contador=0;
    this.total=0;
    this.acumulador=0;
    this.cantidad=0;
    this.existe=false;
  }
  agregarAlimento(){
    //INICIALIZACION DE VARIABLES
    this.existe=false;
    this.contador=0;
    this.total=0;
    this.acumulador=0;
    this.cantidad=0;
    ///
    this.select = document.getElementById("alimento"); //El <select>
         //El valor seleccionado
    
    var id = this.select.options[this.select.selectedIndex].value; //El texto de la opción seleccionada
    var alimento = this.select.options[this.select.selectedIndex].text; //El texto de la opción seleccionada
    this.cantidad =document.getElementById("cantidad");
    ///CHECAR SI YA EXISTE
    for (var i in this.datas) {
      if(this.datas[i].id == id){
        this.acumulador =parseFloat( this.datas[i].cantidad);
        this.numero= parseFloat(this.cantidad.value);
        this.acumulador+=this.numero;
        this.existe=true;
        this.posicion=i;
       // 
        break;
        
      }else{
        this.existe=false;
      }
  }


    ////
    if(this.existe==true){
      this.datas[this.posicion].cantidad=this.acumulador;
    }else{
    var alimentoNuevo = {"fila":this.contador,"id": id, "alimento": alimento,"cantidad":this.cantidad.value};
    this.datas.push(alimentoNuevo);
    }
    console.log(this.datas);
    this.contador++;
 
 
  }
  remover(fila){
      for (var i in this.datas) {
          if(this.datas[i].fila == fila){
            this.datas.splice(i,1); 
                    break;
          }
      }
      console.log("DESPUES DE REMOVER: ", this.datas);
 }
 
 
}
