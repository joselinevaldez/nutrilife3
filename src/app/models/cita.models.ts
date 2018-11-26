export class Cita {
    constructor(
        public _id?:string,
        public title?:  string,
        public start?:  Date,
        public time?: string,
        public end?: Date,
        public color?: string,
        public estatus?: string,
        public paciente?:string, 
        public nutriologo?:string  
            
    ){}

}