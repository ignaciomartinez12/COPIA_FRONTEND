import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-riders',
  templateUrl: './gestion-riders.component.html',
  styleUrls: ['./gestion-riders.component.css']
})

export class GestionRidersComponent implements OnInit {
  private contenedor_campos!: HTMLElement;
  avisoRegistroRyders: string = "";

  constructor(private router: Router, private http: HttpClient) { 
    this.avisoRegistroRyders = "";
  }

  ngOnInit(): void {
  
  var campoRyder = document.getElementById("contenedor_campos");
 
  if (campoRyder != null){
    this.contenedor_campos = campoRyder;
  }
}

crearRyder(){
  var nombreRyCampo = document.getElementById("nombreRy") as HTMLInputElement;
  var apellidosRyCampo = document.getElementById("apellidosRy") as HTMLInputElement;
  var nifRyCampo = document.getElementById("nifRy") as HTMLInputElement;
  var valoracionRyCampo = document.getElementById("valoracionRy") as HTMLInputElement;
  var emailRyCampo = document.getElementById("emailRy") as HTMLInputElement;
  var pwdRyCampo = document.getElementById("passwordRy") as HTMLInputElement;
  var tVehiculoRyCampo = document.querySelectorAll('input[name="tipoVehiculo"]');
  var matriculaRyCampo = document.getElementById("matriculaRy") as HTMLInputElement;
  var carnetRyCampo = document.getElementById("carnetRy") as HTMLInputElement;


   if (nombreRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }
   
   if (apellidosRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";     
     return;
   } else {
     this.avisoRegistroRyders= "";
   }

   if (nifRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }

   //Comprobar que es 9 cifras y sólo número
   if (valoracionRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }

   if (emailRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }

   //Comprobar que sigue un patron ****@***.*** , buscar como se hace)
   if (pwdRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }

   let seleccionV = "";
    Array.prototype.forEach.call(tVehiculoRyCampo, function (item) {
      if(item.checked === true){
        seleccionV = item.value;
      }
    });

   if (seleccionV === "") 
   {
     this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }

   if (matriculaRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }

   if (carnetRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }
  //CUIDADO CON LOS AVISOS, HAY QUE CAMBIARLOS O IMPLEMENTARLOS DE ALGUNA FORMA
  this.peticionHttp(nombreRyCampo?.value, apellidosRyCampo?.value, nifRyCampo?.value, valoracionRyCampo?.value, emailRyCampo?.value, pwdRyCampo?.value, seleccionV, matriculaRyCampo?.value, carnetRyCampo?.value);
}

peticionHttp(nombreRy: string, apellidosRy: string, nifRy: string, valoracionRy: string, emailRy: string, pwdRy: string, seleccionVRy: string, matriculaRy: string, carnetRy: string): void {
  const headers = { 'Content-Type': 'application/json'};
  const body = {
    "nombre": nombreRy,
    "apellidos": apellidosRy, 
    "nif": nifRy, 
    "valoracion": valoracionRy,
    "correo": emailRy,
    "pwd1": pwdRy, 
    "pwd2": pwdRy,
    "tipovehiculo": seleccionVRy,
    "matricula": matriculaRy, 
    "carnet": carnetRy,
    "rol": "rider",
    "correoAcceso": window.sessionStorage.getItem('correo'),
    "passwordAcceso": window.sessionStorage.getItem('password')
  };

  const url = 'http://localhost:8082/user/crearUsuario';
  this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {  
  if(data === "Registro completado"){
    this.avisoRegistroRyders = "Ryder creado correctamente"; 
  }
  });
}
}
