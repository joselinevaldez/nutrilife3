
export class Expediente {
    constructor(
        
        public exploracion?: string,
        public cirugias?: string,
        public antecedentes?:string ,
        public problemas?:  string,
       
        public abdomen?: number,
        public cintura?: number,
        public peso?: number,
        public brazo?: number,
        public cadera?: number,
        public muslo?: number,
        public gluteo?: number,
        public estatura?: number,
        public grasacorporal?: number,
        public grasaviceral?: number,

        public diagnosticoimc?:string,
        public imc?: number,
        
        public recomendaciones?:  string,
        public nutriologo?:  string,
        public paciente?:  string,
        public fecha?:  Date,
        public dietaA?:  string,
        public _id?:string,
   
        
    ){}

}






  