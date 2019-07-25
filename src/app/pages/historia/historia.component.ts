import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators}from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css']
})

export class HistoriaComponent implements OnInit {
  personalForm: FormGroup;
  patologicosForm: FormGroup;
  actividadForm: FormGroup;
  alimentacionForm: FormGroup;
  press:boolean = false;
  guardando:boolean=false;
  opciones: any=['Si','No'];
  antFamiliares :any=['Ninguno','Mama','Papa'];
  calificaciones :any=['1','2','3','4','5','6','7','8','9','10'];
  dias :any=['1','2','3','4','5','6','7'];
  comidas :any=['Casa','Calle','Trabajo'];
  comidatrabajo :any=["Calle','Comedor del trabajo','Hecha en casa'"];
  diagnostico: any=['Saludable','Por debajo del peso','Sobrepeso','Obesidad'];
  tipohistoria:any;
  constructor(
    public _activatedRoute: ActivatedRoute
  ) { 
    _activatedRoute.params.subscribe(params =>{
      let accion=params['accion'];
      let id= params['id'];
      this.tipohistoria=accion;
    })
  }
  
  ngOnInit() {
    // FORMULARIO INFORMACION PERSONAL
    this.personalForm=new FormGroup({
     diagnostico:new FormControl(this.diagnostico[0]),
     edadobesidad:new FormControl(null),
     tiempopeso:new FormControl(null, [Validators.required]),
     disposicion:new FormControl(null, [Validators.required]),
     motivo:new FormControl(null, [Validators.required]),
     tanteriores:new FormControl(this.opciones[1]),
     termino:new FormControl(this.opciones[0]),
     notermino:new FormControl(null)
       } );
   //TERMINA FORMULARIO INFORMACION PERSONAL 
   //FORMULARIO ANTECEDENTES PATOLOGICOS
   this.patologicosForm=new FormGroup({
    fsobrepeso:new FormControl(this.antFamiliares[0]),
    fobesidad:new FormControl(this.antFamiliares[0]),
    fdiabetes:new FormControl(this.antFamiliares[0]),
    fhipertencion:new FormControl(this.antFamiliares[0]),
    fcancer:new FormControl(this.antFamiliares[0]),
    pcolitis:new FormControl(this.opciones[1]),
    pestrenimiento:new FormControl(this.opciones[1]),
    pgastritis:new FormControl(this.opciones[1]),
    pdiabetes:new FormControl(this.opciones[1]),
    pobesidad:new FormControl(this.opciones[1]),
    phipertencion:new FormControl(this.opciones[1]),
    otropersonal:new FormControl(null),
    otrofamiliar:new FormControl(null)
    
      } );
    //TERMINA FORMULARIO ANTECEDENTES PATOLOGICOS
    //FORMULARIO ACTIVIDAD FISICA
    this.actividadForm=new FormGroup({
      calificacion:new FormControl(this.calificaciones[0]),
      tejercicio: new FormControl(null,Validators.required),
      diasejercicio:new FormControl(this.dias[0]),
      tiempoejercicio: new FormControl(null,Validators.required),
        } );


    //TERMINA FORMULARIO ACTIVIDAD FISICA
    //FORMULARIO DIETA
    this.alimentacionForm=new FormGroup({
      
      agua: new FormControl(null,Validators.required),
      comidasdia:new FormControl(null,Validators.required),
      dondecome: new FormControl(this.comidas[0]),
      comidatrabajo: new FormControl(this.comidatrabajo[0])
        } );
  //
  }
 formPersonal(personalForm:any){
    this.press=true;
    if(personalForm.valid){
      this.guardando=true;
      console.log(personalForm);
    }else{
      console.log("invalido");
    }
    
   
   }
 formPatologicos(patologicosForm:any){
   console.log(patologicosForm);
  
    this.guardando=true;
   
 }
}
