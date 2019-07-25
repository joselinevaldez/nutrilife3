export class Pacientenew {
    constructor(
        public nombre?: string,
       
        public fechanacimiento?: Date,
        
        public estadocivil?: string,
        public religion?: string, 
        public direccion?: string, 
        
      
        public genero?: string,
        public telefono?: string,
        public residencia?: string,
        public ocupacion?: string,
       
        public user?:string,
        public password?:string,
        public email?:string,
        public role?:string,
        public usuario?: string, 
        public estatus?:string,
        public fechaAlta?:string,
        public nutriologo?:string,  
        public _id?:string,
        public fechaBaja?:Date,
    ){}

}