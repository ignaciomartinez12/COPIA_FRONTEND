export class Pedido {

    id : string;
    restaurante : string;
    listaPlatos : string;
    total : number;
    pos : number;
    rider : string;
    estado : number;
    cliente : string;

    
    constructor(mode:number, json:string, pos:number){
        if(mode == 0){
            var jsonObject = JSON.parse(json);
            this.id = jsonObject.idPedido;
            this.restaurante = jsonObject.restaurante;
            this.listaPlatos = jsonObject.platos;
            this.rider = jsonObject.rider;
            this.total = Number(jsonObject.total);
            this.pos = Number(pos);
            this.estado =  Number(jsonObject.estado);
            this.cliente = jsonObject.cliente;
        }else{
            this.id = "0";
            this.restaurante = "";
            this.listaPlatos = "";
            this.total = 0;
            this.pos = 0;
            this.rider = "";
            this.estado = -1;
            this.cliente = "";
        }
    }
}