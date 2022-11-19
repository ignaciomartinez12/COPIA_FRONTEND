import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineaPlato } from 'src/app/Entities/lineaPlato';
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
  listaPlatosPedidoSel: LineaPlato[] = [];
  listaPedidosPendientes: Pedido[] = [];
  listaPedidosEntregados: Pedido[] = [];
  listaPedidosEnProgreso: Pedido[] = [];
  pedidoSel: Pedido;
  restauranteSel: string = '';
  rankSel: string = '';
  pedidoSelTotal: string = "";

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
            this.listaRestaurantes.push(new Restaurante(listaResJSON[i], i))
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
              this.listaPlatos.push(new Plato(listaCartaJSON[i], i))
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

  peticionGetHttpPedidosCli(): void {
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

    const url = this.URL + 'pedido/consultarPedidosCliente';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        console.log(data);
        this.listaPedidosEnProgreso = [];
        this.listaPedidosEntregados = [];

        if (data.includes("No tienes acceso a este servicio")) {
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        } else if (data.includes("No hay pedidos")) {
          alert(data);
        } else if (data.includes("Tu cuenta no se encuentra activa")) {
          alert(data);
        } else {
          var listaPedJSON = data.split(";;;");
          for (let i = 0; i < listaPedJSON.length; i++) {
            //console.log(listaResJSON[i]);
            let pedido = new Pedido(0, listaPedJSON[i], i);
            if (pedido.estado == 2) {
              this.listaPedidosEntregados.push(pedido);
            } else {
              this.listaPedidosEnProgreso.push(pedido);
            }
          }
        }
      }, error: error => {
        alert("Ha ocurrido un error al cargar los pedidos del cliente");
        //alert(error.message);
      }
    });
  }

  logout() {
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }

  onSelectRes(element: Restaurante) {
    this.restauranteSel = element.nombre;
    this.funciones.apagarElementosLista('listaRestaurantesPedCli');
    this.funciones.resaltarElementoLista('listaRestaurantesPedCli', element.pos);

    this.peticionGetHttpCarta();
  }

  onSelectPlt(element: Plato) {

  }

  onSelectPedEnt(element: Pedido) {
    console.log(element);
    this.pedidoSel = element;
    this.funciones.ocultarBtn('btn_cancelarPed', true);

    this.funciones.apagarElementosLista('listaPedidosEntregados');
    this.funciones.apagarElementosLista('listaPedidosEnProgreso');
    this.funciones.resaltarElementoLista('listaPedidosEntregados', element.pos);

    this.listaPlatosPedidoSel = this.funciones.genPlatosPedido(element, this.restauranteSel);
    this.pedidoSelTotal = this.funciones.calcularTotalPedido(this.listaPlatosPedidoSel).toFixed(2);
  }

  onSelectPedProg(element: Pedido) {
    console.log(element);
    this.pedidoSel = element;
    this.funciones.ocultarBtn('btn_cancelarPed', false);

    this.funciones.apagarElementosLista('listaPedidosEnProgreso');
    this.funciones.apagarElementosLista('listaPedidosEntregados');
    this.funciones.resaltarElementoLista('listaPedidosEnProgreso', element.pos);

    this.listaPlatosPedidoSel = this.funciones.genPlatosPedido(element, this.restauranteSel);
    this.pedidoSelTotal = this.funciones.calcularTotalPedido(this.listaPlatosPedidoSel).toFixed(2);
  }

  onSelectPedPend(element: Pedido) {
    this.listaPlatosPedidoSel = [];
    this.listaPlatosPedidoSel = this.funciones.genPlatosPedido(element, element.restaurante);
    this.pedidoSel = element;
    console.log(element);
    console.log(this.listaPlatosPedidoSel);

    this.funciones.apagarElementosLista('listaPedidosPendientes');
    this.funciones.resaltarElementoLista('listaPedidosPendientes', element.pos);
  }

  ocultarTodo() {
    this.funciones.ocultarBtn("contenedor_pedir", true);
    this.funciones.ocultarBtn("contenedor_carrito", true);
    this.funciones.ocultarBtn("contenedor_pedidos", true);
    //this.funciones.ocultarBtn("contenedor_datosCliente", true);
    this.funciones.ocultarBtn("contenedor_valorarPed", true);
    this.funciones.ocultarBtn("contenedor_valoracionesRes", true);
  }

  mostrar_pedidos() {
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_pedidos", false);
    this.peticionGetHttpPedidosCli();
  }

  mostrar_platos() {
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_pedir", false);
  }

  mostrar_carrito() {
    this.ocultarTodo()
    this.posicionesPedidos();
    this.listaPlatosPedidoSel = [];
    this.pedidoSel = new Pedido(1, "", 0);
    this.funciones.apagarElementosLista('listaPedidosPendientes');
    this.funciones.ocultarBtn("contenedor_carrito", false);
  }

  posicionesPedidos() {
    this.listaPedidosPendientes.forEach((element, index) => {
      element.pos = index;
    });
  }

  mostrar_valorar() {
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_valorarPed", false);
  }

  mostrar_valoraciones(element: Restaurante) {
    this.ocultarTodo()
    this.funciones.ocultarBtn("contenedor_valoracionesRes", false);
  }

  mostrar_datosUsuario() {
    this.ocultarTodo()
  }

  enviarCarrito(element: Plato) {
    var pedidoAux = this.funciones.getPedidoDelRestaurante(this.listaPedidosPendientes, this.restauranteSel)
    //Si no existe el pedido lo creamos
    if (pedidoAux == null) {
      pedidoAux = new Pedido(1, "", 0);
      if (this.restauranteSel == "") {
        alert("Error al obtener el restaurante seleccionado");
        return
      } else {
        pedidoAux.restaurante = this.restauranteSel;
      }

      this.funciones.addLineaPlatoPedido(pedidoAux, new LineaPlato(element.nombreP,
        String(element.precioP), String(1), this.restauranteSel));

      this.listaPedidosPendientes.push(pedidoAux);
    } else {
      if (this.restauranteSel == "") {
        alert("Error al obtener el restaurante seleccionado");
        return
      } else {
        this.funciones.addLineaPlatoPedido(pedidoAux, new LineaPlato(element.nombreP,
          String(element.precioP), String(1), this.restauranteSel));
      }
    }
  }

  disminuirCantidadPlatoPed(element: LineaPlato) {
    console.log(this.listaPlatosPedidoSel);
    if (Number(element.cantidad) > 0) {
      element.cantidad = String(Number(element.cantidad) - 1);
    }
    this.pedidoSel.listaPlatos = this.funciones.lineasPlatosList(this.listaPlatosPedidoSel);
  }

  aumentarCantidadPlatoPed(element: LineaPlato) {
    if (Number(element.cantidad) < 100) {
      element.cantidad = String(Number(element.cantidad) + 1);
    }
    this.pedidoSel.listaPlatos = this.funciones.lineasPlatosList(this.listaPlatosPedidoSel);
  }

  peticionHttpCancelarPedidoEnCarrito(): void {
    if (!(this.pedidoSel.restaurante == "")) {
      alert("Pedido cancelado");
      this.listaPedidosPendientes.splice(this.listaPedidosPendientes.indexOf(this.pedidoSel), 1);
      this.listaPlatosPedidoSel = [];
      this.pedidoSel = new Pedido(1, "", 0);
      //lo quito de la lista
      this.mostrar_carrito();
    } else {
      alert("Selecciona un pedido");
    }
  }

  peticionHttpOrdenarPedidoEnCarrito(): void {
    if (!(this.pedidoSel.restaurante == "")) {
      this.peticionHttpCrearPedido(this.pedidoSel);
      this.mostrar_carrito();
    } else {
      alert("Selecciona un pedido");
    }
  }

  peticionHttpCrearPedido(pedido: Pedido): void {
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "platos": pedido.listaPlatos,
      "restaurante": pedido.restaurante,
      "rider": "",
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

    const url = this.URL + 'pedido/crearPedido/';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        console.log(data);
        if (data.includes("No tienes acceso a este servicio")) {
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        } else if (data.includes("No hay pedidos")) {
          alert(data);
        } else if (data.includes("Tu cuenta no se encuentra activa")) {
          alert(data);
        } else {
          alert("Pedido creado correctamente");
          this.listaPedidosPendientes.splice(this.listaPedidosPendientes.indexOf(this.pedidoSel), 1);
          this.listaPlatosPedidoSel = [];
          this.pedidoSel = new Pedido(1, "", 0);
          this.mostrar_carrito();
        }
      }, error: error => {
        alert("Ha ocurrido un error al cargar el pedido del cliente");
      }
    });
  }

  peticionHttpCancelarPedidoEnPedidos(): void {
    if (!(this.pedidoSel.restaurante == "")) {
      alert("Pedido cancelado");
      this.peticionHttpCancelarPedido(this.pedidoSel)
    } else {
      alert("Selecciona un pedido");
    }
  }

  peticionHttpCancelarPedido(pedido: Pedido): void {
    const headers = {
      'Content-Type': 'application/json'
    };

    const body = {
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password'),
      "idPedido": pedido.id
    };

    const url = this.URL + 'pedido/cancelarPedido/' + pedido.id;
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        console.log(data);
        if (data.includes("No tienes acceso a este servicio")) {
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        } else if (data.includes("Tu cuenta no se encuentra activa")) {
          alert(data);
        } else if (data.includes("Ya no puedes cancelar el pedido")) {
          alert(data);
        } else if (data.includes("No puedes cancelar el pedido, no es tuyo")) {
          alert(data);
        } else if (data.includes("No existe ese pedido")) {
          alert(data);
        } else {
          this.peticionGetHttpPedidosCli();
        }
      }, error: error => {
        alert("Ha ocurrido un error al cancelar el pedido del cliente");
      }
    });
  }
}
