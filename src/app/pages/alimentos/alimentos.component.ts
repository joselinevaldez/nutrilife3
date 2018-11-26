import { Component, OnInit } from '@angular/core';
import { Alimento } from '../../models/alimento.models';
import { NgForm } from '@angular/forms';
import { AlimentosService } from '../../services/service.index';

@Component({
  selector: 'app-alimentos',
  templateUrl: './alimentos.component.html',
  styles: []
})
export class AlimentosComponent implements OnInit {
alimento: Alimento = new Alimento();
grupos:any=[
  "Lacteos y derivados",
  "Pescado,carne y huevos",
  "Legumbres,frutos secos y tuberculos",
  "verduras y hortalizas",
  "Frutas",
  "Cereales y derivados",
  "Grasas"
];
unidad:any=[
  "Cucharadita",
  "Cucharada",
  "Taza",
  "Vaso",
  "Litros",
  "Pieza",
  "Mililitros",
  "Gramos",
  "Miligramos",
  "Kilogramos"
];
  constructor(
    public _alimentoServices: AlimentosService
  ) { }

  ngOnInit() {
    
    
   
   
    
   
  }
  nuevoAlimento(alimento:NgForm){
    
    this.alimento.estatus="1";
    this._alimentoServices.guardarAlimento(this.alimento)
      .subscribe(resp=>{
        console.log(resp);
      })
    //console.log(this.alimento);
  }

}
