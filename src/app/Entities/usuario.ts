export class Usuario {

    nombre : string
    apellidos : string
    nif : string
    correo : string
    pwd : string
    tipo : string

    constructor(nombre: string, apellidos: string, nif: string, correo: string,  pwd: string, tipo: string ) {
        this.nombre = nombre; 
        this.apellidos = apellidos; 
        this.nif = nif; 
        this.correo = correo;
        this.pwd = pwd; 
        this.tipo = tipo;
      }
}
