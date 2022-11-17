import { Inject, Injectable, LOCALE_ID } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class FuncionesService {

  constructor(){}
  

  validarEmail(valor: string): boolean {
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(valor)) {
      return true;
    } else {
      return false;
    }
  }

  comprobarVacio(cadena: string): string {
    if (cadena === "") {
      return "Campo vacío";
    } else {
      return "";
    }
  }

  esNumero(cadena: string): boolean {
    if (cadena.length != 9) {
      return false;
    }

    for (let i = 0; i < 9; i++) {
      if (!this.esInt(cadena.charAt(i))) {
        return false;
      }
    }
    return true;
  }

  esInt(charac: string): boolean {
    if (charac == '0') {
      return true;
    } else if (charac == '1') {
      return true;
    } else if (charac == '2') {
      return true;
    } else if (charac == '3') {
      return true;
    } else if (charac == '4') {
      return true;
    } else if (charac == '5') {
      return true;
    } else if (charac == '6') {
      return true;
    } else if (charac == '7') {
      return true;
    } else if (charac == '8') {
      return true;
    } else if (charac == '9') {
      return true;
    } else {
      return false;
    }
  }

  ocultarBtn(id: string, valor: boolean) {
    var campo = document.getElementById(id) as HTMLInputElement;
    if (valor) {
      campo.classList.add('oculto');
    } else {
      campo.classList.remove('oculto');
    }
  }

  asignarValorID(id: string, valor: string) {
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.value = valor;
  }

  disabledID(id: string, valor: boolean) {
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.disabled = valor;
  }

  seleccionarRadio(id: string, valor: boolean) {
    var campo = document.getElementById(id) as HTMLInputElement;
    campo.checked = valor;
  }

  comprobarSeleccionado(element: HTMLInputElement): boolean {
    return element.checked;
  }

  apagarElementosLista(idLista:string){
    var lista = document.getElementById(idLista) as HTMLUListElement;
    if (lista.children != null){
      for (let i = 0; i < lista.children.length; i++) {
        lista.children[i].classList.remove('resaltado');
      }
    }else{
      console.log("lista nula: "+idLista);
      
    }
    console.log("resaltado quitado: "+idLista);
  }

  resaltarElementoLista (idLista:string, pos:number){
    var lista = document.getElementById(idLista) as HTMLUListElement;
    if (lista.children != null){
      lista.children[pos].classList.add('resaltado');
    }else{
      console.log("lista nula: "+idLista);
    }
    console.log("resaltado quitado: "+idLista);
  }

}