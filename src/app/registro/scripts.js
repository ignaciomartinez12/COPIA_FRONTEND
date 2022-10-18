document.getElementById("paso2").addEventListener("click", mostrar_paso2);
document.getElementById("paso3").addEventListener("click", mostrar_paso3);
document.getElementById("paso4").addEventListener("click", mostrar_paso1);
document.getElementById("paso6").addEventListener("click", mostrar_paso3);
document.getElementById("paso7").addEventListener("click", mostrar_paso1);
document.getElementById("paso8").addEventListener("click", mostrar_paso2);

    contenedor_campos1 = document.getElementById("campos_paso1");
    contenedor_campos2 = document.getElementById("campos_paso2");
    contenedor_campos3 = document.getElementById("campos_paso3");

function mostrar_paso1(){
    contenedor_campos1.classList.remove('oculto');
    contenedor_campos2.classList.add('oculto');
    contenedor_campos3.classList.add('oculto');
}

function mostrar_paso2(){
    contenedor_campos2.classList.remove('oculto');
    contenedor_campos1.classList.add('oculto');
    contenedor_campos3.classList.add('oculto');
}

function mostrar_paso3(){
    contenedor_campos3.classList.remove('oculto');
    contenedor_campos1.classList.add('oculto');
    contenedor_campos2.classList.add('oculto');
}

//botones pasos
document.getElementById("siguiente1").addEventListener("click", mostrar_paso2);
document.getElementById("anterior2").addEventListener("click", mostrar_paso1);
document.getElementById("siguiente2").addEventListener("click", mostrar_paso3);
document.getElementById("anterior3").addEventListener("click", mostrar_paso2);