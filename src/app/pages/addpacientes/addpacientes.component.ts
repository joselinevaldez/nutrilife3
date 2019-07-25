import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, NgForm}from '@angular/forms';
import { Pacientenew } from '../../models/pacientenew.model';
import { Usuario } from '../../models/usuario.model';
import { PacienteService } from '../../services/service.index';
import { Expediente } from '../../models/expediente.models';
import { Metas } from '../../models/meta.modelts';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-addpacientes',
  templateUrl: './addpacientes.component.html',
  styleUrls: ['./addpacientes.component.css']
})
export class AddpacientesComponent implements OnInit {
  usuarioForm: FormGroup;
  press:boolean=false;
  g:any="Femenino";
  genero: any=[
    'Femenino','Masculino'
  ];
  estadosCiviles: any=[
    'Soltero(a)','Casado(a)','Viudo(a)','Union Libre'
  ];
  constructor(
    public _pacienteService: PacienteService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { 
   
  }
  
 /* sonIguales( campo1: string, campo2: string ) {

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

  }*/
  ngOnInit() {
    this.press=false;
    this.usuarioForm= new FormGroup({
      nombre: new FormControl(null,Validators.required),
      fechaNacimiento: new FormControl(null,Validators.required),
      estadoCivil:new FormControl(this.estadosCiviles[0]),
      religion:new FormControl(null),
      direccion:new FormControl(null, [Validators.required]),
      genero:new FormControl(this.genero[0]),
      telefono:new FormControl(null, Validators.compose([
      Validators.required,
      Validators.pattern('[0-9]{10}')
        
      ])),
      residencia:new FormControl(null,Validators.required),
      ocupacion:new FormControl(null,Validators.required)
      /*correo:new FormControl(null, Validators.compose([
      Validators.required,
      Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')
      ])),
      password:new FormControl(null, Validators.required),
      password2:new FormControl(null, Validators.required),
      },   { validators: this.sonIguales( 'password', 'password2' )  */} );
    
    
    }
  registrar(formValue: any ){
    this.press=true;
    console.log();
    console.log(formValue.value);
    //console.log(formValue.controls.correo.valid);
    //console.log(formValue.controls.telefono.valid);
    if(this.usuarioForm.valid){
      let pacientenew = new Pacientenew();
      pacientenew = formValue;
      var variable:any="N:15"
      console.log(pacientenew);
      this._router.navigate(['/historia',variable]);
    }else{
     
      
      //console.log(pacientenew);
      console.log("invalido");
    }
   /* if(this.usuarioForm.invalid){

      swal('Alto', 'Debes completar los campos requeridos', 'warning');
      return;
    }else{
      let paciente = new Pacientenew();
      console.log("si",paciente);
    }
   /* 
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
        .subscribe( resp=>{
          console.log("NUEVO USUARIO",resp.paciente._id);
          let meta = new Metas(
       
          );
          meta.paciente=resp.paciente._id;
          this._pacienteService.crearMetas(meta)
            .subscribe(resp=>{
              console.log("NUEVA META",resp);
            });
        })
          
      });*/
 
   }
  
   cambio(){
     var sexo:any = document.getElementById("genero");
     this.g = sexo.value;
    console.log(this.g);
  }
  calcularEdad() {
    /*var edad;
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
  //console.log("entro");*/
}
}
