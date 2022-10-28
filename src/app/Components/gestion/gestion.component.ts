import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  private rol: string= '';
  private contenedor_admins!: HTMLElement;
  private contenedor_clientes!: HTMLElement;
  private contenedor_riders!: HTMLElement;
  private contenedor_restaurantes!: HTMLElement;
  private contenedor_pedidos!: HTMLElement;

  constructor() { }

  ngOnInit(): void {
    var contenedor_admins = document.getElementById("g_admins");
    var contenedor_clientes = document.getElementById("g_clientes");
    var contenedor_riders = document.getElementById("g_riders");
    var contenedor_restaurantes = document.getElementById("g_restaurantes");
    var contenedor_pedidos = document.getElementById("g_pedidos");

    var btn_admins = document.getElementById("g_admins_btn");
    var btn_clientes = document.getElementById("g_clientes_btn");
    var btn_riders = document.getElementById("g_riders_btn");
    var btn_restaurantes = document.getElementById("g_restaurantes_btn");
    var btn_pedidos = document.getElementById("g_pedidos_btn");

    if (contenedor_admins != null) {
      this.contenedor_admins = contenedor_admins;
    }
    if (contenedor_clientes != null) {
      this.contenedor_clientes = contenedor_clientes;
    }
    if (contenedor_riders != null) {
      this.contenedor_riders = contenedor_riders;
    }
    if (contenedor_restaurantes != null) {
      this.contenedor_restaurantes = contenedor_restaurantes;
    }
    if (contenedor_pedidos != null) {
      this.contenedor_pedidos = contenedor_pedidos;
    }

    if(this.rol === 'rider'){
      this.quitarOculto(this.contenedor_riders, btn_riders);
    }else if(this.rol === 'admin'){
      this.quitarOculto(this.contenedor_admins, btn_admins);
      this.quitarOculto(this.contenedor_clientes, btn_clientes);
      this.quitarOculto(this.contenedor_riders, btn_riders);
      this.quitarOculto(this.contenedor_restaurantes, btn_restaurantes);
      this.quitarOculto(this.contenedor_pedidos, btn_pedidos);
    }
  }

  quitarOculto(contenedor:HTMLElement, boton:HTMLElement|null){
    contenedor.classList.remove('oculto');
      if (boton != null) {
        boton.classList.remove('oculto');
      }
  }

  mostrarAdmins() {
    this.ocultarTodos();
    this.contenedor_admins.classList.remove('oculto');
  }

  mostrarClientes() {
    this.ocultarTodos();
    this.contenedor_clientes.classList.remove('oculto');
  }

  mostrarRiders() {
    this.ocultarTodos();
    this.contenedor_riders.classList.remove('oculto');
  }

  mostrarRestaurantes() {
    this.ocultarTodos();
    this.contenedor_restaurantes.classList.remove('oculto');
  }

  mostrarPedidos() {
    this.ocultarTodos();
    this.contenedor_pedidos.classList.remove('oculto');
  }

  ocultarTodos() {
    this.contenedor_admins.classList.add('oculto');
    this.contenedor_clientes.classList.add('oculto');
    this.contenedor_riders.classList.add('oculto');
    this.contenedor_restaurantes.classList.add('oculto');
    this.contenedor_pedidos.classList.add('oculto');
  }

  crearRyders(){
    var nombreRyder = document.getElementById("g_admins");
        
  }
}

