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

  aceptarCambiosActualizar(){
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

    this.peticionHttpActualizar(nombreCampo?.value, apellidosCampo?.value,  
      zonaCampo?.value, nifCampo?.value, emailCampo?.value, pwdCampo?.value);

  }

  cancelarCambiosCrear(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('add_admin', false); //mostrar btn_add
    this.ocultarBtn('cont_confirm_add_a', true); //ocultar btns_aceptar_cancelar
  }

  cancelarCambiosActualizar(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('add_admin', false); //mostrar btn_add
    this.ocultarBtn('cont_confirm_udt_a', true); //ocultar btns_aceptar_cancelar
  }

  activarCamposCrear(){
    this.disabledTodos(false); //habilitar campos
    this.vaciarCampos(); //vaciar campos
    this.ocultarBtn('add_admin', true); //ocultar btn_add
    this.ocultarBtn('update_admin', true); //ocultar btn_add
    this.ocultarBtn('delete_admin', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_add_a', false); //mostrar btns_aceptar_cancelar    
  }

  activarCamposActualizar(){
    this.disabledTodos(false); //habilitar campos
    this.disabledID('emailA',true);
    this.vaciarAvisos(); //vaciar campos
    this.ocultarBtn('add_admin', true); //ocultar btn_add
    this.ocultarBtn('update_admin', true); //ocultar btn_add
    this.ocultarBtn('delete_admin', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_udt_a', false); //mostrar btns_aceptar_cancelar
  }

  eliminar(){
    var correoCampo = document.getElementById("emailA") as HTMLInputElement;

    if(confirm("¿Seguro que quiere eliminar el administrador?")){
      this.peticionHttpEliminar(correoCampo?.value);
      this.dejarVacio();
      this.peticionGetHttp();
    }else{
      //cancelar
    }
  }

  peticionHttpEliminar(correo : string){
    const headers = { 'Content-Type': 'application/json'};
    const body = {
      "correo": correo,
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };

    const url = 'http://localhost:8082/user/eliminarUsuario';
    this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
      next: data => {
        alert("Administrador eliminado exitosamente");
        this.dejarVacio();
        this.ocultarBtn("add_admin",false);
        this.ocultarBtn("cont_confirm_add_a",true);
        this.peticionGetHttp();
      }, error: error =>{
        if(error.error.includes("No existe ningun usuario en la base de datos")){
          alert("No existe ese usuario en la base de datos");
        }else if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          alert("Ha ocurrido un error al eliminar el administrador");
        }
      }});
  }

  peticionHttpCrear(nombre : string, apellidos : string, zona : string,
    nif : string, correo : string, pwd : string): void {
   const headers = { 'Content-Type': 'application/json'};
   const body = {
     "correo": correo,
     "pwd1": pwd,
     "apellidos": apellidos,
     "nif": nif,
     "nombre": nombre,
     "zona": zona,
     "rol": "admin",
     "correoAcceso": window.sessionStorage.getItem('correo'),
     "passwordAcceso": window.sessionStorage.getItem('password')
   };

   const url = 'http://localhost:8082/user/crearUsuario';
   this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
     next: data => {
       alert("Administrador creado exitosamente");
       this.dejarVacio();
       this.ocultarBtn("add_admin",false);
       this.ocultarBtn("cont_confirm_add_a",true);
       this.peticionGetHttp();
     }, error: error =>{
       if(error.error.includes("Ya existe un usuario con ese correo")){
         alert("Ya existe un usuario con ese correo");
       }else if(error.error.includes("No tienes acceso a este servicio")){
         alert("No tienes acceso a este servicio");
         this.router.navigate(['/login']);
       }else{
         alert("Ha ocurrido un error al introducir el administrador");
       }
     }});

 }

 peticionHttpActualizar(nombre : string, apellidos : string, zona : string,
  nif : string, correo : string, pwd : string): void {
   const headers = { 'Content-Type': 'application/json'};
   const body = {
    "correo": correo,
    "pwd1": pwd,
    "apellidos": apellidos,
    "nif": nif,
    "nombre": nombre,
    "zona": zona,
    "rol": "admin",
    "correoAcceso": window.sessionStorage.getItem('correo'),
    "passwordAcceso": window.sessionStorage.getItem('password')
  };

   let url = 'http://localhost:8082/user/actualizarUsuario/';
   url += correo;
   this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
     next: data => {
       alert("Administrador actualizado exitosamente");
       this.dejarVacio();
       this.ocultarBtn("update_admin",false);
       this.ocultarBtn("cont_confirm_udt_a",true);
       this.peticionGetHttp();
     }, error: error =>{
       if(error.error.includes("No existe ningun usuario en la base de datos")){
         alert("No existe ningun usuario en la base de datos");
       }else if(error.error.includes("No tienes acceso a este servicio")){
         alert("No tienes acceso a este servicio");
         this.router.navigate(['/login']);
       }else{
         alert("Ha ocurrido un error al actualizar el administrador");
       }
     }});

 }

  dejarVacio(){
    this.vaciarAvisos();
    this.vaciarCampos();
  }

  vaciarCampos(){
    this.asignarValorID("nombreA","");
    this.asignarValorID("apellidosA","");
    this.asignarValorID("zonaA","");
    this.asignarValorID("nifA","");
    this.asignarValorID("emailA","");
    this.asignarValorID("passwordA","");
  }

  asignarValorID(id:string, valor:string){
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.value = valor;
  }

  vaciarAvisos(){
    this.avisoNombre = "";
    this.avisoApellidos = "";
    this.avisoNIF = "";
    this.avisoZona = "";
    this.avisoCorreo = "";
    this.avisoPwd = "";
  }

  logout(){
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }

  disabledTodos(valor: boolean){
    this.disabledID('nombreA', valor);
    this.disabledID('apellidosA', valor);
    this.disabledID('zonaA', valor);
    this.disabledID('nifA', valor);
    this.disabledID('emailA', valor);
    this.disabledID('passwordA', valor);
  }

  disabledID(id:string, valor:boolean){
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.disabled = valor;
  }

  ocultarBtn(id:string, valor:boolean){
    var campo = document.getElementById(id) as HTMLInputElement;
    if(valor){
      campo.classList.add('oculto');
    }else{
      campo.classList.remove('oculto');
    }
  }
  comprobarVacio(cadena:string):string{
    if(cadena === ""){
      return "Campo vacío";
    }else{
      return "";
    }
  }

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
}
