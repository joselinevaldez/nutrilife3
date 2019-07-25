import { Component, OnInit } from '@angular/core';
import { PlatillosService } from '../../services/service.index';
import { Platillo } from '../../models/platillo.models';
import { Alimentosp } from '../../models/alimentosp.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';
import { Dieta } from '../../models/planes.models';
import { PlanesService } from '../../services/planes/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
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
`] 
})
export class PlanesComponent implements OnInit {


cabeceras:any=[ 
  "dia","desayuno","comida","cena"
];
dieta:any[]=[];
 
c:string;
alert:boolean=false;
dias:any=[
  "domingo","lunes","martes","miercoles","jueves","viernes","sabado"
];
nombreSelect:string;
filas:any=[];
platillo:Platillo[]=[];
alimentosp:Alimentosp[]=[];
dietaM:Dieta=new Dieta();
platilloselect:string;
total = this.cabeceras.length-1;
  constructor(
    public _platillosService:PlatillosService,
    private modalService: NgbModal,
    public _planesService:PlanesService
  ) { }

  ngOnInit() {
    console.log(this.dieta);
    this.consultarPlatillos();
    var contador=0;
    for ( var i in this.cabeceras) {
      if(contador===0){

      }else{
        var res = this.cabeceras[i].replace(" ", "");
        this.filas.push(res);
      }
      contador+=1;
    }
    console.log("filas: ",this.filas);
  
 
  }
/*crearPlan(){
  var domingo:any = document.getElementById("domingo");
  var lunes:any = document.getElementById("lunes");
  var martes:any = document.getElementById("martes");
  var miercoles:any = document.getElementById("miercoles");
  var jueves:any = document.getElementById("jueves");
  var viernes:any = document.getElementById("viernes");
  var sabado:any = document.getElementById("sabado");
  var preentrenamiento:any=document.getElementById("pre-entrenamiento");
  var postentrenamiento:any=document.getElementById("post-entrenamiento");
  var desayuno:any=document.getElementById("desayuno");
  var comida:any=document.getElementById("comida");
  var cena:any=document.getElementById("cena");
  //var mediamanana:any=document.getElementById("media-manana");
  var mediatarde:any=document.getElementById("media-tarde");
 //console.log(domingo.checked,lunes.checked,martes.checked,miercoles.checked,jueves.checked,viernes.checked,sabado.checked);
  this.dias=[];
  
  this.cabeceras=["dia"];
  if(domingo.checked==true){
  this.dias.push("domingo");
  }
  if(lunes.checked==true){
  this.dias.push("lunes");
  }
  if(martes.checked==true){
    this.dias.push("martes");
    }
  if(miercoles.checked==true){
      this.dias.push("miercoles");
    }
    if(jueves.checked==true){
      this.dias.push("jueves");
    }
    if(viernes.checked==true){
      this.dias.push("viernes");
    }
    if(sabado.checked==true){
      this.dias.push("sabado");
    }
    if(preentrenamiento.checked==true){
      this.cabeceras.push("pre entrenamiento");
          }
    if(postentrenamiento.checked==true){
      this.cabeceras.push("post entrenamiento");
    
    }
    if(desayuno.checked==true){
      this.cabeceras.push( "desayuno");
      
    }
    if(mediatarde.checked==true){
      this.cabeceras.push( "media tarde");
     
    }
    if(comida.checked==true){
      this.cabeceras.push( "comida");
     
    }
    if(cena.checked==true){
      this.cabeceras.push( "cena");
     
    }
    this.filas=[];
   
}*/
consultarPlatillos(){
  
  this._platillosService.consultarPlatillosSelect()
    .subscribe(resp=>{
      //console.log(resp);
      this.platillo=resp;
      console.log(this.platillo);
             
    });
  

}
hola(variable:any,x:any){
  console.log("hola",variable);
  console.log(x);
}
consultarAlimentos(p:string){
  
  console.log(p);
  
  var selector:any=document.getElementById(p);
  
  var select:string= selector.options[selector.selectedIndex].value; //El texto de la opción seleccionada
  if(select.length>0){
  console.log("este es el select" ,select);
  
  this._platillosService.consultarAlimentosp(select)
    .subscribe(resp=>{
      //console.log(resp);
      this.alimentosp=resp;
      console.log(this.alimentosp);
             
    });
  }
 
}
abrirModal(content){
  this.modalService.open(content, { size: 'lg' });
}
/*guardar(){
  console.log(this.dias);
  console.log(this.cabeceras);
  
  for (var i in this.dias) {
    for ( var x in this.cabeceras) {
      
        if(x!='0'){
        var id = this.dias[i]+this.cabeceras[x].replace(" ", "");;
        var selector:any=document.getElementById(id);
        var select:string= selector.options[selector.selectedIndex].value; //El texto de la opción seleccionada
       if(x=='1'){
        var renglon:any = {"desayuno":select};
       
       }else if(x=='2'){
        var renglon:any={"comida": select };
        
        
       }else if (x=='3'){
        var renglon:any={ "cena":select };
      
       }
        console.log(renglon);
      this.dieta[this.dias[i]].push(renglon);
        //this.datas.push(alimentoNuevo);
       
        }
        
    }
    //this.dietaM["lunes"]
    
    //console.log(this.dietaM.dias["lunes"][0]);
    
  }
    this.dietaM["dias"]=this.dieta;
    console.log(this.dietaM);
}*/

crearPlanAlimenticio(planes:NgForm){
  if(planes.valid){
  this.dieta=planes.value;
  console.log(this.dieta);
    this._planesService.crearDieta(this.dieta)
      .subscribe(resp=>{
        console.log(resp);
      });
  }else{
    swal("Alto","Debes crear la dieta correctamente","warning");
  }
}
modalbuscar(modal,nombre:any){
  this.nombreSelect=nombre;
  console.log("NOMBRE",nombre);
  this.modalService.open(modal);

}
seleccionar(p:any,modal:any){
  
  console.log(p);
  var selector:any = document.getElementById(this.nombreSelect);
  selector.value=p._id;
  //this.platilloselect=p._id;
  this.alert=true;
  //console.log("alimentos",this.alimentos);
 

  //var select:any = document.getElementById("alimento"); //El <select>
  //select.options[this.select.selectedIndex].value=this.alimento; //El texto de la opción seleccionada
 
  //var alimento = select.options[this.select.selectedIndex].text; //El texto de la opción seleccionada
  
}
cancelar(){
  this.alert=false;
  //this.consultarPlatillos();
}

buscarPlatillo(termino:string){
  if (termino.length <= 0){
    this.consultarPlatillos();
    return;
  }
  console.log(termino);
   
  ///
  this._platillosService.buscarPlatillo(termino)
    .subscribe( (platillo:any)=>{
      this.platillo=platillo;
      //console.log(this.paciente);
    });
    //console.log("arreglo",this.paciente.length);
}
}
