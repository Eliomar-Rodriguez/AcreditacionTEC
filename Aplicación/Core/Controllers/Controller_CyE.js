/**
 * Created by Josue on 10/11/2017.
 */

angular.module('acreditacion')

    .controller("CriteriosYEstandares",function ($scope,FactoryCYE) {
        /*--------------------------------VARIABLES-------------------------*/
        $scope.listaCYE = [];
        $scope.lista_filtrada_cye = [];
        $scope.input_create_cye = "";
        $scope.selected_component = "";
        $scope.lista_componentes = [];
        $scope.componente_actual = "";
        $scope.selected_edit_component = "";
        $scope.input_edit_cye = "";
        $scope.cye_edit = {
            ID_Criterio : 0,
            Criterio : "",
            Componente_Asociado : ""
        };

        $(document).ready(
            FactoryCYE.getAllData(function (result) {
                $scope.listaCYE = result;
                $scope.lista_filtrada_cye = result;
            }),
            FactoryCYE.getComponents(function (result) {
                $scope.lista_componentes = result;
            })
        );

        function getComponente(nombre_componente) {
            for(item in $scope.lista_componentes){
                if($scope.lista_componentes[item].Componente == nombre_componente){
                    alert("id:"+$scope.lista_componentes[item].ID);
                    return $scope.lista_componentes[item].ID;
                }
            }
        }
        
        $scope.openEditModal = function(ID,Criterio,Componente) {
            $("#modalEditCYE").modal("show");
            $scope.cye_edit.Criterio = Criterio;
            $scope.cye_edit.ID_Criterio = ID;
            $scope.cye_edit.Componente_Asociado = Componente;
            $scope.input_edit_cye = Criterio;
            debugger;
        };

        $scope.editData = function () {
            if($scope.input_edit_cye != ""){
                swal({
                        title: "Alerta",
                        text: "Seguro que desea realizar la modificación? ",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Sí, Editarlo!",
                        cancelButtonText: "No, Cancelar!",
                        cancelButtonClass:"btn-danger",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm) {
                        FactoryCYE.editData(
                            {
                                ID :$scope.cye_edit.ID_Criterio,
                                ID_Componente: getComponente($scope.cye_edit.Componente_Asociado),
                                Criterio : $scope.input_edit_cye
                            }
                        );
                        $("#modalEditCYE").modal("hide");
                        FactoryCYE.getAllData(function (result) {
                            $scope.listaCYE = result;
                            $scope.lista_filtrada_cye = result;
                        });
                        swal("Exito!","Modificación realizada!","success");
                    }
                );
            }
            else{
                $.notify("Complete los espacíos en blanco!","error");
            }
        };
        
        $scope.insertData = function () {
            if($scope.input_create_cye != ""){
                if($scope.selected_component != ""){

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
                            FactoryCYE.insertData(
                                {
                                    ID_Componente: getComponente($scope.selected_component),
                                    Criterio: $scope.input_create_cye
                                }
                            );
                            $("#modalAddRegister").modal("hide");
                            FactoryCYE.getAllData(function (result) {
                                $scope.listaCYE = result;
                                $scope.lista_filtrada_cye = result;
                            });
                            swal("Exito!","Se ha creado con éxito!","success");
                        }
                    );
                }
                else{
                    $.notify("Debe seleccionar al menos un componente!","error");
                }
            }
            else{
                $.notify("Ingrese un nombre válido!","error");
            }
        };

        $scope.deleteData = function(IDComponente){
            FactoryCYE.deleteData({ID:IDComponente});
        };
    })
;
