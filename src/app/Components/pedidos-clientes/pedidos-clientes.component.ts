import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/Entities/pedido';
import { Plato } from 'src/app/Entities/plato';
import { Restaurante } from 'src/app/Entities/restaurante';
import { FuncionesService } from 'src/app/services/funcionesServices';

@Component({
  selector: 'app-pedidos-clientes',
  templateUrl: './pedidos-clientes.component.html',
  styleUrls: ['./pedidos-clientes.component.css']
})
export class PedidosClientesComponent implements OnInit {

  funciones: FuncionesService;

  listaRestaurantes: Restaurante[] = [];
  listaPlatos: Plato[] = [];
  listaPlatosPedidoSel: Plato[] = [];
  listaPedidosPendientes: Pedido[] = [];
  listaPedidosEntregados: Pedido[] = [];
  listaPedidosEnProgreso: Pedido[] = [];
  pedidoSel: Pedido;
  restauranteSel: string = '';
  rankSel : string = '';

  constructor(private router: Router, private http: HttpClient) {
    this.pedidoSel = new Pedido(1, "", 0);
    this.funciones = new FuncionesService();
  }

  ngOnInit(): void {
  }

  logout() {
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }

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

  ocultarTodo() {
    this.funciones.ocultarBtn("contenedor_pedir", true);
    this.funciones.ocultarBtn("contenedor_carrito", true);
    this.funciones.ocultarBtn("contenedor_pedidos", true);
    //this.funciones.ocultarBtn("contenedor_datosCliente", true);
    this.funciones.ocultarBtn("contenedor_valorarPed", true);
    this.funciones.ocultarBtn("contenedor_valoracionesRes", true);
  }

  mostrar_pedidos(){
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_pedidos", false);
  }

  mostrar_platos(){
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_pedir", false);
  }

  mostrar_carrito(){
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_carrito", false);
  }

  mostrar_valorar(){
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_valorarPed", false);
  }

  mostrar_valoraciones(element:Restaurante){
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_valoracionesRes", false);
  }

  mostrar_datosUsuario(){
    this.ocultarTodo()
  }
}
