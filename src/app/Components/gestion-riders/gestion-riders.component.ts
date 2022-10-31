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
  avisoNombre: string = "";
  avisoApellidos: string = "";
  avisoNIF: string = "";
  avisoCorreo: string = "";
  avisoPwd: string = "";
  avisoTipoVeh: string = "";
  avisoMatricula: string = "";
  avisoCarnet: string = "";

  listaRiders: Rider[] = [];

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

    const url = 'http://localhost:8082/user/getRiders';
    this.http.post(url, body, { headers, responseType: 'text'}).subscribe({
      next: data => {
        this.listaRiders = [];
        if(data.length == 0){
          //alert("No hay riders");
        }else{
          var listaResJSON = data.split(";");
          for (let i = 0; i < listaResJSON.length; i++) {
            //console.log(listaResJSON[i]);
            this.listaRiders.push(new Rider(listaResJSON[i]))
            console.log(this.listaRiders[i]);
          }
        }
      }, error: error => {
        if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          alert("Ha ocurrido un error al cargar los riders");
          //alert(error.error);
        }
      }
    });
  }

  aceptarCambiosCrear(){
    var errorCampo = false;
    var nombreCampo = document.getElementById("nombreR") as HTMLInputElement;
    var apellidosCampo = document.getElementById("apellidosR") as HTMLInputElement;
    var nifCampo = document.getElementById("nifR") as HTMLInputElement;
    var emailCampo = document.getElementById("emailR") as HTMLInputElement;
    var pwdCampo = document.getElementById("passwordR") as HTMLInputElement;

    var cocheCampo = document.getElementById("cocheR") as HTMLInputElement;
    var motoCampo = document.getElementById("motoR") as HTMLInputElement;
    var biciCampo = document.getElementById("biciR") as HTMLInputElement;
    var patineteCampo = document.getElementById("patineteR") as HTMLInputElement;

    var matriculaCampo = document.getElementById("matriculaR") as HTMLInputElement;
    var carnetCampo = document.getElementById("carnetR") as HTMLInputElement;

    this.avisoNombre = this.comprobarVacio(nombreCampo?.value);
    this.avisoApellidos = this.comprobarVacio(apellidosCampo?.value);
    this.avisoNIF = this.comprobarVacio(nifCampo?.value);
    this.avisoCorreo = this.comprobarVacio(emailCampo?.value);
    this.avisoPwd = this.comprobarVacio(pwdCampo?.value);

    var tipoVeh = 0;
    if(this.comprobarSeleccionado(cocheCampo)){
      tipoVeh = 1;
    } else if(this.comprobarSeleccionado(motoCampo)){
      tipoVeh = 2;
    } else if(this.comprobarSeleccionado(biciCampo)){
      tipoVeh = 3;
    } else if(this.comprobarSeleccionado(patineteCampo)){
      tipoVeh = 4;
    }

    if(tipoVeh == 0){
      this.avisoTipoVeh = "Selecciona un tipo de vehículo";
      errorCampo = true;
    }else{
      this.avisoTipoVeh = "";
    }

    if(!this.validarEmail(emailCampo?.value)){
      errorCampo = true;
    }

    if(!errorCampo){
      this.peticionHttpCrear(nombreCampo?.value, apellidosCampo?.value, nifCampo?.value, 
        emailCampo?.value, pwdCampo?.value, tipoVeh, matriculaCampo?.value, carnetCampo?.value);
    }
  }

  peticionHttpCrear(nombre : string, apellidos : string, nif : string, correo : string, 
    pwd : string, tipoVeh:number, matricula:string, carnet:string): void {
   const headers = { 'Content-Type': 'application/json'};
   const body = {
    "nombre": nombre,
    "apellidos": apellidos, 
    "nif": nif, 
    "valoracion": "0",
    "correo": correo,
    "pwd1": pwd, 
    "pwd2": pwd,
    "tipoVehiculo": String(tipoVeh),
    "matricula": matricula, 
    "carnet": carnet,
    "rol": "rider",
    "correoAcceso": window.sessionStorage.getItem('correo'),
    "passwordAcceso": window.sessionStorage.getItem('password')
   };

   const url = 'http://localhost:8082/user/crearUsuario';
   this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
     next: data => {
       alert("Rider creado exitosamente");
       this.dejarVacio();
       this.ocultarBtn("add_rider",false);
       this.ocultarBtn("cont_confirm_add_r",true);
       this.peticionGetHttp();
     }, error: error =>{
       if(error.error.includes("Ya existe un usuario con ese correo")){
         alert("Ya existe un usuario con ese correo");
       }else if(error.error.includes("No tienes acceso a este servicio")){
         alert("No tienes acceso a este servicio");
         this.router.navigate(['/login']);
       }else if(error.error.includes("contraseña")){
         alert(error.error);
       }else{
         //alert("Ha ocurrido un error al introducir el administrador");
         alert(error.error);
       }
     }});

 }

  dejarVacio(){
    this.vaciarAvisos();
    this.vaciarCampos();
  }

  vaciarCampos(){
    this.asignarValorID("nombreR","");
    this.asignarValorID("apellidosR","");
    this.asignarValorID("nifR","");
    this.asignarValorID("valoracionR","0");
    this.asignarValorID("emailR","");
    this.asignarValorID("passwordR","");
    this.asignarValorID("matriculaR","");
    this.asignarValorID("carnetR","");
  }

  asignarValorID(id:string, valor:string){
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.value = valor;
  }

  vaciarAvisos(){
    this.avisoNombre = "";
    this.avisoApellidos = "";
    this.avisoNIF = "";
    this.avisoCorreo = "";
    this.avisoPwd = "";
    this.avisoTipoVeh = "";
    this.avisoMatricula = "";
    this.avisoCarnet = "";
  }

  aceptarCambiosActualizar(){
    var errorCampo = false;
    var nombreCampo = document.getElementById("nombreR") as HTMLInputElement;
    var apellidosCampo = document.getElementById("apellidosR") as HTMLInputElement;
    var nifCampo = document.getElementById("nifR") as HTMLInputElement;
    var emailCampo = document.getElementById("emailR") as HTMLInputElement;
    var pwdCampo = document.getElementById("passwordR") as HTMLInputElement;

    var cocheCampo = document.getElementById("cocheR") as HTMLInputElement;
    var motoCampo = document.getElementById("motoR") as HTMLInputElement;
    var biciCampo = document.getElementById("biciR") as HTMLInputElement;
    var patineteCampo = document.getElementById("patineteR") as HTMLInputElement;

    var matriculaCampo = document.getElementById("matriculaR") as HTMLInputElement;
    var carnetCampo = document.getElementById("carnetR") as HTMLInputElement;

    this.avisoNombre = this.comprobarVacio(nombreCampo?.value);
    this.avisoApellidos = this.comprobarVacio(apellidosCampo?.value);
    this.avisoNIF = this.comprobarVacio(nifCampo?.value);
    this.avisoCorreo = this.comprobarVacio(emailCampo?.value);
    this.avisoPwd = this.comprobarVacio(pwdCampo?.value);

    var tipoVeh = 0;
    if(this.comprobarSeleccionado(cocheCampo)){
      tipoVeh = 1;
    } else if(this.comprobarSeleccionado(motoCampo)){
      tipoVeh = 2;
    } else if(this.comprobarSeleccionado(biciCampo)){
      tipoVeh = 3;
    } else if(this.comprobarSeleccionado(patineteCampo)){
      tipoVeh = 4;
    }

    if(tipoVeh == 0){
      this.avisoTipoVeh = "Selecciona un tipo de vehículo";
      errorCampo = true;
    }else{
      this.avisoTipoVeh = "";
    }

    if(!this.validarEmail(emailCampo?.value)){
      errorCampo = true;
    }

    this.peticionHttpActualizar(nombreCampo?.value, apellidosCampo?.value, nifCampo?.value, 
      emailCampo?.value, pwdCampo?.value, tipoVeh, matriculaCampo?.value, carnetCampo?.value);
  }
  
  peticionHttpActualizar(nombre : string, apellidos : string, nif : string, correo : string, 
    pwd : string, tipoVeh:number, matricula:string, carnet:string): void {
     const headers = { 'Content-Type': 'application/json'};
     const body = {
      "nombre": nombre,
      "apellidos": apellidos, 
      "nif": nif, 
      "valoracion": "0",
      "correo": correo,
      "pwd1": pwd, 
      "pwd2": pwd,
      "tipoVehiculo": String(tipoVeh),
      "matricula": matricula, 
      "carnet": carnet,
      "rol": "rider",
      "correoAcceso": window.sessionStorage.getItem('correo'),
      "passwordAcceso": window.sessionStorage.getItem('password')
    };
  
     let url = 'http://localhost:8082/user/actualizarUsuario/';
     url += correo;
     this.http.post(url, body, { headers, responseType: 'text' }).subscribe({
       next: data => {
         alert("Rider actualizado exitosamente");
         this.dejarVacio();
         this.ocultarBtn("update_rider",false);
         this.ocultarBtn("cont_confirm_udt_r",true);
         this.peticionGetHttp();
       }, error: error =>{
         if(error.error.includes("No existe ningun usuario en la base de datos")){
           alert("No existe ese usuario en la base de datos");
         }else if(error.error.includes("No tienes acceso a este servicio")){
           alert("No tienes acceso a este servicio");
           this.router.navigate(['/login']);
         }else{
           //alert("Ha ocurrido un error al actualizar el rider");
           alert(error.error);
         }
       }});
   }
  
  cancelarCambiosCrear(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('add_rider', false); //mostrar btn_add
    this.ocultarBtn('cont_confirm_add_r', true); //ocultar btns_aceptar_cancelar
  }

  cancelarCambiosActualizar(){
    this.disabledTodos(true); //bloquear campos
    this.dejarVacio();
    this.ocultarBtn('add_rider', false); //mostrar btn_add
    this.ocultarBtn('cont_confirm_udt_r', true); //ocultar btns_aceptar_cancelar
  }

  activarCamposCrear(){
    this.disabledTodos(false); //habilitar campos
    this.vaciarCampos(); //vaciar campos
    this.ocultarBtn('add_rider', true); //ocultar btn_add
    this.ocultarBtn('update_rider', true); //ocultar btn_add
    this.ocultarBtn('delete_rider', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_add_r', false); //mostrar btns_aceptar_cancelar    
  }

  activarCamposActualizar(){
    this.disabledTodos(false); //habilitar campos
    this.disabledID('emailR',true);
    this.vaciarAvisos(); //vaciar campos
    this.ocultarBtn('add_rider', true); //ocultar btn_add
    this.ocultarBtn('update_rider', true); //ocultar btn_add
    this.ocultarBtn('delete_rider', true); //ocultar btn_add
    this.ocultarBtn('cont_confirm_udt_r', false); //mostrar btns_aceptar_cancelar
  }

  eliminar(){
    var correoCampo = document.getElementById("emailR") as HTMLInputElement;

    if(confirm("¿Seguro que quiere eliminar el rider?")){
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
        alert("Rider eliminado exitosamente");
        this.dejarVacio();
        this.ocultarBtn("add_rider",false);
        this.ocultarBtn("cont_confirm_add_r",true);
        this.peticionGetHttp();
      }, error: error =>{
        if(error.error.includes("No existe ningun usuario en la base de datos")){
          alert("No existe ese usuario en la base de datos");
        }else if(error.error.includes("No tienes acceso a este servicio")){
          alert("No tienes acceso a este servicio");
          this.router.navigate(['/login']);
        }else{
          alert("Ha ocurrido un error al eliminar el rider");
        }
      }});
  }

  comprobarSeleccionado(element:HTMLInputElement):boolean{
    return element.checked;
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

  comprobarVacio(cadena:string):string{
    if(cadena === ""){
      return "Campo vacío";
    }else{
      return "";
    }
  }

  disabledTodos(valor: boolean){
    this.disabledID('nombreR', valor);
    this.disabledID('apellidosR', valor);
    this.disabledID('nifR', valor);
    this.disabledID('emailR', valor);
    this.disabledID('passwordR', valor);

    this.disabledID('cocheR', valor);
    this.disabledID('motoR', valor);
    this.disabledID('biciR', valor);
    this.disabledID('patineteR', valor);

    this.disabledID('matriculaR', valor);
    this.disabledID('carnetR', valor);
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

  logout(){
    window.sessionStorage.removeItem('rol');
    window.sessionStorage.removeItem('correo');
    window.sessionStorage.removeItem('password');
    this.router.navigate(['/inicio']);
  }

  onSelect(element: Rider){
    this.disabledTodos(true);
    console.log(element);
    
    this.asignarValorID('nombreR', element.nombre);
    this.asignarValorID('apellidosR', element.apellidos);
    this.asignarValorID('nifR', element.nif);
    this.asignarValorID('emailR', element.correo);
    this.asignarValorID('passwordR', element.pwd);
    this.asignarValorID('valoracionR', String(element.valoracion));

    this.seleccionarRadio('cocheR',false);
    this.seleccionarRadio('motoR',false);
    this.seleccionarRadio('biciR',false);
    this.seleccionarRadio('patineteR',false);

    if(element.tipoVehiculo==1){
      this.seleccionarRadio('cocheR',true);
    } else if(element.tipoVehiculo==2){
      this.seleccionarRadio('motoR',true);
    } else if(element.tipoVehiculo==3){
      this.seleccionarRadio('biciR',true);
    } else if(element.tipoVehiculo==4){
      this.seleccionarRadio('patineteR',true);
    }

    this.asignarValorID('matriculaR', element.matricula);
    this.asignarValorID('carnetR', element.carnet);
    
    this.ocultarBtn("cont_confirm_add_r",true);
    this.ocultarBtn("cont_confirm_udt_r",true);
    this.ocultarBtn("add_rider",false);
    this.ocultarBtn("update_rider",false);
    this.ocultarBtn("delete_rider",false);
  }

  seleccionarRadio(id:string, valor:boolean){
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.checked = valor;
  }
}
