import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/Entities/cliente';

@Component({
  selector: 'app-gestion-clientes',
  templateUrl: './gestion-clientes.component.html',
  styleUrls: ['./gestion-clientes.component.css']
})
export class GestionClientesComponent implements OnInit {
  avisoNombre: string = "";
  avisoApellidos: string = "";
  avisoNIF: string = "";
  avisoTel: string = "";
  avisoCorreo: string = "";
  avisoPwd: string = "";
  avisoDireccion: string = "";
    
  listaClientes: Cliente[] = [];
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

    const url = 'http://localhost:8082/user/getClients';
    this.http.post(url, body, { headers, responseType: 'text'}).subscribe({
      next: data => {
        this.listaClientes = [];
        if(data.length == 0){
          //alert("No hay clientes");
        }else{
          var listaResJSON = data.split(";");
          for (let i = 0; i < listaResJSON.length; i++) {
            //console.log(listaResJSON[i]);
            this.listaClientes.push(new Cliente(listaResJSON[i]))
            console.log(this.listaClientes[i]);
          }
        }
      }, error: error => {
        if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          //alert("Ha ocurrido un error al cargar los clientes");
          alert(error.error);
        }
      }
    });
  }

  aceptarCambiosActualizar(){
    var nombreCampo = document.getElementById("nombreC") as HTMLInputElement;
    var apellidosCampo = document.getElementById("apellidosC") as HTMLInputElement;
    var nifCampo = document.getElementById("nifC") as HTMLInputElement;
    var telCampo = document.getElementById("telC") as HTMLInputElement;
    var emailCampo = document.getElementById("emailC") as HTMLInputElement;
    var pwdCampo = document.getElementById("passwordC") as HTMLInputElement;
    var direccionCampo = document.getElementById("direccionC") as HTMLInputElement;

    this.avisoNombre = this.comprobarVacio(nombreCampo?.value);
    this.avisoApellidos = this.comprobarVacio(apellidosCampo?.value);
    this.avisoTel = this.comprobarVacio(telCampo?.value);
    this.avisoNIF = this.comprobarVacio(nifCampo?.value);
    this.avisoCorreo = this.comprobarVacio(emailCampo?.value);
    this.avisoPwd = this.comprobarVacio(pwdCampo?.value);
    this.avisoDireccion = this.comprobarVacio(direccionCampo?.value);

    if(!this.validarEmail(emailCampo?.value)){
      return;
    }

    if(!this.esNumero(telCampo?.value)){
      return;
    }

    this.peticionHttpActualizar(nombreCampo?.value, apellidosCampo?.value,  
      telCampo?.value, nifCampo?.value, emailCampo?.value, pwdCampo?.value, direccionCampo?.value);

  }

  cancelarCambiosActualizar(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('cont_confirm_udt_c', true); //ocultar btns_aceptar_cancelar
  }

  activarCamposActualizar(){
    this.disabledTodos(false); //habilitar campos
    this.disabledID('emailC',true);
    this.vaciarAvisos(); //vaciar campos
    this.ocultarBtn('update_clientes', true); //ocultar btn_add
    this.ocultarBtn('delete_clientes', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_udt_c', false); //mostrar btns_aceptar_cancelar
  }

  eliminar(){
    var correoCampo = document.getElementById("emailC") as HTMLInputElement;

    if(confirm("¿Seguro que quiere eliminar el cliente?")){
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
        alert("Cliente eliminado exitosamente");
        this.dejarVacio();
        this.ocultarBtn("cont_confirm_add_c",true);
        this.peticionGetHttp();
      }, error: error =>{
        if(error.error.includes("No existe ningun usuario en la base de datos")){
          alert("No existe ese cliente en la base de datos");
        }else if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          alert("Ha ocurrido un error al eliminar el cliente");
        }
      }});
  }

  disabledTodos(valor: boolean){
    this.disabledID('nombreC', valor);
    this.disabledID('apellidosC', valor);
    this.disabledID('telC', valor);
    this.disabledID('nifC', valor);
    this.disabledID('emailC', valor);
    this.disabledID('passwordC', valor);
    this.disabledID('direccionC', valor);
  }

  disabledID(id:string, valor:boolean){
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.disabled = valor;
  }

  peticionHttpActualizar(nombre : string, apellidos : string, telefono : string,
    nif : string, correo : string, pwd : string, direccion : string): void {
     const headers = { 'Content-Type': 'application/json'};
     const body = {
      "correo": correo,
      "contraseña": pwd,
      "apellidos": apellidos,
      "nif": nif,
      "nombre": nombre,
      "telefono": telefono,
      "direccion": direccion,
      "rol": "cliente",
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };
  
     let url = 'http://localhost:8082/user/actualizarCliente/';
     url += correo;
     this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
       next: data => {
         alert("Cliente actualizado exitosamente");
         this.dejarVacio();
         this.ocultarBtn("update_clientes",false);
         this.ocultarBtn("cont_confirm_udt_c",true);
         this.peticionGetHttp();
       }, error: error =>{
         if(error.error.includes("No existe ningun usuario en la base de datos")){
           alert("No existe ese cliente en la base de datos");
         }else if(error.error.includes("No tienes acceso a este servicio")){
           alert("No tienes acceso a este servicio");
           this.router.navigate(['/login']);
         }else{
           alert("Ha ocurrido un error al actualizar el cliente");
         }
       }});
  
   }
  
  dejarVacio(){
    this.vaciarAvisos();
    this.vaciarCampos();
  }

  vaciarCampos(){
    this.asignarValorID("nombreC","");
    this.asignarValorID("apellidosC","");
    this.asignarValorID("telC","");
    this.asignarValorID("nifC","");
    this.asignarValorID("emailC","");
    this.asignarValorID("passwordC","");
    this.asignarValorID("direccionC","");
  }

  asignarValorID(id:string, valor:string){
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.value = valor;
  }

  vaciarAvisos(){
    this.avisoNombre = "";
    this.avisoApellidos = "";
    this.avisoNIF = "";
    this.avisoTel = "";
    this.avisoCorreo = "";
    this.avisoPwd = "";
    this.avisoDireccion = "";
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

  logout(){
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }

  onSelect(element: Cliente){
    this.disabledTodos(true);
    console.log(element);
    
    this.asignarValorID('nombreC', element.nombre);
    this.asignarValorID('apellidosC', element.apellidos);
    this.asignarValorID('nifC', element.nif);
    this.asignarValorID('telC', String(element.telefono));
    this.asignarValorID('emailC', element.correo);
    this.asignarValorID('passwordC', element.pwd);
    this.asignarValorID('direccionC', element.direccion);
    
    this.ocultarBtn("cont_confirm_udt_c",true);
    this.ocultarBtn("update_clientes",false);
    this.ocultarBtn("delete_clientes",false);
  }
}
