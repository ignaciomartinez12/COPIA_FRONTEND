document.getElementById("btn_acceder").addEventListener("click", acceder_login);

campoLogin = document.getElementById("email");
campoPass = document.getElementById("password");

function acceder_login() {
    var self = this;
    var info = {
        name : campoLogin.value,
        pwd : campoPass.value
    };
    var data = {
        data : JSON.stringify(info),
        url : "localhost:8080/user/login",
        type : "post",
        contentType : 'application/json',
        success : function(response) {
            self.error("");
            self.message(response);
            app.router.go( { path : "../inicio/inicio.html"} );
        },
        error : function(response) {
            self.message("");
            self.error(response.responseJSON.message);
        }
    };
    $.ajax(data);
}






<script>
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
              'Content-Type': 'application/json',
              },
              body: JSON.stringify(objeto),
              });
          
           }
          }
             </script>