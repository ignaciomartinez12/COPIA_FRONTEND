export class Pedido {

    id : string;
    restaurante : string;
    listaPlatos : string;
    total : number;
    pos : number;
    
    constructor(mode:number, json:string, pos:number){
        if(mode == 0){
            var jsonObject = JSON.parse(json);
            this.id = jsonObject.id;
            this.restaurante = jsonObject.restaurante;
            this.listaPlatos = jsonObject.platos;
            this.total = jsonObject.total;
            this.pos = pos;
        }else{
            this.id = "0";
            this.restaurante = "";
            this.listaPlatos = "";
            this.total = 0;
            this.pos = 0;
        }
    }
}