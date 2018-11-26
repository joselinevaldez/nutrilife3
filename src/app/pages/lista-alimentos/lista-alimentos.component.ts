import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { AlimentosService } from '../../services/service.index';
import { Alimento } from '../../models/alimento.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-lista-alimentos',
  templateUrl: './lista-alimentos.component.html',
  styleUrls: ['./lista-alimentos.component.css'],
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
export class ListaAlimentosComponent implements OnInit {
  alimento:Alimento[]=[];
  alimentos:Alimento=new Alimento();
  desde:number=0;
  totalRegistro:number=0;
  grupos:any=[
    "Lacteos y derivados",
    "Pescado,carne y huevos",
    "Legumbres,frutos secos y tuberculos",
    "verduras y hortalizas",
    "Frutas",
    "Cereales y derivados",
    "Grasas"
  ];
  unidad:any=[
    "Cucharadita",
    "Cucharada",
    "Taza",
    "Vaso",
    "Litros",
    "Mililitros",
    "Gramos",
    "Miligramos",
    "Kilogramos"
  ];
  constructor(
    public _alimentoServices: AlimentosService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
   this.consultarAlimento();
  }
  consultarAlimento(){
    this._alimentoServices.cargarAlimento(this.desde)
    .subscribe(resp=>{
      this.alimento=resp.alimentos;
      this.totalRegistro=resp.total;
      console.log(this.alimento);
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
    this.consultarAlimento();
  }
  modalEditar(a:any,content){
    this.alimentos._id=a._id;
    this.alimentos.nombre=a.nombre;
    this.alimentos.grupo=a.grupo;
    this.alimentos.cantidad=a.cantidad;
    this.alimentos.unidad=a.unidad;
    this.alimentos.peso=a.peso;
    this.alimentos.calorias=a.calorias;
    this.alimentos.grasas=a.grasa;
    this.alimentos.fibras=a.fibra;
    this.alimentos.estatus=a.estatus;
    this.alimentos.proteinas=a.proteina;
    console.log(a);
    console.log(this.alimentos);
    this.modalService.open(content, { size: 'lg' });

  }
  actualizarAlimento(editarAlimento:NgForm){
    if(editarAlimento.valid){
      this._alimentoServices.actualizarAlimento(this.alimentos)
        .subscribe(resp=>{
          console.log(resp);
          this.consultarAlimento();
          this.desde=0;
        });
    }
  }
    desactivar(modelo:any){
      //console.log(modelo);
   
      //console.log(this.editado);
      swal({ 
        title: "¿Seguro que deseas suspender el alimento?",
        text: "Si lo desactivas podras volver activarlo..",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          this.alimentos=modelo;
          this.alimentos.estatus="0";
          console.log("le pico");
          this._alimentoServices.actualizarAlimento(this.alimentos)
          .subscribe( resp=>{
            swal("Se ah desactivado el alimento correctamente", {
              icon: "success",
            });
            this.desde=0
            this.consultarAlimento();
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
        title: "¿Seguro que deseas reactivar el alimento?",
        text: "Preciona aceptar",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        
        if (willDelete ===true) {
          this.alimentos=modelo;
          this.alimentos.estatus="1";
          this._alimentoServices.actualizarAlimento(this.alimentos)
          .subscribe( resp=>{
            swal("Se ah reactivado el alimento correctamente", {
              icon: "success",
            });
            this.desde=0
            this.consultarAlimento();
          });
          
        } else {
          
        }
      });
  
    }

    buscarAlimento(termino:string){
      if (termino.length <= 0){
        this.consultarAlimento();
        return;
      }
      console.log(termino);
       
      ///
      this._alimentoServices.buscarAlimento(termino)
        .subscribe( (alimentos:Alimento[])=>{
          this.alimento=alimentos;
          console.log(alimentos);
        });
        //console.log("arreglo",this.paciente.length);
    }
  }

