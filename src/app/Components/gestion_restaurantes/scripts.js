
document.getElementById("btn_datos").addEventListener("click", mostrar_datos);
document.getElementById("btn_carta").addEventListener("click", mostrar_carta);
document.getElementById("btn_facturas").addEventListener("click", mostrar_facturas);

    contenedor_datos = document.getElementById("datos");
    contenedor_carta = document.getElementById("carta");
    contenedor_factura= document.getElementById("facturas");

function mostrar_datos(){
    contenedor_datos.classList.remove('oculto');
    contenedor_carta.classList.add('oculto');
    contenedor_factura.classList.add('oculto');
}

function mostrar_carta(){
    contenedor_datos.classList.add('oculto');
    contenedor_carta.classList.remove('oculto');
    contenedor_factura.classList.add('oculto');
}

function mostrar_facturas(){
    contenedor_datos.classList.add('oculto');
    contenedor_carta.classList.add('oculto');
    contenedor_factura.classList.remove('oculto');
}