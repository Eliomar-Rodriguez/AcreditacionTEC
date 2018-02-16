angular.module("acreditacion")
    /**
     * Permite realizar llamadas de los end-points del webservice
     * */
    .factory("FactoryDimensions",function ($http) {
        let factory =  {
            getAllData : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.143:8080/selectDimensiones"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            deleteData : function (objetoDimension) {
                $http({
                    method : "POST",
                    url: "http://172.24.42.143:8080/deleteDimension",
                    data: objetoDimension
                }).then(function successCallback(response) {
                    $.notify("Registro eliminado!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al borrar!","error");
                });
            },
            insertData : function (objetoDimension) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.143:8080/insertDimension",
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
                    url : "http://172.24.42.143:8080/editDimension",
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
                    url:"http://172.24.42.80:8080/linkComponentToDimension"
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
        let posicion_actual = 0; // POSICIÓN DONDE SE ENCUENTRA ACTUALMENTE EN LA LISTA DE DIMENSIONES
        let posicion_final = 3; //POSICION FINAL DEL RANGO DE REGISTROS A DESPLEGAR
        $scope.lista_filtrada_dimensiones = [];
        $scope.dimension_actual = {
            nombre_dimension : "",
            ID : 0
        };

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
                        FactoryDimensions.insertData({Dimension:$scope.input_dimension_name});
                        $("#modalAddDimension").modal("hide");
                        FactoryDimensions.getAllData(function (result) {
                            $scope.listaDimensiones = result;
                            $scope.lista_filtrada_dimensiones = result;
                        });
                    }
                );

            }
            else{
                $.notify("Ingrese un nombre válido!","error");
            }
        };

        /*Permite eliminar una dimensión de la base de datos, se llama al end-point*/
        $scope.deleteDimension = function (idDimension) {
            FactoryDimensions.deleteData({ID: idDimension});
            FactoryDimensions.getAllData(function (result) {
                $scope.listaDimensiones = result;
                $scope.lista_filtrada_dimensiones = result;
            });
        };

        $scope.openModalEdit = function (objeto) {
            $scope.dimension_actual.ID = objeto.ID;
            $scope.dimension_actual.nombre_dimension = objeto.Dimension;
        };

        $scope.editDimension = function () {
            FactoryDimensions.editData({
                ID : $scope.dimension_actual.ID,
                Dimension : $scope.dimension_actual.nombre_dimension
            });
            $("#modalEditDimension").modal("hide");
        };

        function desplazar_lista(posInicial,posFinal) {
            $scope.lista_filtrada_dimensiones = [];
            for(let item = posInicial; item < posFinal;item++){
                $scope.lista_filtrada_dimensiones.push($scope.listaDimensiones[item]);
            }
        }

        function next_rows() {
            posicion_final++;
            posicion_actual = posicion_final;debugger;
            let contador = 0;
            while(posicion_actual < $scope.listaDimensiones.length){
                if(contador_registros === 4){
                    break;
                }
                contador++;
                posicion_final++;
            }
            desplazar_lista(posicion_actual,posicion_final);
            posicion_actual = posicion_final;

            if(posicion_actual == $scope.listaDimensiones.length){
                $("#button_next_rows").attr("disabled",true);
            }
            else if(posicion_actual != 0){
                $("#button_last_rows").attr("disabled",false);
            }
        }
        function back_rows() {debugger;
            let posFinal = posicion_actual;
            let contador = 0;
            while(posicion_actual != 0){
                if(contador == 4){
                    break;
                }
                contador++;
                posicion_actual--;
            }
            desplazar_lista(posicion_actual,posFinal);


            if(posicion_actual != $scope.listaDimensiones.length){
                $("#button_next_rows").attr("disabled",false);
            }
            if(posicion_actual == 0){
                $("#button_last_rows").attr("disabled",true);
            }
        }

        $scope.nextData = function () {
            if(posicion_actual != $scope.listaDimensiones.length){
                next_rows();
            }
        };
        $scope.backData = function () {
            if(posicion_actual != 0){
                back_rows();
            }

        };


    })
;