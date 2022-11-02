export class Admin {

    nombre : string;
    apellidos : string;
    zona : string;
    nif : string;
    correo : string;
    pwd : string;
    
    constructor(json:string){
        var jsonObject = JSON.parse(json);
        this.nombre = jsonObject.nombre;
        this.apellidos = jsonObject.apellidos;
        this.zona = jsonObject.zona;
        this.nif = jsonObject.nif;
        this.correo = jsonObject.correo;
        this.pwd = jsonObject.contraseña;
    }
}