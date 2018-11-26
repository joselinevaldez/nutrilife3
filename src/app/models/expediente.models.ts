
export class Expediente {
    constructor(
        
        public exploracion?: string,
        public cirugias?: string,
        public antecedentes?:string ,
        public problemas?:  string,
       
        public abdomen?: number,
        public cintura?: number,
        public peso?: number,
        public estatura?: number,
        public grasacorporal?: number,
        public grasaviceral?: number,

        public abdomenA?: number,
        public cinturaA?:number ,
        public pesoA?: number,
        public grasacorporalA?:number ,
        public grasaviceralA?: number,

        public abdomenB?: number,
        public cinturaB?:number ,
        public pesoB?: number,
        public grasacorporalB?:number ,
        public grasaviceralB?: number,

        public diagnostico?:string,
        public imc?: number,
        
        public recomendaciones?:  string,
        public nutriologo?:  string,
        public dietaA?:  string,
        public _id?:string,
   
        
    ){}

}






  