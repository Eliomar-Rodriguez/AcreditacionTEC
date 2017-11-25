//Declaracion de variable app que contiene como referencia el modulo acreditacion
//Se le inyecta ngRoute el cual permite manejar rutas dentro de un mismo archivo HTML
angular.module("acreditacion",['ngRoute','LocalStorageModule'])

.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/logIn',{
        controller:"login_Controller",
        templateUrl: "index.html"
    })
     .when('/main',{
        controller: "main_Controller",
        templateUrl: "../templates/main_page.html"
    })
    .when('/dimensiones', {
        controller: "Dimensiones",
        templateUrl: "../templates/dimensiones.html"
    })
    .when('/CriteriosYEstandares',{
        controller: "CriteriosYEstandares",
        templateUrl: "../templates/CYE.html"
    })
    .otherwise({
        redirectTo: '/'
  }); 
}]);

