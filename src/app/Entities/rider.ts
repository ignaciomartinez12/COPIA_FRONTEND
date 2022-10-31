export class Rider {

    nombre : string;
    apellidos : string;
    nif : string;
    valoracion : number;
    correo : string;
    pwd : string;
    tipoVehiculo : number;
    matricula : string;
    carnet: string;
    
    constructor(json:string){
        var jsonObject = JSON.parse(json);
        this.nombre = jsonObject.nombre;
        this.apellidos = jsonObject.apellidos;
        this.nif = jsonObject.nif;
        this.valoracion = jsonObject.valoracion;
        this.correo = jsonObject.correo;
        this.pwd = jsonObject.contraseña;
        this.tipoVehiculo= jsonObject.tipoVehiculo;
        this.matricula = jsonObject.matricula;
        this.carnet = jsonObject.carnet;
    }
}