export class Restaurante {

    nombre : string;
    categoria : string;
    razon_social : string;
    valoracion : GLfloat;
    direccion : string;
    correo : string;
    telefono : number;
    CIF : string;
    
    constructor(json:string){
        var jsonObject = JSON.parse(json);
        this.nombre = jsonObject.nombre;
        this.categoria = jsonObject.categoria;
        this.razon_social = jsonObject.razonSocial;
        //this.valoracion = parseFloat(jsonObject.valoracion);
        this.valoracion = 0.0;
        this.direccion = jsonObject.direccion;
        this.correo = jsonObject.email;
        this.telefono = parseInt(jsonObject.telefono);
        this.CIF = jsonObject.cif;
    }
}
