export class Plato {

    nombreP : string;
    precioP : number;
    veganoP : boolean;
    descripcionP : string;
    fotoP : string;
    restaurante : string;
    pos : number;
    
    constructor(json:string, pos:number){
        var jsonObject = JSON.parse(json);
        this.nombreP = jsonObject.nombre;
        this.precioP = parseInt(jsonObject.precio);
        this.descripcionP = jsonObject.descripcion;
        this.veganoP = Boolean(jsonObject.aptoVegano);
        this.fotoP = jsonObject.foto;
        this.restaurante = jsonObject.nombreRestaurante;
        this.pos = pos;
    }
}