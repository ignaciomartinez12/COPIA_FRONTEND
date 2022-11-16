import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/Entities/pedido';
import { Plato } from 'src/app/Entities/plato';
import { Restaurante } from 'src/app/Entities/restaurante';

@Component({
  selector: 'app-pedidos-clientes',
  templateUrl: './pedidos-clientes.component.html',
  styleUrls: ['./pedidos-clientes.component.css']
})
export class PedidosClientesComponent implements OnInit {

  listaRestaurantes: Restaurante[] = [];
  listaPlatos: Plato[] = [];
  listaPlatosPedidoSel: Plato[] = [];
  listaPedidosPendientes: Pedido[] = [];
  listaPedidosEntregados: Pedido[] = [];
  listaPedidosEnProgreso: Pedido[] = [];
  pedidoSel: Pedido;

  constructor() {
    this.pedidoSel = new Pedido(1, "", 0);
  }

  ngOnInit(): void {
  }

  logout(){}

  onSelectRes(element:Restaurante){

  }

  onSelectPlt(element:Plato){

  }

  onSelectPedEnt(element:Pedido){

  }

  onSelectPedProg(element:Pedido){

  }

  onSelectPedPend(element:Pedido){

  }
}
