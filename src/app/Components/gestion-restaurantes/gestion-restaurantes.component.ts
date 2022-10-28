import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from 'src/app/Entities/restaurante';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestion-restaurantes',
  templateUrl: './gestion-restaurantes.component.html',
  styleUrls: ['./gestion-restaurantes.component.css']
})
export class GestionRestaurantesComponent implements OnInit {
  private contenedor_datos!: HTMLElement;
  private contenedor_carta!: HTMLElement;
  private contenedor_factura!: HTMLElement;
  avisoEmail: string = "";
  avisoTelefono: string = "";
  avisoCIF: string = "";
  avisoDireccion: string = "";
  avisoCategoria: string = "";
  avisoNombre: string = "";
  avisoRazon: string = "";
  listaRestaurantes: Restaurante[] = [];
  

  constructor(private router: Router, private http: HttpClient) {
    this.avisoEmail = "";
    this.avisoNombre = "";
    this.avisoCategoria = "";
    this.avisoCIF = "";
    this.avisoRazon = "";
    this.avisoTelefono = "";
    this.avisoDireccion = "";
    
  }

  ngOnInit(): void {
    var cont_datos = document.getElementById("datos_v");
    var cont_carta = document.getElementById("carta_v");
    var cont_factura= document.getElementById("facturas_v");

    if (cont_datos != null){
      this.contenedor_datos = cont_datos;
    }
    if (cont_carta != null){
      this.contenedor_carta = cont_carta;
    }
    if (cont_factura != null){
      this.contenedor_factura = cont_factura;
    }

    this.peticionGetHttp();
  }

  crearRestaurante(){
    var correoCampo = document.getElementById("email") as HTMLInputElement;
    var categoriaCampo = document.getElementById("categoria") as HTMLInputElement;
    var direccionCampo = document.getElementById("direccion") as HTMLInputElement;
    var nombreCampo = document.getElementById("nombre") as HTMLInputElement;
    var valoracionCampo = document.getElementById("valoracion") as HTMLInputElement;
    var CIFCampo = document.getElementById("CIF") as HTMLInputElement;
    var razon_socialCampo = document.getElementById("razon") as HTMLInputElement;
    var telefonoCampo = document.getElementById("tel") as HTMLInputElement;

    //correo vacio?
    if (correoCampo?.value === "") 
    {
      this.avisoEmail = "Campo vacio";
      
    } else {
      this.avisoEmail = "";
    }

    if (telefonoCampo?.value === "") 
    {
      this.avisoTelefono = "Campo vacio";
      
    } else {
      this.avisoTelefono = "";
    }

    if (nombreCampo?.value === "") 
    {
      this.avisoNombre = "Campo vacio";
      
    } else {
      this.avisoNombre = "";
    }

    if (direccionCampo?.value === "") 
    {
      this.avisoDireccion = "Campo vacio";
      
    } else {
      this.avisoDireccion = "";
    }

    if (razon_socialCampo?.value === "") 
    {
      this.avisoRazon = "Campo vacio";
      
    } else {
      this.avisoRazon = "";
    }

    if (CIFCampo?.value === "") 
    {
      this.avisoCIF = "Campo vacio";
      
    } else {
      this.avisoCIF = "";
    }

    if (categoriaCampo?.value === "") 
    {
      this.avisoCategoria = "Campo vacio";
      
    } else {
      this.avisoCategoria = "";
    }

    if(!this.esNumero(telefonoCampo?.value)){
      this.avisoTelefono = "No corresponde con un numero de tlf";
    }

    //this.router.navigate(['/gestion']);
    this.peticionHttp(nombreCampo?.value, categoriaCampo?.value,  razon_socialCampo?.value,  Number(valoracionCampo?.value), direccionCampo?.value, correoCampo?.value, Number(telefonoCampo?.value), CIFCampo?.value );
    //this.peticionGetHttp();
  }

  peticionHttp(nombre : string, categoria : string, razon_social : string, valoracion : GLfloat, direccion : string, correo : string, telefono : number, CIF : string): void {
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "correo": correo,
      "categoria": categoria,
      "razon": razon_social,
      "valoracion": valoracion,
      "direccion": direccion,
      "nombre": nombre,
      "telefono": telefono,
      "CIF": CIF
    };

    const url = 'http://localhost:8082/food/gestionRestaurantes';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {
        alert(data);
    });
  }

  peticionGetHttp(): void {
    const headers = { 
      'Content-Type': 'application/json'}; 

    const url = 'http://localhost:8082/food/consultarRestaurantes';
    this.http.get(url, { headers, responseType: 'text' }).subscribe({
      next: data => {
        var listaResJSON = data.split(";");
        for (let i = 0; i < listaResJSON.length; i++) {
          this.listaRestaurantes.push(new Restaurante(listaResJSON[i]))
        }
      }, error: error => {
        
        this.router.navigate(['/login']);
        //alert("Ha ocurrido un error al realizar la operación");
      }
    });
  } 

   esNumero (dato: string): boolean {
    /*Definición de los valores aceptados*/
    var valoresAceptados = /^[0-9]+$/;
      if (dato.match(valoresAceptados)){
        return true;
      }else{
        return false;
      }
    }

  mostrar_datos(){
    this.ocultarTodo()
    this.contenedor_datos.classList.remove('oculto');
  }

  mostrar_carta(){
    this.ocultarTodo()
    this.contenedor_carta.classList.remove('oculto');
  }

  mostrar_facturas(){
    this.ocultarTodo()
    this.contenedor_factura.classList.remove('oculto');
  }

  ocultarTodo(){
    this.contenedor_datos.classList.add('oculto');
    this.contenedor_carta.classList.add('oculto');
    this.contenedor_factura.classList.add('oculto');
  }

  onSelect(element: Restaurante){
    //selecciona un elemento de la lista
    alert("Ticomo la polla");
  }
}
