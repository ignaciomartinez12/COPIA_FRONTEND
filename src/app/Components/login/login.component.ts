import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuario } from 'src/app/Entities/loginUsuario';
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
  loginUsuario: LoginUsuario;

  constructor(private router: Router, private http: HttpClient) {
    this.avisoEmail = "";
    this.avisoPwd = "";
    this.tipoUser = "";
    this.loginUsuario = new LoginUsuario("","");
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

    //this.router.navigate(['/gestion']);
    this.peticionHttp(correoCampo?.value, this.encriptarPwd(pwdCampo?.value));
    //this.peticionGetHttp();
  }

  peticionGetHttp(): void {
    let options: Object = {
      "observe": 'body',
      "responseType": 'text'
    }    

    const url = 'http://localhost:8082/user/getRiders';
    this.http.get(url, options).subscribe((res: any) => {
      var listaRiders = res.split(";");
      //***********this.avisoEmail = res;
      //console.log(listaRiders.length);
      //this.avisoEmail = JSON.parse(listaRiders[0]).apellidos;
      this.router.navigate(['/gestion'],
      { queryParams: { rol: res } });
    });
  }

  peticionHttp(correo:string, pwd: string): void {
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "correo": correo,
      "pwd":pwd
    };

    const url = 'http://localhost:8082/user/login';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {
        if(data === "rider") {
          this.router.navigate(['/gestion']);
        }
        this.avisoEmail = data;
    });
  }
  accederRol(rol:string){
    if(rol === "rider") {
      this.router.navigate(
        ['/gestion_riders']
       
      );
    }else if (rol === "admin"){
      this.router.navigate(
        ['/gestion_admins']
        
      );
    }else if(rol === "cliente"){
      this.router.navigate(
        ['/gestion_clientes']
        
      );
    }else{
      this.avisoEmail = "No se ha podido obtener el rol "
    }
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
