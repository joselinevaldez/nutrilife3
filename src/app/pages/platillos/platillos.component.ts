import { Component, OnInit } from '@angular/core';
import { AlimentosService, PlatillosService } from '../../services/service.index';
import { Platillo } from '../../models/platillo.models';
import { NgForm } from '@angular/forms';
import { Alimentosp } from '../../models/alimentosp.models';
import { NgbModal,NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-platillos',
  templateUrl: './platillos.component.html',
  styles: []
})
export class PlatillosComponent implements OnInit {
datas:any=[];
rutita
select : any;
tabla:any;
cantidad: any;
contador:number;
acumulador:number;
mostrar:boolean=false;
numero:number;
total:number;
existe:boolean;
posicion:string;
categoriaNombre: string;
alimento:string;
platillo:Platillo=new Platillo();
alimentosp:Alimentosp=new Alimentosp();
alert:boolean=false;
alimentos:any[]=[];
  constructor(
    private modalService: NgbModal,
    public _platillosService: PlatillosService,
    public _alimentoService:AlimentosService
  ) { }

  ngOnInit() {
    //this.agregarAlimento();
    
    this.contador=0;
    this.total=0;
    this.acumulador=0;
    this.cantidad=0;
    this.existe=false;
  }
  agregarAlimento(){
    //INICIALIZACION DE VARIABLES
    this.existe=false;
    this.contador=0;
    this.total=0;
    this.acumulador=0;
    this.cantidad=0;
    ///
    this.select = document.getElementById("alimento"); //El <select>
         //El valor seleccionado
         this.cantidad =document.getElementById("cantidad");
     // console.log(this.select.selectedIndex);
    ///CHECAR SI YA EXISTE

    if(this.select.selectedIndex<0 || this.cantidad.value==="0.00" ){
      swal("Alto","Debes seleccionar correctamente el alimento que deseas agregar a tu platillo","warning");
    }else{
      var select:string= this.select.options[this.select.selectedIndex].value; //El texto de la opción seleccionada
 
      var alimento = this.select.options[this.select.selectedIndex].text; //El texto de la opción seleccionada
      
      var unidadMedida:any =document.getElementById("unidad");
      var id2 = select.split(",");
      var id = id2[0];
      var unidad = id2[1];
      unidadMedida.value=unidad;
      console.log("id",id);
            for (var i in this.datas) {
              if(this.datas[i].alimento == id){
                this.acumulador =parseFloat( this.datas[i].cantidad);
                this.numero= parseFloat(this.cantidad.value);
                this.acumulador+=this.numero;
                this.existe=true;
                this.posicion=i;
              // 
                break;
                
              }else{
                this.existe=false;
              }
          }


            ////
            if(this.existe==true){
              this.datas[this.posicion].cantidad=this.acumulador;
            }else{
            var alimentoNuevo = {"fila":this.contador,"alimento": id, "nombre": alimento,"cantidad":this.cantidad.value,"unidad":unidad};
            this.datas.push(alimentoNuevo);
            }
            console.log(this.datas);
            this.contador++;
        
        
          }
        }

  remover(fila){
      for (var i in this.datas) {
          if(this.datas[i].fila == fila){
            this.datas.splice(i,1); 
                    break;
          }
      }
      console.log("DESPUES DE REMOVER: ", this.datas);
 }
 categoria(categoria:any){
   

   var c:any = document.getElementById("categoria");
   if(categoria===1){
    this.categoriaNombre= "Lacteos y derivados";
   }else  if(categoria===2){
    this.categoriaNombre=   "Frutas";
   } else  if(categoria===3){
    this.categoriaNombre= "Cereales y derivados";
   } else  if(categoria===4){
    this.categoriaNombre= "Legumbres,frutos secos y tuberculos";
   }else  if(categoria===5){
    this.categoriaNombre=  "verduras y hortalizas";
   }else  if(categoria===6){
    this.categoriaNombre= "Pescado,carne y huevos";
   }
   else  if(categoria===7){
    this.categoriaNombre=  "Grasas";
   }
   c.value=this.categoriaNombre;
   this.cargarSelect(this.categoriaNombre);
   console.log(this.categoriaNombre);
 }
 cargarSelect(categoriaNombre:string){
  this._alimentoService.cargarAlimentoSelect(categoriaNombre)
  .subscribe(resp=>{
    this.alimentos=resp.alimentos;
    console.log(this.alimentos);
  });
 }
 nuevoPlatillo(platillosP:NgForm){
   if(platillosP.valid){
     console.log(this.datas.length);
     if(this.datas.length> 0){
      //console.log("platillo",this.platillo);
      //console.log("alimentos",this.datas);
     this._platillosService.crearPlatillo(this.platillo)
        .subscribe(resp=>{
          //console.log(resp);
          for (var i in this.datas) {
              this.alimentosp.alimento=this.datas[i].alimento;
              this.alimentosp.cantidad=this.datas[i].cantidad;
              this.alimentosp.nombre=this.datas[i].nombre;
              this.alimentosp.unidad=this.datas[i].unidad;
           
              //console.log(this.datas[i]);
              this.alimentosp.platillo=resp.platillo._id;
                 this._platillosService.crearAlimentosp(this.alimentosp)
                  .subscribe(resp=>{
                   // console.log(resp);
                  });
              swal("Platillo creado con exito",resp.platillo.nombre,"success");
             // console.log("este es el ", i,"="+JSON.stringify(this.alimentosp));
            }
                  //console.log(resp);
       });

        }else{
          swal("Alto","Debes añadir alimentos a tu platillo","warning");
  
        }
     
   }else{
    swal("Alto","Debes ingresar informacion correcta para crear tu platillo","warning");
 
   }
 }
 modalbuscar(modal){
  if(this.alimentos.length===0){
    this.mostrar=false;
    console.log("entro aqui");
  }else{
    this.mostrar=true;
    console.log("entro aqui");
  }
  this.modalService.open(modal);

}
seleccionar(a:any,modal:any){
  console.log(a);
  this.alimento=a._id+","+a.unidad;
  this.alert=true;
  //console.log("alimentos",this.alimentos);
 

  //var select:any = document.getElementById("alimento"); //El <select>
  //select.options[this.select.selectedIndex].value=this.alimento; //El texto de la opción seleccionada
 
  //var alimento = select.options[this.select.selectedIndex].text; //El texto de la opción seleccionada
  
}
cancelar(){
  this.alert=false;
}

buscarAlimento(termino:string){
  if (termino.length <= 0){
    this.cargarSelect(this.categoriaNombre);
    return;
  }
  console.log(termino);
   
  ///
  this._alimentoService.buscarAlimentoCategoria(termino,this.categoriaNombre)
    .subscribe( (alimentos)=>{
      this.alimentos=alimentos;
      console.log(alimentos);
    });
    //console.log("arreglo",this.paciente.length);
}
 
}