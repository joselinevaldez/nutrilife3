import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    let promesa = new Promise( (resolve , reject) => {
     let contador=0;
     let itervalo = setInterval( () => {
        contador +=1;
        console.log(contador);
        if( contador === 3){
          resolve("ok!");
          clearInterval(itervalo);
        }
      },1000);
    });


    promesa.then(
      mensaje => console.log("termino: ",mensaje),
      
    ).catch( error=> console.error("Error en la promesa",error));
    
  }

  ngOnInit() {
  }

}
