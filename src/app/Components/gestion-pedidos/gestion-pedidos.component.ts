import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/Entities/pedido';
import { Plato } from 'src/app/Entities/plato';
import { Restaurante } from 'src/app/Entities/restaurante';

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
  
  constructor(private router: Router, private http: HttpClient) {
    this.pedidoSel = new Pedido(1, "", 0);
  }

  ngOnInit(): void {
  }

  onSelect(element:Restaurante){

  }

  onSelectPedRep(element:Pedido){

  }

  onSelectPedPrep(element:Pedido){

  }

  logout() {
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }
}
