var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);
myApp.controller('ComponentsController', ComponentsController);

function ComponentsController($scope) {
  $scope.currentId = 0;
  $scope.newPermission = {}
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

}
