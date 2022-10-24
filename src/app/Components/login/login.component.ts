import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUsuario } from 'src/app/Entities/loginUsuario';

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

    //correo pwd?
    if (pwdCampo?.value === "") 
    {
      this.avisoPwd= "Campo vacío";
      return;
    } else {
      this.avisoPwd= "";
    }

    //this.router.navigate(['/gestion']);
    this.peticionHttp(correoCampo?.value, pwdCampo?.value);
  }

  peticionHttp(correo:string, pwd: string): void {
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "correo": correo,
      "pwd":pwd
    };

    const url = 'http://localhost:8087/user/login';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {
        this.avisoEmail = data;
    });
  }

}
