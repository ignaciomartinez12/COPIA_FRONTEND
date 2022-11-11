import { Component, OnInit } from '@angular/core';
import { FuncionesService } from 'src/app/services/funcionesServices';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  funciones: FuncionesService;

  constructor() {
    this.funciones = new FuncionesService();
  }

  ngOnInit(): void {
    if (window.sessionStorage.getItem('rol') === 'rider') {
      this.funciones.ocultarBtn('g_pedidos', false);
      this.funciones.ocultarBtn('g_pedidos_btn', false);
    } else if (window.sessionStorage.getItem('rol') === 'admin') {
      this.funciones.ocultarBtn('g_admins', false);
      this.funciones.ocultarBtn('g_admins_btn', false);
      this.funciones.ocultarBtn('g_clientes', true);
      this.funciones.ocultarBtn('g_clientes_btn', false);
      this.funciones.ocultarBtn('g_riders', true);
      this.funciones.ocultarBtn('g_riders_btn', false);
      this.funciones.ocultarBtn('g_restaurantes', true);
      this.funciones.ocultarBtn('g_restaurantes_btn', false);
      this.funciones.ocultarBtn('g_pedidos', true);
      this.funciones.ocultarBtn('g_pedidos_btn', false);
    }
  }

  mostrarAdmins() {
    this.ocultarTodos();
    this.funciones.ocultarBtn('g_admins', false);
  }

  mostrarClientes() {
    this.ocultarTodos();
    this.funciones.ocultarBtn('g_clientes', false);
  }

  mostrarRiders() {
    this.ocultarTodos();
    this.funciones.ocultarBtn('g_riders', false);
  }

  mostrarRestaurantes() {
    this.ocultarTodos();
    this.funciones.ocultarBtn('g_restaurantes', false);
  }

  mostrarPedidos() {
    this.ocultarTodos();
    this.funciones.ocultarBtn('g_pedidos', false);
  }

  ocultarTodos() {
    this.funciones.ocultarBtn('g_admins', true);
    this.funciones.ocultarBtn('g_clientes', true);
    this.funciones.ocultarBtn('g_riders', true);
    this.funciones.ocultarBtn('g_restaurantes', true);
    this.funciones.ocultarBtn('g_pedidos', true);
  }
}
