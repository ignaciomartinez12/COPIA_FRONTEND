import { Inject, Injectable, LOCALE_ID } from "@angular/core";
import { LineaPlato } from "../Entities/lineaPlato";
import { Pedido } from "../Entities/pedido";

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


  esFechaValida(fecha: string): boolean {
    var partesFecha = fecha.split("-");

    if (partesFecha.length != 3) {
      return false;
    }

    if (this.comprobarAnio(partesFecha[0])) {
      return false;
    }

    if (this.comprobarMes(partesFecha[1])) {
      return false;
    }

    if (this.comprobarDia(partesFecha[2])) {
      return false;
    }

    return true;
  }


  comprobarAnio(anio: string): boolean {
    if (anio.length != 4) {
      return false;
    }

    if (!this.esInt(anio)) {
      return false;
    }

    if (Number(anio) < 1900) {
      return false;
    }

    return true;
  }


  comprobarMes(mes: string): boolean {
    if (mes.length != 2) {
      return false;
    }

    if (!this.esInt(mes)) {
      return false;
    }

    if (Number(mes) < 1 || Number(mes) > 12) {
      return false;
    }

    return true;
  }


  comprobarDia(dia: string): boolean {
    if (dia.length != 2) {
      return false;
    }

    if (!this.esInt(dia)) {
      return false;
    }

    if (Number(dia) < 1 || Number(dia) > 31) {
      return false;
    }

    return true;
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

  apagarElementosLista(idLista: string) {
    var lista = document.getElementById(idLista) as HTMLUListElement;
    if (lista.children != null) {
      for (let i = 0; i < lista.children.length; i++) {
        lista.children[i].classList.remove('resaltado');
      }
    } else {
      console.log("lista nula: " + idLista);

    }
    console.log("resaltado quitado: " + idLista);
  }

  resaltarElementoLista(idLista: string, pos: number) {
    var lista = document.getElementById(idLista) as HTMLUListElement;
    if (lista.children != null) {
      lista.children[pos].classList.add('resaltado');
    } else {
      console.log("lista nula: " + idLista);
    }
    console.log("resaltado quitado: " + idLista);
  }

  genPlatosPedido(pedido: Pedido, restaurante: string): LineaPlato[] {
    var listaPlatos: LineaPlato[] = [];
    var listaPlatosJSON = pedido.listaPlatos.split(";");
    for (let i = 0; i < listaPlatosJSON.length; i++) {
      var partesPlato = listaPlatosJSON[i].split(",");
      var plato = new LineaPlato(partesPlato[0], Number(partesPlato[1]).toFixed(2), partesPlato[2], restaurante);
      listaPlatos.push(plato);
    }
    return listaPlatos;
  }

  calcularTotalPedido(listaPlatos: LineaPlato[]): number {
    var total = 0;
    for (let i = 0; i < listaPlatos.length; i++) {
      total += (Number(listaPlatos[i].precioP) * Number(listaPlatos[i].cantidad));
    }
    return total;
  }

  esFechaValida(fecha: string): boolean {
    var partesFecha = fecha.split("-");

    if (partesFecha.length != 3) {
      return false;
    }

    if(this.comprobarAnio(partesFecha[0])){
      return false;
    }

    if(this.comprobarMes(partesFecha[1])){
      return false;
    }

    if(this.comprobarDia(partesFecha[2])){
      return false;
    }

    return true;
  }

  comprobarAnio(anio: string): boolean {
    if (anio.length != 4) {
      return false;
    }

    if (!this.esInt(anio)) {
      return false;
    }

    if (Number(anio) < 1900) {
      return false;
    }

    return true;
  }

  comprobarMes(mes: string): boolean {
    if (mes.length != 2) {
      return false;
    }

    if (!this.esInt(mes)) {
      return false;
    }

    if (Number(mes) < 1 || Number(mes) > 12) {
      return false;
    }

    return true;
  }

  comprobarDia(dia: string): boolean {
    if (dia.length != 2) {
      return false;
    }

    if (!this.esInt(dia)) {
      return false;
    }

    if (Number(dia) < 1 || Number(dia) > 31) {
      return false;
    }

    return true;
  }
}