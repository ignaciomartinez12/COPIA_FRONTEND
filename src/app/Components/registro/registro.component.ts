import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  private contenedor_campos1!: HTMLElement;
  private contenedor_campos2!: HTMLElement;
  private contenedor_campos3!: HTMLElement;
  constructor() {
    
   }

  ngOnInit(): void { 
    var campo1 = document.getElementById("campos_paso1");
    var campo2 = document.getElementById("campos_paso2");
    var campo3 = document.getElementById("campos_paso3");

    if (campo1 != null){
      this.contenedor_campos1 = campo1;
    }
    if (campo2 != null){
      this.contenedor_campos2 = campo2;
    }
    if (campo3 != null){
      this.contenedor_campos3 = campo3;
    }
  }

  mostrar_paso1(){
    this.contenedor_campos1.classList.remove('oculto');
    this.contenedor_campos2.classList.add('oculto');
    this.contenedor_campos3.classList.add('oculto');
  }

  mostrar_paso2(){
    this.contenedor_campos2.classList.remove('oculto');
    this.contenedor_campos1.classList.add('oculto');
    this.contenedor_campos3.classList.add('oculto');
  }

  mostrar_paso3(){
    this.contenedor_campos3.classList.remove('oculto');
    this.contenedor_campos1.classList.add('oculto');
    this.contenedor_campos2.classList.add('oculto');
  }

  registrar(){
    
  }

}
