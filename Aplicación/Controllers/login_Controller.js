/**
 * Created by Josue on 23/11/2017.
 */
var a=1;
angular.module("acreditacion")
    .factory("FactoryLogin",function ($http,$location) {
        let factory = {

            getUserInfo:function (ID,callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.23.66:8080/ruta"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            getUserInfoTemp : function (idPersona,callback) {

            }
        };
        return factory;
    })
    .controller("login_Controller",function ($scope,$http,$location) {
        var persona =  [
            {
                email : "oscarlopez@gmail.com",
                nombrePersona : "Oscar Lopez",
                password : 12345
            },
            {
                email:  "j-david-10@hotmail.com",
                nombrePersona : "Josue Arce",
                password : 54321
            }
        ];
        localStorage.setItem("listaUsuarios",JSON.stringify(persona));

        function moverOtraVentana(newPath){
            $location.path(newPath);
        }
        $("#button_aceptar").click(function () {
            let lista = JSON.parse(localStorage.getItem("listaUsuarios"));
            if(a===1) {
                a--;
                if ($("#input_email").val() != "" && $("#input_password").val() != "") {
                    for (item in lista) {
                        if (lista[item].email == $("#input_email").val() && lista[item].password == $("#input_password").val()) {
                            swal("Inicio sesión correcto!!", "Bienvenido.", "success");
                            window.location.href = "templates/main_page.html";
                        }
                        else {
                            swal("Error!!", "Este usuario no existe!.", "error");
                        }
                    }
                }
                else {
                    swal("Alerta!", "Ingrese sus credenciales primero!.", "error");
                }
            }
        });
    })
;
