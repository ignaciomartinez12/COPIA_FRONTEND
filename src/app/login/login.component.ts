import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  avisoEmail: string = "";
  avisoPwd: string = "";
  tipoUser: string = "";

  constructor(private router: Router, private http: HttpClient) { }

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
    this.http.post<any>(url, body, { headers }).subscribe(data => {
        this.avisoEmail = data.body;
    });
  }

}
