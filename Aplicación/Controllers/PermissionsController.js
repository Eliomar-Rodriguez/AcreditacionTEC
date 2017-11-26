
// Code goes here
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
myApp.controller('PermissionsController', PermissionsController);

function PermissionsController($scope) {
  $scope.currentId = 0;
  $scope.newPermission = {}
  $scope.currentPage = 1;
  $scope.pageSize = 10;
  $scope.permissions = [];
  for (var i = 1; i <= 100; i++) {  
    $scope.currentId = i;
    $scope.permission = {};
    $scope.permission.id = i;
    $scope.permission.name = "Permiso "+i;
    $scope.permissions.push($scope.permission);
  };

  $scope.remove = function(permission) {
    swal({
      title: '¿Está seguro?',
      text: "Se eliminará",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then(function (result) {
      if (result.value) {
        $scope.permissions.splice($scope.permissions.indexOf(permission),1);
        swal({
          type: 'info',
          title: '¡Eliminado correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
        $scope.$apply();
      }
    })
  }

  $scope.addPermission = function() {

    if ($scope.newPermission.name != "") {
      $scope.permission = {};
      $scope.permission.id = $scope.currentId += 1;
      $scope.permission.name = $scope.newPermission.name;
      $scope.permissions.push($scope.permission); 
      $scope.$apply();
      swal({
          type: 'success',
          title: '¡Agregado correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
      $scope.newPermission.name = ""
    }
    else {
      swal({
          type: 'error',
          title: '¡Error, no pueden haber espacios vacíos!',
          showConfirmButton: false,
          timer: 1500
        })
    }

  }

  
} 

