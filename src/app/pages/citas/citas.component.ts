import { Component, OnInit } from '@angular/core';
declare function calendario();
declare function moment();
declare function fullcal();
@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styles: []
})
export class CitasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     moment();
     fullcal();
    calendario();
   
   

  }

}
