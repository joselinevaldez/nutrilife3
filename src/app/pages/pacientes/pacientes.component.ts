import { Component, OnInit ,ViewEncapsulation } from '@angular/core'; //viewEncapsulation
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; //esta linea
import { PacienteService } from '../../services/service.index';
import { Paciente } from '../../models/paciente.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { cleanSession } from 'selenium-webdriver/safari';
import { Expediente } from '../../models/expediente.models';
import { PlanesService } from '../../services/planes/planes.service';
import { Dietapaciente } from '../../models/dietapaciente';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `] //estos estilos
})
export class PacientesComponent implements OnInit {
paciente:Paciente[]=[];
editado:Paciente = new Paciente();
exp:Expediente = new Expediente();
desde:number=0;
antecedentes:any;
totalRegistro:number=0;
p:any;
dietaAnt:boolean;
sexo: any=[
  'Femenino','Masculino'
];
recomendado: any=[
  'Si','No'
];
estadosCiviles: any=[
  'Soltero(a)','Casado(a)','Viudo(a)','Union Libre'
];
opciones:any=[
  'seleccione','si','no'
];
dietaA:any;
pacienteID:any;
dietas:any[]=[];
idExpediente:string;
dietapaciente:Dietapaciente=new Dietapaciente();
  constructor(
    public _pacienteService:PacienteService,
    private modalService: NgbModal,
    public _planesService: PlanesService //esta linea
  ) { }

  ngOnInit() {
  this.consultarPacientes();
  }
  
  //esta funcion
  expedienteModal(content,p:any) {
    console.log(p.expediente);
    this.exp._id=p.expediente._id;
    this.exp.abdomen=p.expediente.abdomen;
    this.exp.abdomenA=p.expediente.abdomenA;
    this.exp.antecedentes=p.expediente.antecedentes;
    this.exp.cintura=p.expediente.cintura;
    this.exp.cinturaA=p.expediente.cinturaA;
    this.exp.cirugias=p.expediente.cirugias;
    
    this.exp.estatura=p.expediente.estatura;
    this.exp.exploracion=p.expediente.exploracion;
    this.exp.grasacorporal=p.expediente.grasacorporal;
    this.exp.grasacorporalA=p.expediente.grasacorporalA;
    this.exp.grasaviceral=p.expediente.grasaviceral;
    this.exp.grasaviceralA=p.expediente.grasaviceralA;
    this.exp.imc=p.expediente.imc;
    this.exp.nutriologo=p.expediente.nutriologo;
    this.exp.peso=p.expediente.peso;
    this.exp.pesoA=p.expediente.pesoA;
    this.exp.problemas=p.expediente.problemas;
    this.exp.recomendaciones=p.expediente.recomendaciones;

    this.exp.pesoB=p.expediente.pesoB;
    this.exp.cinturaB=p.expediente.cinturaB;
    this.exp.grasacorporalB=p.expediente.grasacorporalB;
    this.exp.grasaviceralB=p.expediente.grasaviceralB;
    this.exp.abdomenB=p.expediente.abdomenB;

    this.exp.diagnostico=p.expediente.diagnostico;
    console.log(this.exp);
    this.modalService.open(content, { size: 'lg' }); //tamaño puede ser lg o md
  }
  
  editarModal(p:any,nombre) {
    this.editado._id=p._id;
    this.editado.nombre=p.nombre;
    this.editado.app=p.app;
    this.editado.apm=p.apm;
    this.editado.direccion=p.direccion;
    this.editado.edad=p.edad;
    this.editado.estadocivil=p.estadocivil;
    this.editado.fechanacimiento=(p.fechanacimiento.toString()).substring(0,10);
    this.editado.medio=p.medio;
    this.editado.motivo=p.motivo;
    this.editado.quienrecomendo=p.quienrecomendo;
    this.editado.recomendado=p.recomendado;
    this.editado.religion=p.religion;
    this.editado.sexo=p.sexo;
    this.editado.email=p.usuario.email;
    this.editado.telefono=p.telefono;
    this.editado.estatus;
    //this.p=p;
    //console.log(this.p);
    this.modalService.open(nombre, { size: 'lg' });
  }
  consultarPacientes(){
    this._pacienteService.getPaciente(this.desde)
     .subscribe(resp=>{
       this.paciente=resp.pacientes;
       this.totalRegistro=resp.total;
       console.log(resp.pacientes);
       
     });
  }
  cambiarDesde( valor: number){
    let desde = this.desde+valor;

    if (desde>=this.totalRegistro){
      return;
    }
    if (desde < 0){
      return;
    }
    this.desde+=valor;
    this.consultarPacientes();
  }
  actualizarPaciente( editarPaciente: NgForm){
    console.log(editarPaciente.value);
    if (editarPaciente.valid){
    console.log(this.editado);
    this._pacienteService.editarPaciente(this.editado)
    .subscribe( resp=>{
      this.desde=0
      this.consultarPacientes();
    });
   }else{
    swal("Completa los campos correctamente", {
      icon: "warning",
    });
   }
  }
  desactivar(modelo:any){
    //console.log(modelo);
 
    //console.log(this.editado);
    swal({ 
      title: "¿Seguro que deseas suspender al paciente?",
      text: "Si lo desactivas podras volver activarlo..",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.editado=modelo;
        this.editado.estatus="0";
        console.log("le pico");
        this._pacienteService.editarPaciente(this.editado)
        .subscribe( resp=>{
          swal("Se ah desactivado al paciente correctamente", {
            icon: "success",
          });
          this.desde=0
          this.consultarPacientes();
        });
        
      } else {
        console.log("le pico");
      }
    });

  }
  reactivar(modelo:any){
    //console.log(modelo);
   
    //console.log(this.editado);
    swal({ 
      title: "¿Seguro que deseas reactivar al paciente?",
      text: "Preciona aceptar",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      
      if (willDelete ===true) {
        this.editado=modelo;
        this.editado.estatus="1";
        this._pacienteService.editarPaciente(this.editado)
        .subscribe( resp=>{
          swal("Se ah reactivado al paciente correctamente", {
            icon: "success",
          });
          this.desde=0
          this.consultarPacientes();
        });
        
      } else {
        
      }
    });

  }
  calcularIMC(){
    if(this.exp.estatura>0 && this.exp.pesoA>0){
      var estatura: number = this.exp.estatura;
      var peso:number = this.exp.pesoA;
      var imc :number = peso/(estatura*estatura);
      var diagnostico:string;
      //console.log("El img es",imc);
      if(imc<16){
        diagnostico="Delgadez Severa";    
      }
      else if(imc<17){
        diagnostico="Delgadez Moderada";    
      }
      else if(imc<18.5){
        diagnostico="Delgadez Aceptable";   
      }
      else if(imc<25){
        diagnostico="Peso Normal";    
      }
      else if(imc<30){
       diagnostico="Sobrepeso";    
      }
      else if(imc<35){
        diagnostico="Obeso: Tipo I";    
      }
      else if(imc<40){
        diagnostico="Obeso: Tipo II";   
      }
      else if(imc>=40){
        diagnostico="Obeso: Tipo III";    
      }
      this.exp.imc=imc;
      this.exp.diagnostico=diagnostico;
    }else{
      swal("Error","Ingresa un peso y altura correctos","warning");
    }
  }
  peso(){
    if(this.exp.peso>0 && this.exp.pesoA>0){
      this.exp.pesoB=this.exp.peso-this.exp.pesoA;
    }
  }
  abdomen(){
    if(this.exp.abdomen>0 && this.exp.abdomenA>0){
      this.exp.abdomenB=this.exp.abdomen-this.exp.abdomenA;
    }
  }
  cintura(){
    if(this.exp.cintura>0 && this.exp.cinturaA>0){
      this.exp.cinturaB=this.exp.cintura-this.exp.cinturaA;
    }
  }
  grasacorporal(){
    if(this.exp.grasacorporal>0 && this.exp.grasacorporalA>0){
      this.exp.grasacorporalB=this.exp.grasacorporal-this.exp.grasacorporalA;
    }
  }
  grasaviceral(){
    if(this.exp.grasaviceral>0 && this.exp.grasaviceralA>0){
      this.exp.grasaviceralB=this.exp.grasaviceral-this.exp.grasaviceralA;
    }
  }
  actualizarExpediente( expediente: NgForm){
    if(expediente.invalid){
      swal("Alto","Llena todos los campos requeridos para continuar","Warning");
    }else{
      this._pacienteService.editarExpediente(this.exp)
        .subscribe(resp=>{
          
          console.log(resp);
          this.consultarPacientes();
        })
    }
  }
  calcularEdad() {
    var edad;
    var hoy = new Date();
     if (this.editado.fechanacimiento == null){
     
      edad=null;
    }else{
      var cumpleanos = new Date(this.editado.fechanacimiento);
   
     edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    //console.log(edad);
   // var edad2:any= document.getElementById("edad");
    this.editado.edad=edad;
    return edad;
    
  }
  //console.log("entro");
}
buscarPaciente(termino:string){
  if (termino.length <= 0){
    this.consultarPacientes();
    return;
  }
  console.log(termino);
   
  ///
  this._pacienteService.buscarPaciente(termino)
    .subscribe( (pacientes:Paciente[])=>{
      this.paciente=pacientes;
      //console.log(this.paciente);
    });
    //console.log("arreglo",this.paciente.length);
}
cargarPlanes(){
  this._planesService.consultarDietasSelect()
    .subscribe(resp=>{
      this.totalRegistro=resp.total;
      this.dietas=resp.dieta;
      console.log(this.dietas);
    });
}
dietaModal(dieta,p:any){
  this.antecedentes=p.expediente.antecedentes;
  this.dietaA = p.expediente.dietaA;
  this.idExpediente=p.expediente._id;
  if(this.dietaA){
  console.log(this.dietaA);
  this.dietaAnt=true;
  }else{
    console.log("no existe");
    this.dietaAnt=false;
  }
 this.pacienteID = p._id;
 
  this.cargarPlanes();
  this.modalService.open(dieta, { size: 'lg' });

}
dPaciente(dietaPaciente:NgForm){
  var f = new Date();
    
  var fecha:any=(f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate());
  this.dietapaciente.paciente=this.pacienteID;
  this.dietapaciente.fecha=fecha;
  this.dietapaciente.dieta=dietaPaciente.value.dieta;
  this.dietapaciente.recomendaciones=dietaPaciente.value.recomendaciones;
  console.log(this.dietapaciente);
  this._planesService.AsignarDieta(this.dietapaciente)
    .subscribe(resp=>{
      console.log(resp);
    });
    this._planesService.editarDieta(this.idExpediente,this.dietapaciente.dieta)
    .subscribe(resp=>{
      console.log(resp);
      this.consultarPacientes();
      //this.dietaA=this.dietapaciente.dieta;
    });
  
}

}
