import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, NgForm}from '@angular/forms';
import { Paciente} from '../../models/paciente.model';
import { Usuario } from '../../models/usuario.model';
import { PacienteService } from '../../services/service.index';
import { Expediente } from '../../models/expediente.models';
import { Metas } from '../../models/meta.modelts';
import { Router ,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-addpacientes',
  templateUrl: './addpacientes.component.html'
})
export class AddpacientesComponent implements OnInit {
  usuarioForm: FormGroup;
  press:boolean=false;
  g:any="Femenino";
  genero: any=['Femenino','Masculino'];
  estadosCiviles: any=['Soltero(a)','Casado(a)','Viudo(a)','Union Libre'];
  constructor(
    public _pacienteService: PacienteService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { }
  ngOnInit() {
    this.press=false;
    this.usuarioForm= new FormGroup({
      nombre: new FormControl(null,Validators.required),
      fechaNacimiento: new FormControl(null,Validators.required),
      estadoCivil:new FormControl(this.estadosCiviles[0]),
      religion:new FormControl(null),
      direccion:new FormControl(null, [Validators.required]),
      sexo:new FormControl(this.genero[0]),
      telefono:new FormControl(null, Validators.compose([
      Validators.required,
      Validators.pattern('[0-9]{10}')])),
      residencia:new FormControl(null,Validators.required),
      ocupacion:new FormControl(null,Validators.required)
      } );
    }
  registrar(formValue: any ){
    this.press=true;
    if(this.usuarioForm.valid){
      let pacientenew = new Paciente();
      pacientenew = formValue;
      this._pacienteService.crearPaciente(pacientenew)
        .subscribe( resp=>{
          swal({ 
            title: "Paciente registrado correctamente ¿Deseas llenar el historial clinico?",
            text: "Preciona aceptar",
            icon: "success",
            buttons: true,
            dangerMode: false,
          })
          .then((willDelete) => {
            
            if (willDelete ===true) {
    
              this._router.navigate(['/historia','nuevo', resp.paciente._id]);
              
            } else {
              this._router.navigate(['/expedientes']);
            }
          });
           
        });
      
     
    }
  
 
   }
  
   cambio(){
     var sexo:any = document.getElementById("sexo");
     this.g = sexo.value;
  }
  
  

}
