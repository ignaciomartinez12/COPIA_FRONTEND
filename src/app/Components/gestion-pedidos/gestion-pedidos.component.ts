import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/Entities/pedido';
import { Plato } from 'src/app/Entities/plato';
import { Restaurante } from 'src/app/Entities/restaurante';
import { FuncionesService } from 'src/app/services/funcionesServices';
import { Url } from 'src/app/Entities/url';
import { DomSanitizer, EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
  selector: 'app-gestion-pedidos',
  templateUrl: './gestion-pedidos.component.html',
  styleUrls: ['./gestion-pedidos.component.css']
})
export class GestionPedidosComponent implements OnInit {

  listaRestaurantes: Restaurante[] = [];
  listaPlatosPedidoSel: Plato[] = [];
  listaPedidosRepartir: Pedido[] = [];
  listaPedidosPreparacion: Pedido[] = [];
  pedidoSel : Pedido;
  URL: string = new Url().url;
  pedidosAsignados: number = 0;
  
  constructor(private router: Router, private http: HttpClient) {
    this.pedidoSel = new Pedido(1, "", 0);
  }

  ngOnInit(): void {
    this.peticionGetHttp();
  }

  onSelect(element:Restaurante){
    console.log(element);
    this.peticionGetPedidosHttp(element.nombre);
  }

  onSelectPedRep(element:Pedido){
    console.log(element);

  }

  onSelectPedPrep(element:Pedido){
    console.log(element);

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

  peticionHttpAsignar(): void {
    const headers = { 'Content-Type': 'application/json' };
    const body = {
      "email": correo,
      "categoria": categoria,
      "razonSocial": razon_social,
      "valoracion": String(valoracion),
      "direccion": direccion,
      "nombre": nombre,
      "telefono": String(telefono),
      "cif": CIF,
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

    const url = this.URL + 'food/crearRestaurante';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        if (data.includes("Ya existe un restaurante con ese nombre")) {
          alert(data);
        } else if (data.includes("No tienes acceso a este servicio")) {
          alert(data);
          this.router.navigate(['/login']);
        } else {
          alert("Restaurante creado exitosamente");
         
          this.peticionGetPedidosPrepHttp();
          
        }
      }, error: error => {
        alert("Ha ocurrido un error al introducir el restaurante");
      }
    });
  }

  peticionGetPedidosPrepHttp(restaurante: string): void {
    const headers = {
      'Content-Type': 'application/json'
    };

    const url = this.URL + 'pedido/consultarPedidosRes/{'+restaurante+'}';
    this.http.get(url, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaPedidosPreparacion = [];
        this.listaPedidosRepartir = [];
        if (data.length == 0) {
          //alert(window.sessionStorage.getItem('rol'));
          //alert("No hay restaurantes");
        } else {
          var listaPedJSON = data.split(";");
          for (let i = 0; i < listaPedJSON.length; i++) {
            //console.log(listaResJSON[i]);
            let pedido = new Pedido (0,listaPedJSON[i],i);
            if(pedido.estado == 0){
              this.listaPedidosPreparacion.push(pedido);

            }

            console.log(this.listaPedidosPreparacion[i]);
            console.log(this.listaPedidosRepartir[i]);
          }
        }
      }, error: error => {
        //this.router.navigate(['/login']);
        alert("Ha ocurrido un error al cargar los pedidos");
      }
    });
  }

 

  logout() {
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }
}
