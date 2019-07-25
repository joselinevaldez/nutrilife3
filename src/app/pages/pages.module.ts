
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { FullCalendarModule } from 'ng-fullcalendar';
import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';


// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { HomeComponent } from './home/home.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { CitasComponent } from './citas/citas.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { PlatillosComponent } from './platillos/platillos.component';
import { PlanesComponent } from './planes/planes.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { PerfilComponent } from './perfil/perfil.component';
import { AddpacientesComponent } from './pacientes/addpacientes.component';
import { ConsultasComponent } from './consultas/consultas.component';

import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ListaAlimentosComponent } from './lista-alimentos/lista-alimentos.component';
import { ListaPlatillosComponent } from './lista-platillos/lista-platillos.component';

import { CalendarioComponent } from './calendario/calendario.component';
import { FechaPipe } from '../pipes/fecha.pipe';

import { ProgresoComponent } from './progreso/progreso/progreso.component';
import { MisdietasComponent } from './misdietas/misdietas/misdietas.component';
import { NutriologoComponent } from './nutriologo/nutriologo/nutriologo.component';
import { ListaDietasComponent } from './lista-dietas/lista-dietas/lista-dietas.component';
import { MetasComponent } from './metas/metas/metas.component';
import { BuscarcitasComponent } from './buscarcitas/buscarcitas.component';
import { HistoriaComponent } from './historia/historia.component';
import { MedicionesComponent } from './mediciones/mediciones.component';
import { VerPacienteComponent } from './pacientes/ver-paciente.component';



@NgModule({
    declarations: [
        PagesComponent,
        
        IncrementadorComponent,
        GraficoDonaComponent,
        HomeComponent,
        PacientesComponent,
        CitasComponent,
        AlimentosComponent,
        PlatillosComponent,
        PlanesComponent,
        AccountSettingsComponent,
     
        PerfilComponent,
        AddpacientesComponent,
        ConsultasComponent,
       
        ListaAlimentosComponent,
        ListaPlatillosComponent,
    
        CalendarioComponent,
    
     
    
        ProgresoComponent,
    
        MisdietasComponent,
    
        NutriologoComponent,
    
        ListaDietasComponent,
    
        MetasComponent,
    
        BuscarcitasComponent,
    
        HistoriaComponent,
    
        MedicionesComponent,
    
        VerPacienteComponent
    
      
    ],
    exports: [
        
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        NgbModule,
        CommonModule,
        PipesModule,
        ReactiveFormsModule,
        FullCalendarModule
        
        
    ]
})
export class PagesModule { }
