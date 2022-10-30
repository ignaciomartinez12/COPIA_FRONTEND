import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {enc, SHA256} from "crypto-js";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  avisoEmail: string = "";
  avisoPwd: string = "";
  tipoUser: string = "";

  constructor(private router: Router, private http: HttpClient) {
    this.avisoEmail = "";
    this.avisoPwd = "";
    this.tipoUser = "";
  }

  ngOnInit(): void {

  }

  acceder(){
    var correoCampo = document.getElementById("email") as HTMLInputElement;
    var pwdCampo = document.getElementById("password") as HTMLInputElement;

    //correo vacio?
    if (correoCampo?.value === "") 
    {
      this.avisoEmail= "Campo vacío";
      return;
    } else {
      this.avisoEmail= "";
    }
    if(!this.validarEmail(correoCampo?.value)){
      return;
    }

    
    //correo pwd?
    if (pwdCampo?.value === "") 
    {
      this.avisoPwd= "Campo vacío";
      return;
    } else {
      this.avisoPwd= "";
    }

    this.peticionHttp(correoCampo?.value, pwdCampo?.value);
  }

  peticionHttp(correo:string, pwd: string): void {
    const headers = { 
      'Content-Type': 'application/json'
    };
    const body = {
      "correo": correo,
      "pwd":pwd
    };

    const url = 'http://localhost:8082/user/login';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        window.sessionStorage.removeItem('rol');
        window.sessionStorage.setItem('rol', data);
        window.sessionStorage.removeItem('correo');
        window.sessionStorage.setItem('correo', correo);
        window.sessionStorage.removeItem('password');
        window.sessionStorage.setItem('password', pwd);


        this.router.navigate(['/gestion']);
        //this.avisoEmail = data;
      },
      error: error => {
        console.log(error);
        if(error.error.includes("Usuario o password desconocidas")){
          this.avisoEmail = "Usuario o contraseña desconocidas";
        }else{
          this.avisoEmail = "Ha ocurrido algún error al iniciar";
        }
      }
    });
  }

  validarEmail(valor: string): boolean {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)){
     this.avisoEmail = "";
      return true;
    } else {
      this.avisoEmail = "Formato de email incorrecto";
      return false;
    }
  }
}
