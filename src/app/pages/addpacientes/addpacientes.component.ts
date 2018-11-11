import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators}from '@angular/forms';
@Component({
  selector: 'app-addpacientes',
  templateUrl: './addpacientes.component.html',
  styleUrls: ['./addpacientes.component.css']
})
export class AddpacientesComponent implements OnInit {
  pacienteForm: FormGroup;
  constructor() { }
  sonIguales( campo1: string, campo2: string ) {

    return ( group: FormGroup ) => {

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if ( pass1 === pass2 ) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }
  ngOnInit() {
    this.pacienteForm=new FormGroup({
      correo:new FormControl(null, [Validators.required,Validators.email]),
      password:new FormControl(null, Validators.required),
      password2:new FormControl(null, Validators.required),
      },   { validators: this.sonIguales( 'password', 'password2' )  } );
   
  }
  registrarUsuario(){
  
  }
}
