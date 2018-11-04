import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  menu: any = [
    {
      titulo: 'Inicio',
      icono: 'mdi mdi-home',
      url : '/home',
      submenu: [
            ]
    },
  
    {
      titulo: 'Pacientes',
      icono: 'mdi mdi-account',
      submenu: [
        { titulo: 'Nuevo Paciente',icono: 'mdi mdi-account-plus', url: '/addpaciente' },
        { titulo : 'Expedientes', icono: 'mdi mdi-folder-account',url: '/expedientes' },
        { titulo : 'Consultas', icono: 'mdi mdi-view-list',url: '/consultas' },
        { titulo : 'Progresos', icono: 'mdi mdi-chart-bar',url: '/expedientes' },
        { titulo : 'Linea Fotografica', icono: 'mdi mdi-camera-burst',url: '/expedientes' }

      ]
    },
    {
      titulo: 'Citas',
      icono: 'mdi mdi-calendar',
      submenu: [
        { titulo: 'Mi Calendario',icono: 'mdi mdi-calendar-text', url: '/citas' },
        { titulo : 'Citas del dia', icono: 'mdi mdi-calendar-clock',url: '/citas' }
       
      ]
    
    },
    {
      titulo: 'Alimentos',
      icono: 'mdi mdi-food-apple',
      submenu: [
        { titulo: 'Nuevo Alimento',icono: 'mdi mdi-plus-circle', url: '/alimentos' },
        { titulo : 'Lista de Alimentos', icono: 'mdi mdi-view-list',url: '/alimentos' }
       
      ]
    
    },
    {
      titulo: 'Platillos',
      icono: 'mdi mdi-silverware-variant',
      submenu: [
        { titulo: 'Crear Platillo',icono: 'mdi mdi-pencil-box', url: '/platillos' },
        { titulo : 'Lista de Platillos', icono: 'mdi mdi-view-list',url: '/platillos' }
       
      ]
    
    },
    {
      titulo: 'Dietas',
      icono: 'mdi mdi-food-variant',
      submenu: [
        { titulo: 'Crear Dieta',icono: 'mdi mdi-pencil-box', url: '/dietas' },
        { titulo : 'Lista de Dietas', icono: 'mdi mdi-view-list',url: '/dietas' }
       
      ]
    
    }
  ];


  constructor() { }

}
