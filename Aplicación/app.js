//Declaracion de variable app que contiene como referencia el modulo acreditacion
//Se le inyecta ngRoute el cual permite manejar rutas dentro de un mismo archivo HTML
angular.module("acreditacion",['ngRoute','LocalStorageModule'])

.config(['$routeProvider',function($routeProvider){
    $routeProvider.when('/',{
        controller: "main_Controller"
    })
    .when('/dimensiones', {
        controller: "Dimensiones",
        templateUrl: "templates/dimensiones.html"
    })
    .when('/CriteriosYEstandares',{
        controller: "CriteriosYEstandares",
        templateUrl: "templates/CYE.html"
    })
    .when('/CYEAjustados',{
        controller: "CYE_Ajustados",
        templateUrl:"templates/CYE_Ajustados.html"
    })
    .when('/permisos',{

    })
    .when('/componentes',{
        controller:"Componentes",
        templateUrl: "templates/componentes.html"
    })
    .otherwise({
        redirectTo: '/'
  }); 
}]);

