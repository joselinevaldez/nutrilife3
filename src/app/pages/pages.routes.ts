import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PlatillosComponent } from './platillos/platillos.component';
import { HomeComponent } from './home/home.component';
import { CitasComponent } from './citas/citas.component';
import { AlimentosComponent } from './alimentos/alimentos.component';
import { PlanesComponent } from './planes/planes.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { AddpacientesComponent } from './addpacientes/addpacientes.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { LoginGuardGuard ,AdminGuard,PacienteGuard} from '../services/service.index';
import { ListaAlimentosComponent } from './lista-alimentos/lista-alimentos.component';
import { ListaPlatillosComponent } from './lista-platillos/lista-platillos.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { HomepacienteComponent } from './homepaciente/homepaciente/homepaciente.component';
import { ProgresoComponent } from './progreso/progreso/progreso.component';
import { MisdietasComponent } from './misdietas/misdietas/misdietas.component';
import { NutriologoComponent } from './nutriologo/nutriologo/nutriologo.component';
import { ListaDietasComponent } from './lista-dietas/lista-dietas/lista-dietas.component';




const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate:[ LoginGuardGuard],
        children: [
           //RUTAS NUTRIOLOGO
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'expedientes', component: PacientesComponent ,canActivate:[AdminGuard], data:{pagina:'Pacientes',titulo :'Expedientes'}},
            { path: 'perfil', component: PerfilComponent , data:{pagina:'Usuario',titulo :'Perfil'}},
            { path: 'home', component: HomeComponent, data:{pagina:'Nutrilife',titulo :'Inicio'}},
            { path: 'alimentos', component: AlimentosComponent,canActivate:[AdminGuard], data:{pagina:'Alimentos',titulo :'Nuevo Alimento'} },
            { path: 'alimentoslista', component: ListaAlimentosComponent,canActivate:[AdminGuard], data:{pagina:'Alimentos',titulo :'Lista de Alimentos'} },
            { path: 'dietas', component: PlanesComponent,canActivate:[AdminGuard], data:{pagina:'Dietas',titulo :' Crear Dieta'} },
            { path: 'addpaciente', component: AddpacientesComponent,canActivate:[AdminGuard], data:{pagina:'Pacientes',titulo :'Nuevo Paciente'} },
            { path: 'consultas', component: ConsultasComponent,canActivate:[AdminGuard], data:{pagina:'Pacientes',titulo :'Consultas'} },
            { path: 'platilloslista', component: ListaPlatillosComponent,canActivate:[AdminGuard], data:{pagina:'Platillos',titulo :'Lista de Platillos'} },
            { path: 'calendario', component: CalendarioComponent,canActivate:[AdminGuard], data:{pagina:'Citas',titulo :'Calendario'} },
            { path: 'planeslista', component: ListaDietasComponent,canActivate:[AdminGuard], data:{pagina:'Dietas',titulo :'Lista de Dietas'} },
   
            { path: 'platillos', component: PlatillosComponent,canActivate:[AdminGuard], data:{pagina:'Platillos',titulo :'Crear Platillo'} },
            { path: 'configuracion', component: AccountSettingsComponent, data:{pagina:'Usuario',titulo :'Configuracion'} },

            //RUTAS PACIENTE
            { path: 'citas', component: CitasComponent,canActivate:[PacienteGuard], data:{pagina:'Citas',titulo :'Citas'}},
           
            { path: 'progreso', component: ProgresoComponent,canActivate:[PacienteGuard], data:{pagina:'Progreso',titulo :'Mi progreso'}},
            { path: 'misdietas', component: MisdietasComponent,canActivate:[PacienteGuard], data:{pagina:'Dietas',titulo :'Mis dietas'}},
            { path: 'nutriologo', component: NutriologoComponent,canActivate:[PacienteGuard], data:{pagina:'Mi nutriologo',titulo :'Informacion'}},
            //extras
          
          

            { path: 'promesas', component: PromesasComponent },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
