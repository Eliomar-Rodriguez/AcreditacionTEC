angular.module("acreditacion")
    /**
     * Permite realizar llamadas de los end-points del webservice
     * */
    .factory("FactoryDimensions",function ($http) {
        let factory =  {
            getAllData : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.4:8080/selectDimensiones"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            deleteData : function (objetoDimension) {
                $http({
                    method : "POST",
                    url: "http://172.24.42.4:8080/deleteDimension",
                    data : objetoDimension
                }).then(function successCallback(response) {
                    $.notify("Registro eliminado!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al borrar!","error");
                });
            },
            insertData : function (objetoDimension) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.4:8080/insertDimension",
                    data :  objetoDimension
                }).then(function successCallback(response) {
                    swal("Agregado!", "Registro creado.", "success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al crear!","error")
                });
            },
            editData : function (objetoDimension) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.4:8080/editDimension",
                    data : objetoDimension
                }).then(function successCallback(response) {
                    $.notify("Dimensión editada!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al editar!","error");
                });
            },
            linkDimensionComponent : function (objeto) {
                $http({
                    method:"POST",
                    url:"http://172.24.42.4:8080/linkComponentToDimension"
                }).then(function successCallback(response) {
                    $.notify("Cambios realizados!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al realizar cambios!","error");
                });
            }
        };
        return factory;
    })


    /**
     * Encargado de conectar la interfaz con las distintas funciones del sistema
     * */
    .controller("Dimensiones",function ($scope,FactoryDimensions) {
        /*------------------------------VARIABLES NECESARIAS---------------------------------*/

        $scope.listaDimensiones = []; //ALMACENA LOS OBJETOS DIMENSIONES QUE ESTÁN EN LA BASE DE DATOS
        $scope.availableComponents = [];//ALMACENA LOS COMPONENTES DISPONIBLES PARA ELEGIR, ES DECIR LOS QUE AÚN NO ESTÁN RELACIONADOS CON ALGÚNA DIMENSIÓN
        $scope.selectedComponents = []; //ALMACENA LOS COMPONENTES SELECCIONADOS POR EL USUARIO
        $scope.input_dimension_name = ""; //APUNTA AL INPUT << INSERTAR NOMBRE DIMENSIÓN >>
        $scope.select_available_components = ""; //OBTIENE EL VALOR DEL ITEM SELECCIONADO DE LA LISTA DE COMPONENTES DISPONIBLES
        $scope.select_selected_component = ""; //GUARDA EL VALOR DEL ITEM SELECCIONADO DE LA LISTA DE COMPONENTES SELECCIONADOS
        $scope.cantidad_registros_mostrados = 4; //HACE REFERENCIA A CUANTOS REGISTROS PUEDE MOSTRAR EN LA TABLA
        let posicion_actual = 4; // POSICIÓN DONDE SE ENCUENTRA ACTUALMENTE EN LA LISTA DE DIMENSIONES
        $scope.lista_filtrada_dimensiones = [];

        /*------------------------------MÉTODOS----------------------------------------------*/
        /*Se ejecuta cuando se llama el controlador, es el primer método que se va ejecutar*/
        $(document).ready(function () {
            FactoryDimensions.getAllData(function (result) {
                $scope.listaDimensiones = result;
                $scope.lista_filtrada_dimensiones = result;
            });
        });

        /*Se ejecuta cuando se intenta crear una nueva dimensión*/
        $scope.createDimension = function () {
            if($scope.input_dimension_name != ""){
                if($scope.selectedComponents.length != 0){
                    swal({
                            title: "Aceptar",
                            text: "Se registrará un nueva dimensión!",
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
                            if (isConfirm) {

                            } else {
                                swal("Cancelado", "Operación cancelada", "error");
                            }
                        }
                    );
                }
                else{
                    swal({
                            title: "Alerta",
                            text: "Seguro que desea insertar? No se han seleccionado componentes!",
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
                            FactoryDimensions.insertData({Dimension:$scope.input_dimension_name});
                            $("#modalAddDimension").modal("hide");
                        }
                    );
                }
            }
            else{
                $.notify("Ingrese un nombre válido!","error");
            }
        };

        /*Permite eliminar una dimensión de la base de datos, se llama al end-point*/
        $scope.deleteDimension = function (idDimension) {
            FactoryDimensions.deleteData({ID : idDimension});
        };


        function next_rows() {debugger;
            let contador_registros = 0;
            $scope.lista_filtrada_dimensiones = [];
            while(posicion_actual < $scope.listaDimensiones.length){
                if(contador_registros === 4){
                    break;
                }
                $scope.lista_filtrada_dimensiones.push($scope.listaDimensiones[posicion_actual]);
                posicion_actual++;
                contador_registros++;
            }
        }
        function back_rows() {
            let contador_registros = 1;

        }

        $scope.nextData = function () {
            next_rows();
        }
    })
;