import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdminGuard,PlatillosService,AlimentosService,PacienteGuard,SubirArchivoService,HomeService,PacienteService,EventService,SettingsService,SharedService,SidebarService,LoginGuardGuard,CitasService} from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule} from '@angular/common/http';


@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers:[
        SettingsService,
        SharedService,
        SidebarService,
        UsuarioService,
        LoginGuardGuard,
        AdminGuard,
        PacienteGuard,
        CitasService,
        SubirArchivoService,
        EventService,
        PacienteService,
        HomeService,
        AlimentosService,
        PlatillosService

    ],
    declarations:[]
})
export class ServiceModule{}