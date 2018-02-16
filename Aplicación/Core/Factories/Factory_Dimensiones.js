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
;
