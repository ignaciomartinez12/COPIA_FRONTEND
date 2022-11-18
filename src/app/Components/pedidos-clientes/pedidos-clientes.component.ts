import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/Entities/pedido';
import { Plato } from 'src/app/Entities/plato';
import { Restaurante } from 'src/app/Entities/restaurante';
import { Url } from 'src/app/Entities/url';
import { FuncionesService } from 'src/app/services/funcionesServices';

@Component({
  selector: 'app-pedidos-clientes',
  templateUrl: './pedidos-clientes.component.html',
  styleUrls: ['./pedidos-clientes.component.css']
})
export class PedidosClientesComponent implements OnInit {

  funciones: FuncionesService;
  URL: string = new Url().url;

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
    this.peticionGetHttp();
  }

  peticionGetHttp(): void {
    const headers = {
      'Content-Type': 'application/json'
    };

    const url = this.URL + 'food/consultarRestaurantes';
    this.http.get(url, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaRestaurantes = [];
        if (data.length == 0) {
          //alert(window.sessionStorage.getItem('rol'));
          //alert("No hay restaurantes");
        } else {
          var listaResJSON = data.split(";");
          for (let i = 0; i < listaResJSON.length; i++) {
            //console.log(listaResJSON[i]);
            this.listaRestaurantes.push(new Restaurante(listaResJSON[i],i))
            console.log(this.listaRestaurantes[i]);
          }
        }
      }, error: error => {
        //this.router.navigate(['/login']);
        alert("Ha ocurrido un error al cargar los restaurantes");
      }
    });
  }

  peticionGetHttpCarta(): void {
    if (this.restauranteSel !== "") {
      const headers = {
        'Content-Type': 'application/json'
      };

      const url = this.URL + 'food/getCarta/' + this.restauranteSel;
      this.http.get(url, { headers, responseType: 'text' }).subscribe({
        next: data => {
          //console.log(data);

          this.listaPlatos = [];
          if (data.length == 0) {
            //alert(window.sessionStorage.getItem('rol'));
            alert("No hay carta en ese restaurante");
          } else {
            var listaCartaJSON = data.split(";;");
            for (let i = 0; i < listaCartaJSON.length; i++) {
              //console.log(listaResJSON[i]);
              this.listaPlatos.push(new Plato(listaCartaJSON[i],i))
              console.log(this.listaPlatos[i]);
            }
          }
        }, error: error => {
          alert("Ha ocurrido un error al cargar la carta del restaurante");
        }
      });
    } else {
      alert("Selecciona un restaurante");
    }
  }

  logout() {
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }

  onSelectRes(element:Restaurante){
    this.restauranteSel = element.nombre;
    this.peticionGetHttpCarta();
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
