/**
 * Created by Josue on 27/11/2017.
 */
angular.module("acreditacion")

    .controller("Componentes",function ($scope,FactoryComponentes) {
        $scope.lista_componentes = [];
        $scope.lista_filtrada_componentes = [];
        $scope.componente_edit = {
            ComponenteOriginal : "",
            Componente : "",
            Dimension_Asociada : ""
        };
        $scope.input_component_name = "";
        $scope.selected_dimension_option = "";
        $scope.lista_dimensiones_disponibles = [];
        $(document).ready(function () {
            FactoryComponentes.getAllData(function (result) {
               $scope.lista_componentes = result;
               $scope.lista_filtrada_componentes = result;
            });
            FactoryComponentes.getDimensiones(function (result) {
                $scope.lista_dimensiones_disponibles =result;
            })
        });
        $scope.deleteData= function (componente_ID) {
            FactoryComponentes.deleteData({ID:componente_ID});
        };
        $scope.openModalEdit = function (item) {
            $("#modalEditDimension").modal("show");
            $scope.componente_edit.Componente = item.Componente;
            $scope.componente_edit.Dimension_Asociada = item.Dimension;
            $scope.componente_edit.ComponenteOriginal = item.Componente;
        };
        function get_component_id(componente) {debugger;
            for(item in $scope.lista_componentes){
                if($scope.lista_componentes[item].Componente == componente){
                    return $scope.lista_componentes[item].ID;
                }
            }
        }
        $scope.editData = function () {
            FactoryComponentes.editData(
                {
                    ID: get_component_id($scope.componente_edit.ComponenteOriginal),
                    ID_Dimension : get_dimension_id($scope.componente_edit.Dimension_Asociada),
                    Componente: $scope.componente_edit.Componente
                }
            );
            $("#modalEditDimension").modal("hide");
            FactoryComponentes.getAllData(function (result) {
                $scope.lista_componentes = result;
                $scope.lista_filtrada_componentes = result;
            });
        };
        function get_dimension_id(dimension) {
            for(item in $scope.lista_dimensiones_disponibles){
                if($scope.lista_dimensiones_disponibles[item].Dimension = dimension){
                    return $scope.lista_dimensiones_disponibles[item].ID;
                }
            }
        }
        $scope.insertData = function () {
            if($scope.selected_dimension_option != "" && $scope.input_component_name != ""){
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
                        FactoryComponentes.insertData(
                            {
                                ID_Dimension : get_dimension_id($scope.selected_dimension_option),
                                Componente : $scope.input_component_name
                            }
                        );
                        $("#modalAddRegister").modal("hide");
                        FactoryComponentes.getAllData(function (result) {
                            $scope.lista_componentes = result;
                            $scope.lista_filtrada_componentes = result;
                        });
                    }
                );
            }
            else{
                $.notify("Complete los espacios primero!","error");
            }
        }
    })
;