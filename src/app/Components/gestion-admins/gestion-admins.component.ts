import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Admin } from 'src/app/Entities/admin';


@Component({
  selector: 'app-gestion-admins',
  templateUrl: './gestion-admins.component.html',
  styleUrls: ['./gestion-admins.component.css']
})
export class GestionAdminsComponent implements OnInit {

  avisoNombre: string = "";
  avisoApellidos: string = "";
  avisoZona: string = "";
  avisoNIF: string = "";
  avisoCorreo: string = "";
  avisoPwd: string = "";
    
  listaAdmins: Admin[] = [];

  constructor(private router: Router, private http: HttpClient) { }
  
  ngOnInit(): void {
    this.peticionGetHttp();
  }

  peticionGetHttp(): void {
    const headers = { 
      'Content-Type': 'application/json'}; 

    const body = {
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

    const url = 'http://localhost:8082/user/getAdmins';
    this.http.post(url, body, { headers, responseType: 'text'}).subscribe({
      next: data => {
        this.listaAdmins = [];
        if(data.length == 0){
          //alert("No hay admins");
        }else{
          var listaResJSON = data.split(";");
          for (let i = 0; i < listaResJSON.length; i++) {
            //console.log(listaResJSON[i]);
            this.listaAdmins.push(new Admin(listaResJSON[i]))
            console.log(this.listaAdmins[i]);
          }
        }
      }, error: error => {
        if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          //alert("Ha ocurrido un error al cargar los administradores");
          alert(error.error);
        }
      }
    });
  }


  aceptarCambiosCrear(){
    var nombreCampo = document.getElementById("nombreA") as HTMLInputElement;
    var apellidosCampo = document.getElementById("apellidosA") as HTMLInputElement;
    var zonaCampo = document.getElementById("zonaA") as HTMLInputElement;
    var nifCampo = document.getElementById("nifA") as HTMLInputElement;
    var emailCampo = document.getElementById("emailA") as HTMLInputElement;
    var pwdCampo = document.getElementById("passwordA") as HTMLInputElement;

    this.avisoNombre = this.comprobarVacio(nombreCampo?.value);
    this.avisoApellidos = this.comprobarVacio(apellidosCampo?.value);
    this.avisoZona = this.comprobarVacio(zonaCampo?.value);
    this.avisoNIF = this.comprobarVacio(nifCampo?.value);
    this.avisoCorreo = this.comprobarVacio(emailCampo?.value);
    this.avisoPwd = this.comprobarVacio(pwdCampo?.value);

    if(!this.validarEmail(emailCampo?.value)){
      return;
    }

    this.peticionHttpCrear(nombreCampo?.value, apellidosCampo?.value,  
      zonaCampo?.value, nifCampo?.value, emailCampo?.value, pwdCampo?.value);
  }


  aceptarCambiosCrear(){
    var nombreAdmCampo = document.getElementById("nombreA") as HTMLInputElement;
    var apellidosAdmCampo = document.getElementById("apellidosA") as HTMLInputElement;
    var zonaAdmCampo = document.getElementById("zonaA") as HTMLInputElement;
    var nifAdmCampo = document.getElementById("nifA") as HTMLInputElement;
    var emailAdmCampo = document.getElementById("emailA") as HTMLInputElement;
    var pwdAdmCampo = document.getElementById("passwordA") as HTMLInputElement;

    this.avisoEmailAdmin = this.comprobarVacio(emailAdmCampo?.value);
    this.avisoPwdAdmin = this.comprobarVacio(pwdAdmCampo?.value);
    this.avisoNIFAdmin= this.comprobarVacio(nifAdmCampo?.value);
    this.avisoZonaAdmin = this.comprobarVacio(zonaAdmCampo?.value);
    this.avisoApellidosAdmin = this.comprobarVacio(apellidosAdmCampo?.value);
    this.avisoNombreAdmin = this.comprobarVacio(nombreAdmCampo?.value);
    

    this.peticionHttpCrear(nombreAdmCampo?.value, apellidosAdmCampo?.value, zonaAdmCampo?.value, nifAdmCampo?.value, emailAdmCampo?.value, pwdAdmCampo?.value);
  }

  aceptarCambiosActualizar(){
    var nombreAdmCampo = document.getElementById("nombreA") as HTMLInputElement;
    var apellidosAdmCampo = document.getElementById("apellidosA") as HTMLInputElement;
    var zonaAdmCampo = document.getElementById("zonaA") as HTMLInputElement;
    var nifAdmCampo = document.getElementById("nifA") as HTMLInputElement;
    var emailAdmCampo = document.getElementById("emailA") as HTMLInputElement;
    var pwdAdmCampo = document.getElementById("passwordA") as HTMLInputElement;

    this.avisoEmailAdmin = this.comprobarVacio(emailAdmCampo?.value);
    this.avisoPwdAdmin = this.comprobarVacio(pwdAdmCampo?.value);
    this.avisoNIFAdmin= this.comprobarVacio(nifAdmCampo?.value);
    this.avisoZonaAdmin = this.comprobarVacio(zonaAdmCampo?.value);
    this.avisoApellidosAdmin = this.comprobarVacio(apellidosAdmCampo?.value);
    this.avisoNombreAdmin = this.comprobarVacio(nombreAdmCampo?.value);
    

    this.peticionHttpActualizar(nombreAdmCampo?.value, apellidosAdmCampo?.value, zonaAdmCampo?.value, nifAdmCampo?.value, emailAdmCampo?.value, pwdAdmCampo?.value);
  }
  
  
  
  
  peticionHttpCrear(nombreAdm: string, apellidosAdm: string, zonaAdm: string, nifAdm: string, emailAdm: string, pwdAdm: string): void {
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
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        alert("Administrador creado exitosamente");
        this.dejarVacio();
        this.ocultarBtn("add_adm",false);
        this.ocultarBtn("cont_confirm_add_adm",true);
        this.peticionGetHttp();
      }, error: error =>{
        if(error.error.includes("Ya existe un administrador con ese nombre")){
          alert("Ya existe un administrador con ese nombre");
        }else if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          alert("Ha ocurrido un error al introducir el administrador");
        }
      }});
  }

  peticionHttpActualizar(nombreAdm: string, apellidosAdm: string, zonaAdm: string, nifAdm: string, emailAdm: string, pwdAdm: string): void {

    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "correo": correo,
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

  
    const url = 'http://localhost:8082/user/actualizarUsuario';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        alert("administrador actualizado exitosamente");
        this.dejarVacio();
        this.ocultarBtn("update_res",false);
        this.ocultarBtn("cont_confirm_udt",true);
        this.peticionGetHttp();
      }, error: error =>{
        if(error.error.includes("No existe un administrador con ese nombre")){
          alert("No existe un administrador con ese nombre");

        }else if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{

          alert("Ha ocurrido un error al actualizar el administrador");

        }
      }});
  }


  eliminar(){
    var nombreCampo = document.getElementById("nombreA") as HTMLInputElement;

    if(confirm("¿Seguro que quiere eliminar el administrador?")){
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

    const url = 'http://localhost:8082/food/eliminarUsuario';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {
      alert(data);
    });



  validarEmail(valor: string): boolean {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)){
     this.avisoCorreo = "";
      return true;
    } else {
      this.avisoCorreo = "Formato de email incorrecto";
      return false;
    }
  }

  onSelect(element: Admin){
    this.disabledTodos(true);
    console.log(element);
    
    this.asignarValorID('nombreA', element.nombre);
    this.asignarValorID('apellidosA', element.apellidos);
    this.asignarValorID('nifA', element.nif);
    this.asignarValorID('zonaA', element.zona);
    this.asignarValorID('emailA', element.correo);
    this.asignarValorID('passwordA', element.pwd);
    
    this.ocultarBtn("cont_confirm_add_a",true);
    this.ocultarBtn("cont_confirm_udt_a",true);
    this.ocultarBtn("add_admin",false);
    this.ocultarBtn("update_admin",false);
    this.ocultarBtn("delete_admin",false);

  }

  mostrar_datos(){
    this.ocultarTodo()
    this.contenedor_datos.classList.remove('oculto');
  }

 
  

  ocultarTodo(){
    this.contenedor_datos.classList.add('oculto');
   
  }

 

  disabledTodos(valor: boolean){
    this.disabledID('emailAdm', valor);
    this.disabledID('nombreAdm', valor);
    this.disabledID('apellidosAdm,', valor);
    this.disabledID('NIFAdm', valor);
    this.disabledID('zonaAdm', valor);
    this.disabledID('contraseñaAdm', valor);
    
  }


  cancelarCambiosCrear(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('add_adm', false); //mostrar btn_add
    this.ocultarBtn('cont_confirm_add_adm', true); //ocultar btns_aceptar_cancelar
  }

  cancelarCambiosActualizar(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('add_adm', false); //mostrar btn_add
    this.ocultarBtn('cont_confirm_udt_adm', true); //ocultar btns_aceptar_cancelar
  }

  activarCamposCrear(){
    this.disabledTodos(false); //habilitar campos
    this.vaciarCampos(); //vaciar campos
    this.ocultarBtn('add_adm', true); //ocultar btn_add
    this.ocultarBtn('update_adm', true); //ocultar btn_add
    this.ocultarBtn('delete_adm', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_add_adm', false); //mostrar btns_aceptar_cancelar    
  }

  activarCamposActualizar(){
    this.disabledTodos(false); //habilitar campos
    this.disabledID('nombreAdm',true);
    this.vaciarAvisos(); //vaciar campos
    this.ocultarBtn('add_adm', true); //ocultar btn_add
    this.ocultarBtn('update_adm', true); //ocultar btn_add
    this.ocultarBtn('delete_adm', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_udt_adm', false); //mostrar btns_aceptar_cancelar
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
    this.asignarValorID("emailAdm","");
    this.asignarValorID("apellidosAdm","");
    this.asignarValorID("nombreAdm","");
    this.asignarValorID("NIFAdm","");
    this.asignarValorID("zonaAdm","");
    this.asignarValorID("contraseñaAdm","");
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
    this.avisoEmail = "";
    this.avisoNombre= "";
    this.avisoNIF = "";
    this.avisoApellidos = "";
    this.avisoContraseña = "";
    this.avisoZona = "";
    
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
