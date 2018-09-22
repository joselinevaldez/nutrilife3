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



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'progress', component: ProgressComponent },
            { path: 'graficas1', component: Graficas1Component },
            { path: 'pacientes', component: PacientesComponent , data:{pagina:'Pacientes',titulo :'Pacientes'}},
            { path: 'home', component: HomeComponent, data:{pagina:'Nutrilife',titulo :'Inicio'}},
            { path: 'citas', component: CitasComponent, data:{pagina:'Citas',titulo :'Citas'}},
            { path: 'alimentos', component: AlimentosComponent, data:{pagina:'Alimentos',titulo :'Alimentos'} },
            { path: 'dietas', component: PlanesComponent, data:{pagina:'Dietas',titulo :'Dietas'} },
            { path: 'platillos', component: PlatillosComponent, data:{pagina:'Platillos',titulo :'Platillos'} },
            { path: 'configuracion', component: AccountSettingsComponent, data:{pagina:'Usuario',titulo :'Configuracion'} },
            { path: 'promesas', component: PromesasComponent },
            { path: '', redirectTo: '/home', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
