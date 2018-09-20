import { Component, OnInit } from '@angular/core';
declare function init_plugins();
declare function calendario();
declare function moment();
declare function fullcal();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
    moment();
    fullcal();
    calendario();
    
    
  }

}
