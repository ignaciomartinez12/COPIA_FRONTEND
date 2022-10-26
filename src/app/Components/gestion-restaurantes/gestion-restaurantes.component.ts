import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-restaurantes',
  templateUrl: './gestion-restaurantes.component.html',
  styleUrls: ['./gestion-restaurantes.component.css']
})
export class GestionRestaurantesComponent implements OnInit {
  private contenedor_datos!: HTMLElement;
  private contenedor_carta!: HTMLElement;
  private contenedor_factura!: HTMLElement;

  constructor() { }

  ngOnInit(): void {
    var cont_datos = document.getElementById("datos");
    var cont_carta = document.getElementById("carta");
    var cont_factura= document.getElementById("facturas");

    if (cont_datos != null){
      this.contenedor_datos = cont_datos;
    }
    if (cont_carta != null){
      this.contenedor_carta = cont_carta;
    }
    if (cont_factura != null){
      this.contenedor_factura = cont_factura;
    }
  }

  mostrar_datos(){
    this.contenedor_datos.classList.remove('oculto');
    this.contenedor_carta.classList.add('oculto');
    this.contenedor_factura.classList.add('oculto');
  }

  mostrar_carta(){
    this.contenedor_datos.classList.add('oculto');
    this.contenedor_carta.classList.remove('oculto');
    this.contenedor_factura.classList.add('oculto');
  }

  mostrar_facturas(){
    this.contenedor_datos.classList.add('oculto');
    this.contenedor_carta.classList.add('oculto');
    this.contenedor_factura.classList.remove('oculto');
  }
}
