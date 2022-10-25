import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  private p_usuarios: string;
  private p_restaurantes: string;
  private p_ridersPedidos: string;
  private rol='';

  constructor() {
    this.p_usuarios = "";
    this.p_restaurantes = "";
    this.p_ridersPedidos = "";
  }

  ngOnInit(): void {
    this.permisos(this.rol);
  }

  permisos(rol: string) {

  }
}
