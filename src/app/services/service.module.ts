import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SubirArchivoService,SettingsService,SharedService,SidebarService,LoginGuardGuard,CitasService} from './service.index';
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
        CitasService,
        SubirArchivoService

    ],
    declarations:[]
})
export class ServiceModule{}