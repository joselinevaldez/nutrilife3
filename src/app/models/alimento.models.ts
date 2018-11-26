export class Alimento {
    constructor(
        public _id?:string,
        public nombre?:  string,
        public grupo?:  string,
        public cantidad?: number,
        public unidad?: string,
        public peso?: number,
        public calorias?: number,
        public fibras?: number,
        public proteinas?: number,
        public grasas?: number,
        public estatus?: string,
        public nutriologo?:string  
            
    ){}

}