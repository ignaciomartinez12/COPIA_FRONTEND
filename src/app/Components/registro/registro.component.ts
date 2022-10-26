import { VariableBinding } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { registroUsuario } from 'src/app/Entities/registroUsuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  private contenedor_campos1!: HTMLElement;
  private contenedor_campos2!: HTMLElement;
  private contenedor_campos3!: HTMLElement;
  avisoNombre: string = "";
  avisoApellidos: string = "";
  avisoNif: string = "";
  avisoTlf: string = "";
  avisoDireccion: string = "";
  avisoEmail: string = "";
  avisoPwd: string = "";
  avisoPwdDos: string = "";
  
  constructor(private router: Router, private http: HttpClient) {
    this.avisoNombre = "";
    this.avisoApellidos = "";
    this.avisoNif = "";
    this.avisoTlf = "" ;
    this.avisoDireccion = "";
    this.avisoEmail = "";
    this.avisoPwd = "";
    this.avisoPwdDos = "";

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
    var nombreCampo = document.getElementById("nombre") as HTMLInputElement;
    var apellidosCampo = document.getElementById("apellidos") as HTMLInputElement;
    var nifCampo = document.getElementById("nif") as HTMLInputElement;
    var numeroTlfCampo = document.getElementById("telefono") as HTMLInputElement;
    var direccionCampo = document.getElementById("direccion") as HTMLInputElement;
    var usuarioCampo = document.getElementById("email") as HTMLInputElement;
    var pwdCampo = document.getElementById("password") as HTMLInputElement;
    var pwdDosCampo = document.getElementById("password2") as HTMLInputElement;

     if (nombreCampo?.value === "") 
     {
       this.avisoNombre= "Campo vacío";
       return;
     } else {
       this.avisoNombre= "";
     }
     
     if (apellidosCampo?.value === "") 
     {
       this.avisoApellidos= "Campo vacío";
       return;
     } else {
       this.avisoApellidos= "";
     }

     if (nifCampo?.value === "") 
     {
       this.avisoNif= "Campo vacío";
       return;
     } else {
       this.avisoNif= "";
     }

     //Comprobar que es 9 cifras y sólo número
     if (numeroTlfCampo?.value === "") 
     {
       this.avisoTlf= "Campo vacío";
       return;
     } else {
       this.avisoTlf= "";
     }

     if (direccionCampo?.value === "") 
     {
       this.avisoDireccion= "Campo vacío";
       return;
     } else {
       this.avisoDireccion= "";
     }

     //Comprobar que sigue un patron ****@***.*** , buscar como se hace)
     if (usuarioCampo?.value === "") 
     {
       this.avisoEmail= "Campo vacío";
       return;
     } else {
       this.avisoEmail= "";
     }

     //comprobar que cumpla la política de la compañia en base a las contraseñas (recibir error de backend hecho por nacho)
     if (pwdCampo?.value === "") 
     {
       this.avisoPwd= "Campo vacío";
       return;
     } else {
       this.avisoPwd= "";
     }
     //comprobar que cumpla la política de la compañia en base a las contraseñas (recibir error de backend hecho por nacho)
     if (pwdDosCampo?.value === "") 
     {
       this.avisoPwdDos= "Campo vacío";
       return;
     } else {
       this.avisoPwdDos= "";
     }

    this.peticionHttp(nombreCampo?.value, apellidosCampo?.value, nifCampo?.value, numeroTlfCampo?.value, direccionCampo?.value, usuarioCampo?.value, pwdCampo?.value, pwdDosCampo?.value);
  }
 
  peticionHttp(nombre: string, apellidos: string, nif: string, telefono: string, direccion: string, correo:string, pwd1: string, pwd2: string): void {
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "nombre": nombre,
      "apellidos": apellidos, 
      "nif": nif, 
      "telefono": telefono, 
      "direccion": direccion, 
      "correo":correo, 
      "pwd1": pwd1, 
      "pwd2": pwd2
    };

    const url = 'http://localhost:8082/user/register';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {  
    if(data === "Registro completado"){
      this.router.navigate(['/login']); 
    }
    this.avisoEmail = data;
    });
  }

  
}
