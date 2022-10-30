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
    
    this.peticionHttpCrear(nombreCampo?.value, categoriaCampo?.value,  
      razon_socialCampo?.value,  0, direccionCampo?.value, correoCampo?.value, 
      Number(telefonoCampo?.value), CIFCampo?.value );
  }

  aceptarCambiosActualizar(){
    var correoCampo = document.getElementById("emailRes") as HTMLInputElement;
    var categoriaCampo = document.getElementById("categoria") as HTMLInputElement;
    var direccionCampo = document.getElementById("direccionRes") as HTMLInputElement;
    var nombreCampo = document.getElementById("nombreRes") as HTMLInputElement;
    var CIFCampo = document.getElementById("CIFRes") as HTMLInputElement;
    var razon_socialCampo = document.getElementById("razonRes") as HTMLInputElement;
    var telefonoCampo = document.getElementById("telRes") as HTMLInputElement;
    var valoracionCampo = document.getElementById("valoracionRes") as HTMLInputElement;

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

    this.peticionHttpActualizar(nombreCampo?.value, categoriaCampo?.value,  
      razon_socialCampo?.value, valoracionCampo?.value, direccionCampo?.value, 
      correoCampo?.value, Number(telefonoCampo?.value), CIFCampo?.value );

  }

  peticionHttpCrear(nombre : string, categoria : string, razon_social : string, valoracion : GLfloat,
     direccion : string, correo : string, telefono : number, CIF : string): void {
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "email": correo,
      "categoria": categoria,
      "razonSocial": razon_social,
      "valoracion": String(valoracion),
      "direccion": direccion,
      "nombre": nombre,
      "telefono": String(telefono),
      "cif": CIF,
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

    const url = 'http://localhost:8082/food/crearRestaurante';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        alert("Restaurante creado exitosamente");
        this.dejarVacio();
        this.ocultarBtn("add_res",false);
        this.ocultarBtn("cont_confirm_add",true);
        this.peticionGetHttp();
      }, error: error =>{
        if(error.error.includes("Ya existe un restaurante con ese nombre")){
          alert("Ya existe un restaurante con ese nombre");
        }else if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          alert("Ha ocurrido un error al introducir el restaurante");
        }
      }});
  }

  peticionHttpActualizar(nombre : string, categoria : string, razon_social : string, 
    valoracion : string, direccion : string, correo : string, telefono : number, 
    CIF : string): void {
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "email": correo,
      "categoria": categoria,
      "razonSocial": razon_social,
      "valoracion": valoracion,
      "direccion": direccion,
      "nombre": nombre,
      "telefono": String(telefono),
      "cif": CIF,
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

    const url = 'http://localhost:8082/food/actualizarRestaurante';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        alert("Restaurante actualizado exitosamente");
        this.dejarVacio();
        this.ocultarBtn("update_res",false);
        this.ocultarBtn("cont_confirm_udt",true);
        this.peticionGetHttp();
      }, error: error =>{
        if(error.error.includes("No existe un restaurante con ese nombre")){
          alert("No existe un restaurante con ese nombre");
        }else if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          alert("Ha ocurrido un error al actualizar el restaurante");
        }
      }});
  }

  peticionGetHttp(): void {
    const headers = { 
      'Content-Type': 'application/json'}; 

    const url = 'http://localhost:8082/food/consultarRestaurantes';
    this.http.get(url, { headers, responseType: 'text' }).subscribe({
      next: data => {
        this.listaRestaurantes = [];
        if(data.length == 0){
          //alert(window.sessionStorage.getItem('rol'));
          //alert("No hay restaurantes");
        }else{
          var listaResJSON = data.split(";");
          for (let i = 0; i < listaResJSON.length; i++) {
            //console.log(listaResJSON[i]);
            this.listaRestaurantes.push(new Restaurante(listaResJSON[i]))
            console.log(this.listaRestaurantes[i]);
          }
        }
      }, error: error => {
        
        //this.router.navigate(['/login']);
        alert("Ha ocurrido un error al cargar los restaurantes");
      }
    });
  } 

  cancelarCambiosCrear(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('add_res', false); //mostrar btn_add
    this.ocultarBtn('cont_confirm_add', true); //ocultar btns_aceptar_cancelar
  }

  cancelarCambiosActualizar(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('add_res', false); //mostrar btn_add
    this.ocultarBtn('cont_confirm_udt', true); //ocultar btns_aceptar_cancelar
  }

  activarCamposCrear(){
    this.disabledTodos(false); //habilitar campos
    this.vaciarCampos(); //vaciar campos
    this.ocultarBtn('add_res', true); //ocultar btn_add
    this.ocultarBtn('update_res', true); //ocultar btn_add
    this.ocultarBtn('delete_res', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_add', false); //mostrar btns_aceptar_cancelar    
  }

  activarCamposActualizar(){
    this.disabledTodos(false); //habilitar campos
    this.disabledID('nombreRes',true);
    this.vaciarAvisos(); //vaciar campos
    this.ocultarBtn('add_res', true); //ocultar btn_add
    this.ocultarBtn('update_res', true); //ocultar btn_add
    this.ocultarBtn('delete_res', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_udt', false); //mostrar btns_aceptar_cancelar
  }

  eliminar(){
    var nombreCampo = document.getElementById("nombreRes") as HTMLInputElement;

    if(confirm("¿Seguro que quiere eliminar el restaurante?")){
      this.peticionHttpEliminar(nombreCampo?.value);
      this.dejarVacio();
      this.peticionGetHttp();
    }else{
      //cancelar
    }
  }

  peticionHttpEliminar(nombre : string){
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "nombre": nombre,
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

    const url = 'http://localhost:8082/food/eliminarRestaurante';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {
      alert(data);
    });
  }

  esNumero(cadena:string): boolean{
		if(cadena.length != 9){
      return false;
    }
    
    for(let i = 0; i<9; i++){
      if(!this.esInt(cadena.charAt(i))){
        return false;
      }
    }

   return true;
  }

  esInt(charac:string):boolean{
    if(charac=='0'){
      return true;
    }else if(charac=='1'){
      return true;
    }else if(charac=='2'){
      return true;
    }else if(charac=='3'){
      return true;
    }else if(charac=='4'){
      return true;
    }else if(charac=='5'){
      return true;
    }else if(charac=='6'){
      return true;
    }else if(charac=='7'){
      return true;
    }else if(charac=='8'){
      return true;
    }else if(charac=='9'){
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

    this.ocultarBtn("cont_confirm_add",true);
    this.ocultarBtn("cont_confirm_udt",true);
    this.ocultarBtn("add_res",false);
    this.ocultarBtn("update_res",false);
    this.ocultarBtn("delete_res",false);
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

  ocultarBtn(id:string, valor:boolean){
    var campo = document.getElementById(id) as HTMLInputElement;
    if(valor){
      campo.classList.add('oculto');
    }else{
      campo.classList.remove('oculto');
    }
  }

  vaciarAvisos(){
    this.avisoNombre = "";
    this.avisoRazon = "";
    this.avisoCategoria = "";
    this.avisoCIF = "";
    this.avisoDireccion = "";
    this.avisoEmail = "";
    this.avisoTelefono = "";
  }

  dejarVacio(){
    this.vaciarAvisos();
    this.vaciarCampos();
  }

  logout(){
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }
}
