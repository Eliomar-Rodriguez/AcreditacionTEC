//Declaracion de variable app que contiene como referencia el modulo acreditacion
//Se le inyecta ngRoute el cual permite manejar rutas dentro de un mismo archivo HTML
angular.module("acreditacion",['ngRoute','LocalStorageModule'])

.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        controller: "acreditacion"
    })
    .when('/dimensiones', {
        controller: "Dimensiones",
        templateUrl: "templates/dimensiones.html"
    })
    .otherwise({
        redirectTo: '/'
  }); 
}]);

