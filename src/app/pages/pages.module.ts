
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { FullCalendarModule } from 'ng-fullcalendar';
import { SharedModule } from '../shared/shared.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// ng2-charts
import { ChartsModule } from 'ng2-charts';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


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
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AddpacientesComponent } from './addpacientes/addpacientes.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { Perfil2Component } from './perfil2/perfil2.component';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ListaAlimentosComponent } from './lista-alimentos/lista-alimentos.component';
import { ListaPlatillosComponent } from './lista-platillos/lista-platillos.component';

import { CalendarioComponent } from './calendario/calendario.component';
import { FechaPipe } from '../pipes/fecha.pipe';
import { HomepacienteComponent } from './homepaciente/homepaciente/homepaciente.component';
import { ProgresoComponent } from './progreso/progreso/progreso.component';
import { MisdietasComponent } from './misdietas/misdietas/misdietas.component';
import { NutriologoComponent } from './nutriologo/nutriologo/nutriologo.component';
import { ListaDietasComponent } from './lista-dietas/lista-dietas/lista-dietas.component';



@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        HomeComponent,
        PacientesComponent,
        CitasComponent,
        AlimentosComponent,
        PlatillosComponent,
        PlanesComponent,
        AccountSettingsComponent,
        PromesasComponent,
        PerfilComponent,
        AddpacientesComponent,
        ConsultasComponent,
        Perfil2Component,
        ListaAlimentosComponent,
        ListaPlatillosComponent,
    
        CalendarioComponent,
    
        HomepacienteComponent,
    
        ProgresoComponent,
    
        MisdietasComponent,
    
        NutriologoComponent,
    
        ListaDietasComponent,
    
      
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
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
