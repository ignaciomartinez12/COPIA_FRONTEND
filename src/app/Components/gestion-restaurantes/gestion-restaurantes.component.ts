import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurante } from 'src/app/Entities/restaurante';
import { Router } from '@angular/router';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';


@Component({
  selector: 'app-gestion-restaurantes',
  templateUrl: './gestion-restaurantes.component.html',
  styleUrls: ['./gestion-restaurantes.component.css']
})
export class GestionRestaurantesComponent implements OnInit {
  private contenedor_datos!: HTMLElement;
  private contenedor_carta!: HTMLElement;
  private contenedor_factura!: HTMLElement;
  
  avisoNombre: string = "";
  avisoRazon: string = "";
  avisoCategoria: string = "";
  avisoCIF: string = "";
  avisoDireccion: string = "";
  avisoEmail: string = "";
  avisoTelefono: string = "";
    
  listaRestaurantes: Restaurante[] = [];
  

  constructor(private router: Router, private http: HttpClient) { }

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

  aceptarCambiosCrear(){
    var correoCampo = document.getElementById("emailRes") as HTMLInputElement;
    var categoriaCampo = document.getElementById("categoria") as HTMLInputElement;
    var direccionCampo = document.getElementById("direccionRes") as HTMLInputElement;
    var nombreCampo = document.getElementById("nombreRes") as HTMLInputElement;
    var CIFCampo = document.getElementById("CIFRes") as HTMLInputElement;
    var razon_socialCampo = document.getElementById("razonRes") as HTMLInputElement;
    var telefonoCampo = document.getElementById("telRes") as HTMLInputElement;

    this.avisoEmail = this.comprobarVacio(correoCampo?.value);
    this.avisoTelefono = this.comprobarVacio(telefonoCampo?.value);
    this.avisoNombre = this.comprobarVacio(nombreCampo?.value);
    this.avisoDireccion = this.comprobarVacio(direccionCampo?.value);
    this.avisoRazon = this.comprobarVacio(razon_socialCampo?.value);
    this.avisoCIF = this.comprobarVacio(CIFCampo?.value);
    this.avisoCategoria = this.comprobarVacio(categoriaCampo?.value);

    if(telefonoCampo?.value != ""){
      if(!this.esNumero(telefonoCampo?.value)){
        this.avisoTelefono = "No corresponde con un numero de tlf";
      }
    }else{
      return;
    }
    

    //this.router.navigate(['/gestion']);
    this.peticionHttpCrear(nombreCampo?.value, categoriaCampo?.value,  razon_socialCampo?.value,  0, direccionCampo?.value, correoCampo?.value, Number(telefonoCampo?.value), CIFCampo?.value );
    //this.peticionGetHttp();
  }

  aceptarCambiosActualizar(){
    var correoCampo = document.getElementById("emailRes") as HTMLInputElement;
    var categoriaCampo = document.getElementById("categoria") as HTMLInputElement;
    var direccionCampo = document.getElementById("direccionRes") as HTMLInputElement;
    var nombreCampo = document.getElementById("nombreRes") as HTMLInputElement;
    var CIFCampo = document.getElementById("CIFRes") as HTMLInputElement;
    var razon_socialCampo = document.getElementById("razonRes") as HTMLInputElement;
    var telefonoCampo = document.getElementById("telRes") as HTMLInputElement;

    this.avisoEmail = this.comprobarVacio(correoCampo?.value);
    this.avisoTelefono = this.comprobarVacio(telefonoCampo?.value);
    this.avisoNombre = this.comprobarVacio(nombreCampo?.value);
    this.avisoDireccion = this.comprobarVacio(direccionCampo?.value);
    this.avisoRazon = this.comprobarVacio(razon_socialCampo?.value);
    this.avisoCIF = this.comprobarVacio(CIFCampo?.value);
    this.avisoCategoria = this.comprobarVacio(categoriaCampo?.value);

    if(!this.esNumero(telefonoCampo?.value)){
      this.avisoTelefono = "No corresponde con un numero de tlf";
    }

    this.peticionHttpActualizar(nombreCampo?.value, categoriaCampo?.value,  razon_socialCampo?.value, direccionCampo?.value, correoCampo?.value, Number(telefonoCampo?.value), CIFCampo?.value );

  }

  peticionHttpCrear(nombre : string, categoria : string, razon_social : string, valoracion : GLfloat, direccion : string, correo : string, telefono : number, CIF : string): void {
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

    const url = 'http://localhost:8082/food/crearRestaurante';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {
        alert(data);
    });
  }

  peticionHttpActualizar(nombre : string, categoria : string, razon_social : string, direccion : string, correo : string, telefono : number, CIF : string): void {
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "correo": correo,
      "categoria": categoria,
      "razon": razon_social,
      
      "direccion": direccion,
      "nombre": nombre,
      "telefono": telefono,
      "CIF": CIF
    };

    const url = 'http://localhost:8082/food/actualizarRestaurante';
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
        if(data.length == 0){
          alert("No hay restaurantes");
        }else{
          var listaResJSON = data.split(";");
          for (let i = 0; i < listaResJSON.length; i++) {
            //console.log(listaResJSON[i]);
            this.listaRestaurantes.push(new Restaurante(listaResJSON[i]))
            console.log(this.listaRestaurantes[i]);
          }
        }
      }, error: error => {
        
        this.router.navigate(['/login']);
        //alert("Ha ocurrido un error al realizar la operación");
      }
    });
  } 

  

  cancelarCambiosCrear(){
    this.disabledTodos(true);
    this.vaciarCampos();
    var botonAceptar = document.getElementById("cont_confirm_add") as HTMLInputElement;
    botonAceptar.classList.add('oculto')
  }

  cancelarCambiosActualizar(){
    this.disabledTodos(true);
    this.vaciarCampos();
    var botonAceptar = document.getElementById("cont_confirm_add") as HTMLInputElement;
    botonAceptar.classList.add('oculto')
  }

  activarCamposCrear(){
    this.disabledTodos(false);
    this.vaciarCampos();
    var botonAceptar = document.getElementById("cont_confirm_add") as HTMLInputElement;
    botonAceptar.classList.remove('oculto')
    
  }

  activarCamposActualizar(){
    this.disabledTodos(false);
  }

  eliminar(){

    var nombreCampo = document.getElementById("nombreRes") as HTMLInputElement;

    if(confirm("¿Seguro que quiere eliminar el restaurante?")){
      this.peticionHttpEliminar(nombreCampo?.value);
    }else{
      //cancelar
    }
  }

  peticionHttpEliminar(nombre : string){
    
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      
      "nombre": nombre
      
    };

    const url = 'http://localhost:8082/food/eliminarRestaurante';
      this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {
          alert(data);
      });
  }

  esNumero(evt:string): boolean{
			
    // code is the decimal ASCII representation of the pressed key.
    

    if(evt.length != 9){
      
      return false;
    }
    for(let i = 0; i<9; i++){
      if(!this.esInt(evt.charAt(i))){
        return false;
      }
    }


   return true;

  }

  esInt(charac:string):boolean{

    if(parseInt(charac)==NaN){
  
      return false;
  
    }else{
  
      return true;
  
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
    this.disabledTodos(true);
    console.log(element);
    
    this.asignarValorID('emailRes', element.correo);
    this.asignarValorID('categoria', element.categoria);
    this.asignarValorID('direccionRes', element.direccion);
    this.asignarValorID('nombreRes', element.nombre);
    this.asignarValorID('CIFRes', element.CIF);
    this.asignarValorID('razonRes', element.razon_social);
    this.asignarValorID('telRes', String(element.telefono));
    this.asignarValorID('valoracionRes', String(element.valoracion));
  }

  disabledTodos(valor: boolean){
    this.disabledID('emailRes', valor);
    this.disabledID('categoria', valor);
    this.disabledID('direccionRes', valor);
    this.disabledID('nombreRes', valor);
    this.disabledID('CIFRes', valor);
    this.disabledID('razonRes', valor);
    this.disabledID('telRes', valor);
  }

  disabledID(id:string, valor:boolean){
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.disabled = valor;
  }

  asignarValorID(id:string, valor:string){
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.value = valor;
  }

  comprobarVacio(cadena:string):string{
    if(cadena === ""){
      return "Campo vacío";
    }else{
      return "";
    }
  }

  vaciarCampos(){
    this.asignarValorID("emailRes","");
    this.asignarValorID("categoria","");
    this.asignarValorID("direccionRes","");
    this.asignarValorID("nombreRes","");
    this.asignarValorID("CIFRes","");
    this.asignarValorID("razonRes","");
    this.asignarValorID("telRes","");
    this.asignarValorID("valoracionRes","0");
  }
}
