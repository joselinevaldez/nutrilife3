import { SelectMultipleControlValueAccessor } from "@angular/forms";

export class Dieta {
    constructor(
        public nombre?:string,
        public tipopersona?:string,
        public status?:string,
        public dias?:{
            lunes:{
                    desayunoL?:string,
                    comidaL?:string,
                    cenaL?:string
            },
            martes:{
                    desayunoM?:string,
                    comidaM?:string,
                    cenaM?:string
            },
            miercoles:{
                    desayunoMI?:string,
                    comidaMI?:string,
                    cenaMI?:string
            },
            jueves:{
                    desayunoJ?:string,
                    comidaJ?:string,
                    cenaJ?:string
            },
            viernes:{
                    desayunoV?:string,
                    comidaV?:string,
                    cenaV?:string
            },
            sabado:{
                    desayunoS?:string,
                    comidaS?:string,
                    cenaS?:string
            },
            domingo:{
                desayunoD?:string,
                comidaD?:string,
                cenaD?:string
            }
        },
        public _id?:string,
        public nutriologo?:string
    ){}

}