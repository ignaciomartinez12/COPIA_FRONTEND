window.onload= function(){
    var objeto= document.getElementById("logout");
    var campoCorreo = document.getElementById("email");
    var campoPass = document.getElementById("password");

    objeto.onclick= function(){
        alert("hola")
        const objeto = {
            correo: campoCorreo.value,
            pwd: campoPass.value,};
        fetch("http://localhost:8082/user/login", {    
            method: "POST", 
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto),
        }).then(function(response) {
            if (response.ok){
                alert("Bien")
                app.router.go( { path : "../inicio/inicio.html"} );
            } else {
                alert("Error")
            }
        })
          
    }
}