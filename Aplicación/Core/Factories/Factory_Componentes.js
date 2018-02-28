angular.module("acreditacion")
    /*
    * Para conectarse a los end-points del webservice
    * */
    .factory("FactoryComponentes",function ($http) {
        let factory =  {
            getAllData : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.143:8080/selectComponentes"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            deleteData : function (objetoComponente) {
                $http({
                    method : "POST",
                    url: "http://172.24.42.143:8080/deleteComponente",
                    data: objetoComponente
                }).then(function successCallback(response) {
                    $.notify("Registro eliminado!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al borrar!","error");
                });
            },
            insertData : function (objetoComponente) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.143:8080/insertComponente",
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
                    url : "http://172.24.42.143:8080/editComponente",
                    data : objetoComponente
                }).then(function successCallback(response) {
                    $.notify("Dimensión editada!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al editar!","error");
                });
            },
            getDimensiones : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.143:8080/selectDimensiones"
                }).then(function successCallback(response) {
                    console.log(response.data);
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            }
        };
        return factory;
    })
;
