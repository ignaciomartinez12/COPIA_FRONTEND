import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-admins',
  templateUrl: './gestion-admins.component.html',
  styleUrls: ['./gestion-admins.component.css']
})
export class GestionAdminsComponent implements OnInit {
  private contenedor_campos!: HTMLElement;
  avisoRegistroAdmin: string = "";

  constructor(private router: Router, private http: HttpClient) { 
    this.avisoRegistroAdmin = "";
  }
  
  ngOnInit(): void {
    var campoAdmin = document.getElementById("contenedor_campos");

    if (campoAdmin != null){
      this.contenedor_campos = campoAdmin;
    }
  }
  
  crearAdmin(){
    var nombreAdmCampo = document.getElementById("nombreA") as HTMLInputElement;
    var apellidosAdmCampo = document.getElementById("apellidosA") as HTMLInputElement;
    var zonaAdmCampo = document.getElementById("zonaA") as HTMLInputElement;
    var nifAdmCampo = document.getElementById("nifA") as HTMLInputElement;
    var emailAdmCampo = document.getElementById("emailA") as HTMLInputElement;
    var pwdAdmCampo = document.getElementById("passwordA") as HTMLInputElement;
  
     if (nombreAdmCampo?.value === "") 
     {
      this.avisoRegistroAdmin= "Te falta rellenar un campo para completar el registro";
       return;
     } else {
       this.avisoRegistroAdmin= "";
     }
     
     if (apellidosAdmCampo?.value === "") 
     {
      this.avisoRegistroAdmin= "Te falta rellenar un campo para completar el registro";     
       return;
     } else {
       this.avisoRegistroAdmin= "";
     }
  
     if (zonaAdmCampo?.value === "") 
     {
      this.avisoRegistroAdmin= "Te falta rellenar un campo para completar el registro";     
       return;
     } else {
       this.avisoRegistroAdmin= "";
     }

     if (nifAdmCampo?.value === "") 
     {
      this.avisoRegistroAdmin= "Te falta rellenar un campo para completar el registro";
       return;
     } else {
       this.avisoRegistroAdmin= "";
     }
  
     //Comprobar que es 9 cifras y sólo número
     if (emailAdmCampo?.value === "") 
     {
      this.avisoRegistroAdmin= "Te falta rellenar un campo para completar el registro";
       return;
     } else {
       this.avisoRegistroAdmin= "";
     }
  
     if (pwdAdmCampo?.value === "") 
     {
      this.avisoRegistroAdmin= "Te falta rellenar un campo para completar el registro";
       return;
     } else {
       this.avisoRegistroAdmin= "";
     }
  
    //CUIDADO CON LOS AVISOS, HAY QUE CAMBIARLOS O IMPLEMENTARLOS DE ALGUNA FORMA
    this.peticionHttp(nombreAdmCampo?.value, apellidosAdmCampo?.value, zonaAdmCampo?.value, nifAdmCampo?.value, emailAdmCampo?.value, pwdAdmCampo?.value);
  }
  
  peticionHttp(nombreAdm: string, apellidosAdm: string, zonaAdm: string, nifAdm: string, emailAdm: string, pwdAdm: string): void {
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "nombre": nombreAdm,
      "apellidos": apellidosAdm, 
      "zona": zonaAdm,
      "nif": nifAdm, 
      "correo": emailAdm,
      "pwd": pwdAdm, 
    };
  
    const url = 'http://localhost:8082/user/crearUsuario';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {  
    if(data === "Registro completado"){
      this.avisoRegistroAdmin = "Admin creado correctamente"; 
    }
    });
  }
}
