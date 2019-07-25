export class Paciente {
    constructor(
        public nombre?: string,
        public estadoCivil?: string,
        public religion?: string, 
        public direccion?: string, 
        public fechaNacimiento?: Date,
        public sexo?: string,
        public telefono?: string,
        public ocupacion?: string,
        public estatus?:string,
        public fechaAlta?:Date,
        public fechaBaja?:Date,
        public ultimaModificacion?:string,
        public nutriologo?:string, 
        public user?:string,
        public password?:string,
        public email?:string,
        public _id?:string,
        
    ){}

}