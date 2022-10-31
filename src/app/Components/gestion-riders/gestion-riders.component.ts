import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rider } from 'src/app/Entities/rider';

@Component({
  selector: 'app-gestion-riders',
  templateUrl: './gestion-riders.component.html',
  styleUrls: ['./gestion-riders.component.css']
})

export class GestionRidersComponent implements OnInit {
  private contenedor_campos!: HTMLElement;
  avisoVehiculo: string = "";
  avisoNombre: string = "";
  avisoCarnet: string = "";
  avisoContraseña: string = "";
  avisoNIF: string = "";
  avisoEmail: string = "";
  avisoApellidos: string = "";

  listaAdministradores: Rider[] = [];

  constructor(private router: Router, private http: HttpClient) { 
    
  }

  ngOnInit(): void {
  
  var campoRyder = document.getElementById("contenedor_camposRider");
 
  if (campoRyder != null){
    this.contenedor_campos = campoRyder;
  }
}

aceptarCambiosCrear(){
  var nombreRyCampo = document.getElementById("nombreRy") as HTMLInputElement;
  var apellidosRyCampo = document.getElementById("apellidosRy") as HTMLInputElement;
  var nifRyCampo = document.getElementById("nifRy") as HTMLInputElement;
  var valoracionRyCampo = document.getElementById("valoracionRy") as HTMLInputElement;
  var emailRyCampo = document.getElementById("emailRy") as HTMLInputElement;
  var pwdRyCampo = document.getElementById("passwordRy") as HTMLInputElement;
  var tVehiculoRyCampo = document.querySelectorAll('input[name="tipoVehiculo"]');
  var matriculaRyCampo = document.getElementById("matriculaRy") as HTMLInputElement;
  var carnetRyCampo = document.getElementById("carnetRy") as HTMLInputElement;

  this.avisoEmailAdmin = this.comprobarVacio(emailAdmCampo?.value);
  this.avisoPwdAdmin = this.comprobarVacio(pwdAdmCampo?.value);
  this.avisoNIFAdmin= this.comprobarVacio(nifAdmCampo?.value);
  this.avisoZonaAdmin = this.comprobarVacio(zonaAdmCampo?.value);
  this.avisoApellidosAdmin = this.comprobarVacio(apellidosAdmCampo?.value);
  this.avisoNombreAdmin = this.comprobarVacio(nombreAdmCampo?.value);
  
   //Comprobar que sigue un patron ****@***.*** , buscar como se hace)
   if (pwdRyCampo?.value === "") 
   {
    this.avisoRegistroRyders= "Te falta rellenar un campo para completar el registro";
     return;
   } else {
     this.avisoRegistroRyders= "";
   }

   let seleccionV = "";
    Array.prototype.forEach.call(tVehiculoRyCampo, function (item) {
      if(item.checked === true){
        seleccionV = item.value;
      }
    });

   
   
  //CUIDADO CON LOS AVISOS, HAY QUE CAMBIARLOS O IMPLEMENTARLOS DE ALGUNA FORMA
  this.peticionHttpCrear(nombreRyCampo?.value, apellidosRyCampo?.value, nifRyCampo?.value, valoracionRyCampo?.value, emailRyCampo?.value, pwdRyCampo?.value, seleccionV, matriculaRyCampo?.value, carnetRyCampo?.value);
}

peticionHttpCrear(nombreRy: string, apellidosRy: string, nifRy: string, valoracionRy: string, emailRy: string, pwdRy: string, seleccionVRy: string, matriculaRy: string, carnetRy: string): void {
  const headers = { 'Content-Type': 'application/json'};
  const body = {
    "nombre": nombreRy,
    "apellidos": apellidosRy, 
    "nif": nifRy, 
    "valoracion": valoracionRy,
    "correo": emailRy,
    "pwd1": pwdRy, 
    "pwd2": pwdRy,
    "tipovehiculo": seleccionVRy,
    "matricula": matriculaRy, 
    "carnet": carnetRy,
    "rol": "rider",
    "correoAcceso": window.sessionStorage.getItem('correo'),
    "passwordAcceso": window.sessionStorage.getItem('password')
  };

  const url = 'http://localhost:8082/user/crearUsuario';
  this.http.post(url, body, { headers, responseType: 'text' }).subscribe(data => {  
  if(data === "Registro completado"){
    this.avisoRegistroRyders = "Ryder creado correctamente"; 
  }
  });
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

peticionGetHttp(): void {
  const headers = { 
    'Content-Type': 'application/json'}; 

  const url = 'http://localhost:8082/food/consultarAdministradores';
  this.http.get(url, { headers, responseType: 'text' }).subscribe({
    next: data => {
      this.listaAdministradores = [];
      if(data.length == 0){
        //alert(window.sessionStorage.getItem('rol'));
        //alert("No hay restaurantes");
      }else{
        var listaResJSON = data.split(";");
        for (let i = 0; i < listaResJSON.length; i++) {
          //console.log(listaResJSON[i]);
          this.listaAdministradores.push(new Administrador(listaResJSON[i]))
          console.log(this.listaAdministradores[i]);
        }
      }
    }, error: error => {
      
      //this.router.navigate(['/login']);
      alert("Ha ocurrido un error al cargar los administradores");
    }
  });
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



mostrar_datos(){
  this.ocultarTodo()
  this.contenedor_datos.classList.remove('oculto');
}




ocultarTodo(){
  this.contenedor_datos.classList.add('oculto');
 
}

onSelect(element: Administrador){
  this.disabledTodos(true);
  console.log(element);
  
  this.asignarValorID('emailAdm', element.correo);
  this.asignarValorID('zonaAdm', element.nombre);
  this.asignarValorID('NIFAdm', element.CIF);
  this.asignarValorID('nombreAdmin', element.razon_social);
  this.asignarValorID('contraseñaAdmin', String(element.telefono));
  this.asignarValorID('apellidosAdm', String(element.valoracion));
  this.ocultarBtn("cont_confirm_add",true);
  this.ocultarBtn("cont_confirm_udt",true);
  this.ocultarBtn("add_res",false);
  this.ocultarBtn("update_res",false);
  this.ocultarBtn("delete_res",false);
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

}
