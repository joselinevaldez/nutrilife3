import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nutriologo',
  templateUrl: './nutriologo.component.html',
  styleUrls: ['./nutriologo.component.css']
})
export class NutriologoComponent implements OnInit {
nutriologo:any[]=[];
  constructor() { }

  ngOnInit() {
    this.nutriologo = JSON.parse(localStorage.getItem('datos'));
    console.log(this.nutriologo["nutriologo"]);
  }

}
