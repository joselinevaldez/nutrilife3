import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators}from '@angular/forms';
import { Paciente } from '../../models/paciente.model';
import { Usuario } from '../../models/usuario.model';
import { PacienteService } from '../../services/service.index';
import { Expediente } from '../../models/expediente.models';
@Component({
  selector: 'app-addpacientes',
  templateUrl: './addpacientes.component.html',
  styleUrls: ['./addpacientes.component.css']
})
export class AddpacientesComponent implements OnInit {
  pacienteForm: FormGroup;
  recomendado:any=[
    'Si','No'
  ];
  sexo: any=[
    'Femenino','Masculino'
  ];
  estadosCiviles: any=[
    'Soltero(a)','Casado(a)','Viudo(a)','Union Libre'
  ];
  constructor(
    public _pacienteService: PacienteService
  ) { }
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
    //this.consultarPacientes();
    this.pacienteForm=new FormGroup({
      nombre:new FormControl(null, [Validators.required]),
      app:new FormControl(null, [Validators.required]),
      apm:new FormControl(null),
      estadocivil:new FormControl(this.estadosCiviles[0]),
      religion:new FormControl(null),
      direccion:new FormControl(null, [Validators.required]),
      fechanacimiento:new FormControl(),
      edad:new FormControl({value: '', disabled: true}),
      motivo:new FormControl(null),
      medio:new FormControl(null),
      radio: new FormControl(this.recomendado[0]),
      quienrecomendo:new FormControl(null),
      sexo:new FormControl(this.sexo[0]),
      telefono:new FormControl(null,Validators.required),
      correo:new FormControl(null, [Validators.required,Validators.email]),
      password:new FormControl(null, Validators.required),
      password2:new FormControl(null, Validators.required),
      },   { validators: this.sonIguales( 'password', 'password2' )  } );
    }
  registrar(){
    if(this.pacienteForm.invalid){
      swal('Alto', 'Debes completar los campos requeridos', 'warning');
      return;
    }
    
    var userid = localStorage.getItem('id');
    var f = new Date();
    
     var fecha =(f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate());
  
  
   let expediente = new Expediente(
       
  );
  this._pacienteService.crearExpediente(expediente)
    .subscribe( (resp:any)=>{
      var id:string;
      id=resp.expediente._id;
      let paciente = new Paciente(
        this.pacienteForm.value.nombre,
        this.pacienteForm.value.app,
        this.pacienteForm.value.apm,
        this.pacienteForm.value.estadocivil,
        this.pacienteForm.value.religion,
        this.pacienteForm.value.direccion,
        this.pacienteForm.value.fechanacimiento,
        this.calcularEdad(),
        this.pacienteForm.value.motivo,
        this.pacienteForm.value.radio,
        this.pacienteForm.value.medio,   
        this.pacienteForm.value.sexo,
        this.pacienteForm.value.telefono,
        "1",
        fecha,
        userid,
        this.pacienteForm.value.nombre,
        this.pacienteForm.value.password,
        this.pacienteForm.value.correo,
        "PACIENTE_ROLE",
        this.pacienteForm.value.quienrecomendo,
        id
        
       
      );
        this._pacienteService.crearPaciente(paciente)
        .subscribe( )
          
      });
 
   }


  calcularEdad() {
    var edad;
    var hoy = new Date();
     if (this.pacienteForm.value.fechanacimiento == null){
     
      edad=null;
    }else{
      var cumpleanos = new Date(this.pacienteForm.value.fechanacimiento);
   
     edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    //console.log(edad);
    var edad2:any= document.getElementById("edad");
    edad2.value=edad;
    return edad;
    
  }
  //console.log("entro");
}
}
