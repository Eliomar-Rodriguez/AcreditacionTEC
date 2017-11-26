
angular.module("acreditacion", ['angularUtils.directives.dirPagination'])
    /**
     * Permite realizar llamadas de los end-points del webservice
     * */
    .factory("FactoryComponentes",function ($http) {
        let factory =  {
            getAllData : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.4:8080/selectComponentes"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            deleteData : function (objetoComponente) {
                $http({
                    method : "POST",
                    url: "http://172.24.42.4:8080/deleteComponente",
                    data : objetoComponente
                }).then(function successCallback(response) {
                    $.notify("Registro eliminado!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al borrar!","error");
                });
            },
            insertData : function (objetoComponente) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.4:8080/insertComponente",
                    data :  objetoComponente
                }).then(function successCallback(response) {
                    swal("Agregado!", "Registro creado.", "success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al crear!","error")
                });
            },
            editData : function (objetoComponente) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.4:8080/editComponente",
                    data : objetoComponente
                }).then(function successCallback(response) {
                    $.notify("Dimensión editada!","success");
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
    .controller("ComponentsController",function ($scope,FactoryComponentes) {
        /*------------------------------VARIABLES NECESARIAS---------------------------------*/

      $scope.currentId = 0;
      $scope.currentPage = 1;
      $scope.pageSize = 10;
      $scope.components = [];
      $scope.globalComponent = {}
      for (var i = 1; i <= 100; i++) {  
        $scope.currentId = i;
        $scope.component = {};
        $scope.component.id = i;
        $scope.component.name = "Componente "+i;
        $scope.components.push($scope.component);
      };

      $scope.remove = function(component) {
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
            $scope.components.splice($scope.components.indexOf(component),1);
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
      $scope.addComponent = function() {
        if ($scope.newComponent.name != "") {
          $scope.component = {};
          $scope.component.id = $scope.currentId += 1;
          $scope.component.name = $scope.newComponent.name;
          $scope.components.push($scope.component); 
          $scope.$apply();
          swal({
              type: 'success',
              title: '¡Agregado correctamente!',
              showConfirmButton: false,
              timer: 1500
            })
          $scope.newComponent.name = ""
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

      $scope.addComponentToEditingModal = function(component) {
        swal({
          title: 'Editar: ' + component.name,
          html:
            '<input id="swal-input1" class="swal2-input" placeholder="Editar">',
          preConfirm: function () {
            return new Promise(function (resolve) {
              resolve([
                $('#swal-input1').val()
              ])
            })
          },
          onOpen: function () {
            $('#swal-input1').focus()
          }
        }).then(function (result) {
          if (document.getElementById('swal-input1').value == "") {
            swal({
              type: 'error',
              title: '¡Error, no pueden haber espacios vacíos!',
              showConfirmButton: false,
              timer: 1500
            })
          }
          else {
            component.name = document.getElementById('swal-input1').value;
            swal({
              type: 'success',
              title: 'Editado correctamente!',
              showConfirmButton: false,
              timer: 1500
            })
            $scope.$apply();
          }
            
        }).catch(swal.noop)

      }
    })
;