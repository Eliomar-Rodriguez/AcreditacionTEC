
angular.module("acreditacion", ['angularUtils.directives.dirPagination'])
    /**
     * Permite realizar llamadas de los end-points del webservice
     * */
    .factory("FactoryPermisos",function ($http) {
        let factory =  {
            getAllData : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.4:8080/selectPermisos"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            deleteData : function (objetoPermiso) {
                $http({
                    method : "POST",
                    url: "http://172.24.42.4:8080/deletePermiso",
                    data : objetoPermiso
                }).then(function successCallback(response) {
                    $.notify("Registro eliminado!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al borrar!","error");
                });
            },
            insertData : function (objetoPermiso) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.4:8080/insertPermiso",
                    data :  objetoPermiso
                }).then(function successCallback(response) {
                    swal("Agregado!", "Registro creado.", "success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al crear!","error")
                });
            },
            editData : function (objetoPermiso) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.4:8080/editPermiso",
                    data : objetoPermiso
                }).then(function successCallback(response) {
                    $.notify("Permiso editado!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al editar!","error");
                });
            }
        };
        return factory;
    })



    /**
     * Encargado de conectar la interfaz con las distintas funciones del sistema
     * */
    .controller("PermissionController",function ($scope,FactoryPermisos) {
        /*------------------------------VARIABLES NECESARIAS---------------------------------*/

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
    })
;