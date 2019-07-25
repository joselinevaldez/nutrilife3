import { Component, OnInit } from '@angular/core';
import { Metas } from '../../../models/meta.modelts';
import { Usuario } from '../../../models/usuario.model';
import { EventService, PacienteService } from '../../../services/service.index';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styles: []
})
export class MetasComponent implements OnInit {
m:Metas= new Metas();
usuario: Usuario;
mostrarmeta:boolean=false;
metafijada: any=[
  'bajar','subir'
];
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
  constructor(
    public eventService: EventService,
   public _pacienteService:PacienteService
  ) {
    
   }

  ngOnInit() {
    this.cargar();
  }
    cargar(){
      this.usuario = JSON.parse( localStorage.getItem('usuario') );


      this.eventService.getIdPaciente(this.usuario._id)
      .subscribe(resp=>{
        //this.existe=true
        console.log("PACIENTE",resp.pacientes[0]._id);
       
         this._pacienteService.consultarMetas(resp.pacientes[0]._id)
          .subscribe(resp=>{
            if(resp.metas==null){
              this.mostrarmeta=false;
            }else{
              this.mostrarmeta=true;
              this.m=resp.metas;
              this.consultarMedidas(resp.metas.paciente);
            }  
              
          });
       // this.exp=resp.pacientes[0].expediente
           
            
      });
    }
    consultarMedidas(id:string){
      this._pacienteService.consultarMedidas(id)
       .subscribe(resp=>{
         var long = resp.medidas.length;
        console.log(resp.medidas[long-1]);
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
}
