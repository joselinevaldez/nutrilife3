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
import { Metas } from '../../models/meta.modelts';
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


  //grafica 
  /*public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  }
  public barChartLabels= [];
  public barChartType;
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
   

  ]
 
  public chartColors: any[]  = [ 
   
    ];
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
 
  
  //*/
paciente:Paciente[]=[];/*
editado:Paciente = new Paciente();
exp:Expediente = new Expediente();
medidas:Expediente = new Expediente();
m:Metas= new Metas();*/
desde:number=0;/*
antecedentes:any;
pacienteIDexp:string;*/
totalRegistro:number=0;
fecha_actual:any;/*
p:any;
dietaselect:string;
mostrarmeta:boolean=false;
mostrargrafica:boolean=false;
dietaAnt:boolean;
mensajepeso:string;
mensajeabdomen:string;
mensajecintura:string;
mensajegluteo:string;
mensajebrazo:string;
colorpeso:string;
colorabdomen:string;
colorcintura:string;
colorgluteo:string;
colorbrazo:string;
sexo: any=[
  'Femenino','Masculino'
];
recomendado: any=[
  'Si','No'
];
metafijada: any=[
  'bajar','subir'
];
estadosCiviles: any=[
  'Soltero(a)','Casado(a)','Viudo(a)','Union Libre'
];
opciones:any=[
  'seleccione','si','no'
];
alert:boolean=false;
dietaA:any;
pacienteID:any;
dietas:any[]=[];
idExpediente:string;
dietapaciente:Dietapaciente=new Dietapaciente();*/
  constructor(
    public _pacienteService:PacienteService,
    private modalService: NgbModal,
    public _planesService: PlanesService //esta linea
   
  ) {
     
   }
/*inicializar(){
  this.barChartType='bar';
  this.barChartLabels=[];
  this.chartColors=[
    {backgroundColor: '#F585CC'}, 
    {backgroundColor: '#85BBF5'}, 
    {backgroundColor: '#3AF227'},
    {backgroundColor:'#F2D027'},
    {backgroundColor:'#BAB59D'},
    {backgroundColor:'#AEF9C5'},
    { backgroundColor:'#B1AEF9'},
    {backgroundColor:'#E6A3F3'},
    {backgroundColor:'#E0B989'}
  ];
 this.barChartData=[
  {data: [], label: 'Cintura (cm)'},
  {data: [], label: 'Abdomen (cm)'},
  {data: [], label: 'Cadera (cm)'},
  {data: [], label: 'Peso (kg)'},
  {data: [], label: 'Brazo (cm)'},
  {data: [], label: 'Gluteo (cm)'},
  {data: [], label: 'Muslo (cm)'},
  {data: [], label: 'Grasa corporal(%)'},
  {data: [], label: 'Grasa Viceral(%)'}
 ];
 this.barChartLegend=true;
}*/
  ngOnInit() {
  this.consultarPacientes();
  let f= new Date();
  var mes:any =f.getMonth() +1;
  var dia:any =f.getDate();
  if(mes<10){
    mes="0"+mes;
  }
  if(dia<10){
    dia="0"+dia;
  }
  this.fecha_actual=f.getFullYear()+"-"+mes+ "-" + dia;
  console.log(this.fecha_actual);
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
  buscarPacienteEstatus(termino:string){
    if (termino.length <= 0){
      this.consultarPacientes();
      return;
    }
    console.log(termino);
     
    ///
    this._pacienteService.buscarPacienteEstatus(termino)
      .subscribe( (pacientes:Paciente[])=>{
        this.paciente=pacientes;
        //console.log(this.paciente);
      });
      //console.log("arreglo",this.paciente.length);
  }
  /*consultarMedidas(id:string){

    this._pacienteService.consultarMetas(id)
          .subscribe(resp=>{
            if(resp.metas==null){
              this.mostrarmeta=false;
            }else{
              this.mostrarmeta=true;
              this.m=resp.metas;
             // this.consultarMedidas(resp.metas.paciente);
            }  
          });
    //console.log("me llamo");
    this._pacienteService.consultarMedidas(id)
     .subscribe(resp=>{
       var long = resp.medidas.length;
      //console.log("respuesta",resp.medidas[long-1]);
      if(this.m.peso===true){
          if(this.m.pesokg==resp.medidas[long-1].peso){
            this.mensajepeso="Meta cumplida";
            this.colorpeso="green";
          }else if(this.m.pesometa=="bajar" && (resp.medidas[0].peso>resp.medidas[long-1].peso)){
            var peso:number = resp.medidas[0].peso-resp.medidas[long-1].peso;
            var falta:number= resp.medidas[long-1].peso-this.m.pesokg;
            this.mensajepeso=" Bajaste "+peso+"kg , solo te faltan "+falta+"kg para lograr tu meta";
            this.colorpeso="green";
          }else if((this.m.pesometa=="bajar" || this.m.pesometa=="subir") && (resp.medidas[0].peso===resp.medidas[long-1].peso)){
            var peso:number = this.m.pesokg-resp.medidas[0].peso;
            var falta:number= Math.abs(peso);
            
            this.mensajepeso=" Tu peso sigue igual te faltan "+falta+"kg para lograr tu meta";
            this.colorpeso="yellow";
          }else if((this.m.pesometa=="subir" ) && (resp.medidas[0].peso>resp.medidas[long-1].peso)){
            var peso:number = resp.medidas[0].peso-resp.medidas[long-1].peso;
            var falta:number= this.m.pesokg-resp.medidas[long-1].peso;
            this.mensajepeso=" Bajaste "+peso+"kg , Debes aumentar "+falta+"kg para lograr tu meta";
            this.colorpeso="red";
          }else if((this.m.pesometa=="subir" ) && (resp.medidas[0].peso<resp.medidas[long-1].peso)){
            var peso:number = resp.medidas[long-1].peso-resp.medidas[0].peso;
            var falta:number= this.m.pesokg-resp.medidas[long-1].peso;
            this.mensajepeso=" Aumentaste "+peso+"kg Solo te faltan "+falta+"kg para lograr tu meta";
            this.colorpeso="green";
          }else if(this.m.pesometa=="bajar" && (resp.medidas[0].peso<resp.medidas[long-1].peso)){
            var peso:number = resp.medidas[long-1].peso-resp.medidas[0].peso;
            var falta:number= resp.medidas[long-1].peso-this.m.pesokg;
            this.mensajepeso=" Aumentaste "+peso+"kg , Debes bajar "+falta+"kg para lograr tu meta";
            this.colorpeso="red";
          }
      }else{
        this.colorpeso="ninguno";
      }
      if(this.m.cintura===true){
        if(this.m.cinturacm==resp.medidas[long-1].cintura){
          this.mensajecintura="Meta cumplida";
          this.colorcintura="green";
        }else if(this.m.cinturameta=="bajar" && (resp.medidas[0].cintura>resp.medidas[long-1].cintura)){
          var peso:number = resp.medidas[0].cintura-resp.medidas[long-1].cintura;
          var falta:number= resp.medidas[long-1].cintura-this.m.cinturacm;
          this.mensajecintura=" Bajaste "+peso+"cm , solo te faltan "+falta+"cm para lograr tu meta";
          this.colorcintura="green";
        }else if((this.m.cinturameta=="bajar" || this.m.cinturameta=="subir") && (resp.medidas[0].cintura===resp.medidas[long-1].cintura)){
          var peso:number = resp.medidas[0].cintura-this.m.cinturacm;
          var falta:number= Math.abs(peso);
          
          this.mensajecintura=" Tu cintura sigue igual te faltan "+falta+"cm para lograr tu meta";
          this.colorcintura="yellow";
        }else if((this.m.cinturameta=="subir" ) && (resp.medidas[0].cintura>resp.medidas[long-1].cintura)){
          var peso:number = resp.medidas[0].cintura-resp.medidas[long-1].cintura;
          var falta:number= this.m.cinturacm-resp.medidas[long-1].cintura;
          this.mensajecintura=" Bajaste "+peso+"cm , Debes aumentar "+falta+"cm para lograr tu meta";
          this.colorcintura="red";
        }else if((this.m.cinturameta=="subir" ) && (resp.medidas[0].cintura<resp.medidas[long-1].cintura)){
          var peso:number = resp.medidas[long-1].cintura-resp.medidas[0].cintura;
          var falta:number= this.m.cinturacm-resp.medidas[long-1].cintura;
          this.mensajecintura=" Aumentaste "+peso+"cm Solo te faltan "+falta+"cm para lograr tu meta";
          this.colorcintura="green";
        }else if(this.m.cinturameta=="bajar" && (resp.medidas[0].cintura<resp.medidas[long-1].cintura)){
          var peso:number = resp.medidas[long-1].cintura-resp.medidas[0].cintura;
          var falta:number= resp.medidas[long-1].cintura-this.m.cinturacm;
          this.mensajecintura=" Aumentaste "+peso+"cm , Debes bajar "+falta+"cm para lograr tu meta";
          this.colorcintura="red";
        }
    }else{
      this.colorcintura="ninguno";
    }
  
    if(this.m.abdomen===true){
      if(this.m.abdomencm==resp.medidas[long-1].abdomen){
        this.mensajeabdomen="Meta cumplida";
        this.colorabdomen="green";
      }else if(this.m.abdomenmeta=="bajar" && (resp.medidas[0].abdomen>resp.medidas[long-1].abdomen)){
        var peso:number = resp.medidas[0].abdomen-resp.medidas[long-1].abdomen;
        var falta:number= resp.medidas[long-1].abdomen-this.m.abdomencm;
        this.mensajeabdomen=" Bajaste "+peso+"cm , solo te faltan "+falta+"cm para lograr tu meta";
        this.colorabdomen="green";
      }else if((this.m.abdomenmeta=="bajar" || this.m.abdomenmeta=="subir") && (resp.medidas[0].abdomen===resp.medidas[long-1].abdomen)){
        var peso:number = resp.medidas[0].abdomen-this.m.abdomencm;
        var falta:number= Math.abs(peso);
        
        this.mensajeabdomen=" Tu abdomen sigue igual te faltan "+falta+"cm para lograr tu meta";
        this.colorabdomen="yellow";
      }else if((this.m.abdomenmeta=="subir" ) && (resp.medidas[0].abdomen>resp.medidas[long-1].abdomen)){
        var peso:number = resp.medidas[0].cintura-resp.medidas[long-1].cintura;
        var falta:number= this.m.abdomencm-resp.medidas[long-1].abdomen;
        this.mensajeabdomen=" Bajaste "+peso+"cm , Debes aumentar "+falta+"cm para lograr tu meta";
        this.colorabdomen="red";
      }else if((this.m.abdomenmeta=="subir" ) && (resp.medidas[0].abdomen<resp.medidas[long-1].abdomen)){
        var peso:number = resp.medidas[long-1].abdomen-resp.medidas[0].abdomen;
        var falta:number= this.m.abdomencm-resp.medidas[long-1].abdomen;
        this.mensajeabdomen=" Aumentaste "+peso+"cm Solo te faltan "+falta+"cm para lograr tu meta";
        this.colorabdomen="green";
      }else if(this.m.abdomenmeta=="bajar" && (resp.medidas[0].abdomen<resp.medidas[long-1].abdomen)){
        var peso:number = resp.medidas[long-1].abdomen-resp.medidas[0].abdomen;
        var falta:number= resp.medidas[long-1].abdomen-this.m.abdomencm;
        this.mensajeabdomen=" Aumentaste "+peso+"cm , Debes bajar "+falta+"cm para lograr tu meta";
        this.colorabdomen="red";
      }
  }else{
    this.colorabdomen="ninguno";
  }
  
  if(this.m.gluteo===true){
    if(this.m.gluteocm==resp.medidas[long-1].gluteo){
      this.mensajegluteo="Meta cumplida";
      this.colorgluteo="green";
    }else if(this.m.gluteometa=="bajar" && (resp.medidas[0].gluteo>resp.medidas[long-1].gluteo)){
      var peso:number = resp.medidas[0].gluteo-resp.medidas[long-1].gluteo;
      var falta:number= resp.medidas[long-1].gluteo-this.m.gluteocm;
      this.mensajegluteo=" Bajaste "+peso+"cm , solo te faltan "+falta+"cm para lograr tu meta";
      this.colorgluteo="green";
    }else if((this.m.gluteometa=="bajar" || this.m.gluteometa=="subir") && (resp.medidas[0].gluteo===resp.medidas[long-1].gluteo)){
      var peso:number = resp.medidas[0].gluteo-this.m.gluteocm;
      var falta:number= Math.abs(peso);
      
      this.mensajegluteo=" Tu gluteo sigue igual te faltan "+falta+"cm para lograr tu meta";
      this.colorgluteo="yellow";
    }else if((this.m.gluteometa=="subir" ) && (resp.medidas[0].gluteo>resp.medidas[long-1].gluteo)){
      var peso:number = resp.medidas[0].gluteo-resp.medidas[long-1].gluteo;
      var falta:number= this.m.gluteocm-resp.medidas[long-1].gluteo;
      this.mensajegluteo=" Bajaste "+peso+"cm , Debes aumentar "+falta+"cm para lograr tu meta";
      this.colorgluteo="red";
    }else if((this.m.gluteometa=="subir" ) && (resp.medidas[0].gluteo<resp.medidas[long-1].gluteo)){
      var peso:number = resp.medidas[long-1].gluteo-resp.medidas[0].gluteo;
      var falta:number= this.m.gluteocm-resp.medidas[long-1].gluteo;
      this.mensajegluteo=" Aumentaste "+peso+"cm Solo te faltan "+falta+"cm para lograr tu meta";
      this.colorgluteo="green";
    }else if(this.m.gluteometa=="bajar" && (resp.medidas[0].gluteo<resp.medidas[long-1].gluteo)){
      var peso:number = resp.medidas[long-1].gluteo-resp.medidas[0].gluteo;
      var falta:number= resp.medidas[long-1].gluteo-this.m.gluteocm;
      this.mensajegluteo=" Aumentaste "+peso+"cm , Debes bajar "+falta+"cm para lograr tu meta";
      this.colorgluteo="red";
    }
   }else{
     this.colorgluteo="ninguno";
   }
  
   if(this.m.brazo===true){
    if(this.m.brazocm==resp.medidas[long-1].brazo){
      this.mensajebrazo="Meta cumplida";
      this.colorbrazo="green";
    }else if(this.m.brazometa=="bajar" && (resp.medidas[0].brazo>resp.medidas[long-1].brazo)){
      var peso:number = resp.medidas[0].brazo-resp.medidas[long-1].brazo;
      var falta:number= resp.medidas[long-1].brazo-this.m.brazocm;
      this.mensajebrazo=" Bajaste "+peso+"cm , solo te faltan "+falta+"cm para lograr tu meta";
      this.colorbrazo="green";
    }else if((this.m.brazometa=="bajar" || this.m.brazometa=="subir") && (resp.medidas[0].brazo===resp.medidas[long-1].brazo)){
      var peso:number = resp.medidas[0].brazo-this.m.brazocm;
      var falta:number= Math.abs(peso);
      
      this.mensajebrazo=" Tu brazo sigue igual te faltan "+falta+"cm para lograr tu meta";
      this.colorbrazo="yellow";
    }else if((this.m.brazometa=="subir" ) && (resp.medidas[0].brazo>resp.medidas[long-1].brazo)){
      var peso:number = resp.medidas[0].brazo-resp.medidas[long-1].brazo;
      var falta:number= this.m.brazocm-resp.medidas[long-1].brazo;
      this.mensajebrazo=" Bajaste "+peso+"cm , Debes aumentar "+falta+"cm para lograr tu meta";
      this.colorbrazo="red";
    }else if((this.m.brazometa=="subir" ) && (resp.medidas[0].brazo<resp.medidas[long-1].brazo)){
      var peso:number = resp.medidas[long-1].brazo-resp.medidas[0].brazo;
      var falta:number= this.m.brazocm-resp.medidas[long-1].brazo;
      this.mensajebrazo=" Aumentaste "+peso+"cm Solo te faltan "+falta+"cm para lograr tu meta";
      this.colorbrazo="green";
    }else if(this.m.brazometa=="bajar" && (resp.medidas[0].brazo<resp.medidas[long-1].brazo)){
      var peso:number = resp.medidas[long-1].brazo-resp.medidas[0].brazo;
      var falta:number= resp.medidas[long-1].brazo-this.m.brazocm;
      this.mensajebrazo=" Aumentaste "+peso+"cm , Debes bajar "+falta+"cm para lograr tu meta";
      this.colorbrazo="red";
    }
   }else{
    this.colorbrazo="ninguno";
   }
     });
  }
  //esta funcion
  graficaModal(grafica,p:any){
    //console.log(p);
    this.inicializar();
  
 
    this._pacienteService.consultarMedidas(p)
      .subscribe(resp=>{
      //console.log("MEDIDAS ARRAY",resp.medidas);
      this.medidas=resp.medidas;
      if(resp.medidas.length==0){
       // console.log("no hay nada");
        this.mostrargrafica=false;
      }else{
        this.mostrargrafica=true;
      for(var p in resp.medidas){
        this.barChartData[0].data.push(resp.medidas[p].cintura);
        this.barChartData[1].data.push(resp.medidas[p].abdomen);
        this.barChartData[2].data.push(resp.medidas[p].cadera);
        this.barChartData[3].data.push(resp.medidas[p].peso);
        this.barChartData[4].data.push(resp.medidas[p].brazo);
        this.barChartData[5].data.push(resp.medidas[p].gluteo);
        this.barChartData[6].data.push(resp.medidas[p].muslo);
        this.barChartData[7].data.push(resp.medidas[p].grasacorporal);
        this.barChartData[8].data.push(resp.medidas[p].grasaviceral);
        this.barChartLabels.push((resp.medidas[p].fecha).toString().substring(0,10));
      }
    }
    }
      );
    this.modalService.open(grafica, { size: 'lg' });
  }
  expedienteModal(content,p:any) {
   // console.log(p.expediente);
  

   this.pacienteIDexp=p._id;
  // console.log("id",this.pacienteIDexp);
    this.exp=p.expediente;
    this.m=new Metas();
    if(this.exp.peso==null){
      this.mostrarmeta=false;
    }else{
      this.mostrarmeta=true;
      
    }
    if(this.mostrarmeta==true){
      this._pacienteService.consultarMetas(this.pacienteIDexp)
      .subscribe(resp=>{
        this.m=resp.metas;
        
        this.inicializarm();
        
        //console.log("SE HIZO ",resp.metas);
       
      });
    }
    //console.log(p.expediente);
   
      this.modalService.open(content, { size: 'lg' }); 
   //console.log("RESULTADOS",this.m);
  //tamaño puede ser lg o md
  /*if(this.mostrarmeta==true){
   this.inicializarm();
  }
  }
  
  editarModal(p:any,nombre) {
    this.editado=p;
    this.editado.fechanacimiento=(p.fechanacimiento.toString()).substring(0,10);
   
    this.editado.email=p.usuario.email;
   
    this.modalService.open(nombre, { size: 'lg' });
  }*/
  consultarPacientes(){
    this._pacienteService.getPaciente(this.desde)
     .subscribe(resp=>{
       this.paciente=resp.pacientes;
       this.totalRegistro=resp.total;
       //console.log(resp.pacientes);
       
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
  }/*
  actualizarPaciente( editarPaciente: NgForm){
    //console.log(editarPaciente.value);
    if (editarPaciente.valid){
    ///console.log(this.editado);
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
    if(this.exp.estatura>0 && this.exp.peso>0){
      var estatura: number = this.exp.estatura;
      var peso:number = this.exp.peso;
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
      this.exp.diagnosticoimc=diagnostico;
    }else{
      swal("Error","Ingresa un peso y altura correctos","warning");
    }
  }

 
 
  actualizarExpediente( expediente: NgForm){
    //console.log("EXPEDIENTE",this.m);
    console.log("VALOR EXPEDIENTE",this.exp);
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
  actualizarMetas(metaform:NgForm){
    if(this.mostrarmeta===true){
      console.log("MEDIDAAAAA",this.m);

      //console.log("valor",metaform.form.value);
        if(metaform.invalid){
          swal("Alto","Llena los campos habilitados para continuar","warning");
    
        }else{
          console.log(" ES VALIDO");
          this._pacienteService.editarMeta(this.m,this.pacienteIDexp)
          .subscribe(resp=>{
              console.log("SE ACTUALIZO",resp);
          });
        }
    }else{
      swal("Alto","Para poder asignar metas registra las medidas de tu paciente","warning");
    
    }
       
  }

  actualizarmedidas(medidaform:NgForm){
    console.log("VALOR MEDIDA",this.exp);
    if(medidaform.invalid || this.exp.imc==null || this.exp.diagnosticoimc==null){
      swal("Alto","Llena todos los campos requeridos para continuar","warning");
    }else{
        var f = new Date();
        var fecha:any=(f.getFullYear() + "/" + (f.getMonth() +1) + "/" + f.getDate());
      
        this.exp.paciente=this.pacienteIDexp
        this.exp.fecha=fecha;
        console.log("NUEVA MEDIDA",this.exp);
          this._pacienteService.actualizarMedidas(this.exp)
            .subscribe(resp=>{
              
              console.log("RESPUESTA MEDIDAS",resp);
             // this.actualizarMetas();
             this._pacienteService.editarExpediente(this.exp)
                .subscribe(resp=>{
                  
                  console.log(resp);
                          
                  this.consultarPacientes();
                })
             
            });
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
inicializarm(){
 
 console.log("ENTRA");
   //peso.value=this.m.peso;
  this.metas("peso","pesometa","pesokg");
  this.meta1(this.m.peso,"pesometa","pesokg");
  
  this.metas('cintura','cinturameta','cinturacm');
  this.meta1(this.m.cintura,"cinturameta","cinturacm");
  this.metas('abdomen','abdomenmeta','abdomencm');
  this.meta1(this.m.abdomen,"abdomenmeta","abdomencm");
  this.metas('brazo','brazometa','brazocm');
  this.meta1(this.m.brazo,"brazometa","brazocm");
  this.metas('gluteo','gluteometa','gluteocm');
  this.meta1(this.m.gluteo,"gluteometa","gluteocm");
  
}
meta1(c:boolean,s:string,i:string){
  if(c==true){
    console.log("es true");
    var select1:any=document.getElementById(s);
  var inp1:any=document.getElementById(i);
    select1.disabled=false;
    select1.required=false;
    select1.selectedIndex[0];
    select1.required="required";
    inp1.required="required";
    inp1.disabled=false;
  }else{
    
  }

}
metas(chek:string,selec:string,inp:string){
  console.log(chek);
  var chek1:any=document.getElementById(chek);
  var select1:any=document.getElementById(selec);
  var inp1:any=document.getElementById(inp);
  console.log("eso es",chek1.checked);
  if(chek1.checked===true){
    select1.disabled=false;
    inp1.disabled=false;
    select1.required="required";
    inp1.required="required";
    console.log("entro aqui");
  }else{
   select1.disabled = "disabled";
   select1.required=false;
   inp1.required=false;
   inp1.disabled = "disabled";
   inp1.value="";
   select1.value="";

  
  }
}
cambiar(campo:string){
  if(campo=="peso"){
    this.m.peso=!this.m.peso;

  }else if(campo=="cintura"){
    this.m.cintura=!this.m.cintura;
    console.log("cintura vale",this.m.cintura);
  }else if(campo=="abdomen"){
    this.m.abdomen=!this.m.abdomen;
  }
  else if(campo=="brazo"){
    this.m.brazo=!this.m.brazo;
  }
  else if(campo=="gluteo"){
    this.m.gluteo=!this.m.gluteo;
  }
}

modalbuscar(modal){
  
  this.modalService.open(modal);

}
seleccionar(a:any,modal:any){
  console.log(a);
  this.dietaselect=a._id;
  this.alert=true;
  //console.log("alimentos",this.alimentos);
 

  //var select:any = document.getElementById("alimento"); //El <select>
  //select.options[this.select.selectedIndex].value=this.alimento; //El texto de la opción seleccionada
 
  //var alimento = select.options[this.select.selectedIndex].text; //El texto de la opción seleccionada
  
}
cancelar(){
  this.alert=false;
  
}
buscarPlan(termino:string){
  if (termino.length <= 0){
    this.cargarPlanes();
    return;
  }
  console.log(termino);
   
  ///
  this._planesService.buscarDieta(termino)
    .subscribe( (dieta:any)=>{
      this.dietas=dieta;
      //console.log(this.paciente);
    });
    //console.log("arreglo",this.paciente.length);
}

*/

}
