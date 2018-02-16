/**
 * Created by Josue on 25/11/2017.
 */
angular.module("acreditacion")
    .factory("FactoryCYE_Ajustados",function ($http) {
        let factory =  {
            getAllData : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.80:8080/selectCYEA"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            deleteData : function (objetoCYEA) {
                $http({
                    method : "POST",
                    url: "http://172.24.42.80:8080/deleteCYEA",
                    data: objetoCYEA
                }).then(function successCallback(response) {
                    $.notify("Registro eliminado!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al borrar!","error");
                });
            },
            insertData : function (objetoCYEA) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.80:8080/insertCYEA",
                    data :  objetoCYEA
                }).then(function successCallback(response) {
                    swal("Agregado!", "Registro creado.", "success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al crear!","error")
                });
            },
            editData : function (objetoCYEA) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.80:8080/editCYE",
                    data : objetoCYEA
                }).then(function successCallback(response) {
                    $.notify("Dimensión editada!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al editar!","error");
                });
            },
            getCYE : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.80:8080/selectCYE"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            getResponsables: function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.80:8080/selectUsuarios"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            }
        };
        return factory;
    })
    .controller("CYE_Ajustados",function ($scope,FactoryCYE_Ajustados) {
        $scope.lista_cye = [];
        $scope.lista_cye_ajustados = [];
        $scope.lista_filtrada_cye_ajustados = [];
        $scope.selected_cye_option = "";
        $scope.input_cye_ajustado = "";
        $scope.selected_responsable = "";
        $scope.date_fecha_limite = "";
        $scope.lista_usuarios = [];
        $scope.cyea_edit = {
            
        };

        $(document).ready(function () {
            FactoryCYE_Ajustados.getAllData(function (result) {
                $scope.lista_cye_ajustados = result;
                $scope.lista_filtrada_cye_ajustados = result;
            });
            FactoryCYE_Ajustados.getCYE(function (result) {
                $scope.lista_cye = result;
            });
            FactoryCYE_Ajustados.getResponsables(function (result) {
                $scope.lista_usuarios = result;
            });
        });

        function search_criterio(criterio) {
            for(item in $scope.lista_cye){
                if($scope.lista_cye[item].Criterio == criterio){
                    return $scope.lista_cye[item].ID;
                }
            }
        }
        function search_usuario(nombre_usuario) {
            for(item in $scope.lista_usuarios){
                if($scope.lista_usuarios[item].NombreCompleto == nombre_usuario){
                    return $scope.lista_usuarios[item].ID;
                }
            }
        }

        $scope.insertData = function () {
            if($scope.selected_cye_option != "" && $scope.input_cye_ajustado != "" && $scope.selected_responsable != "" && $scope.date_fecha_limite != ""){
                swal({
                        title: "Alerta",
                        text: "Seguro que desea insertar? ",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Sí, Crearlo!",
                        cancelButtonText: "No, Cancelar!",
                        cancelButtonClass:"btn-danger",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm) {
                        FactoryCYE_Ajustados.insertData(
                            {
                                ID_CYE : search_criterio($scope.selected_cye_option),
                                ID_Responsable : search_usuario($scope.selected_responsable),
                                CriterioAjustado : $scope.input_cye_ajustado,
                                Fecha :$scope.date_fecha_limite
                            }
                        );
                        $("#modal_Add_Register").modal("hide");
                        FactoryCYE_Ajustados.getAllData(function (result) {
                            $scope.lista_cye_ajustados = result;
                            $scope.lista_filtrada_cye_ajustados = result;
                        });
                    }
                );

            }
            else{
                $.notify("Ingrese un nombre válido!","error");
            }
        };

        $scope.openModalEdit = function (ID) {
            $("#modalEditCYEA").modal("show");

        };
        $scope.editData = function () {

        };

        $scope.deleteData = function (ID) {
            FactoryCYE_Ajustados.deleteData(
                {
                    ID: ID
                }
            );

        };
    })
;
