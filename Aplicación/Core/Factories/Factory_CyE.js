angular.module("acreditacion")
    /*
        Para conectarse a los endpoints del webservice
     */
    .factory("FactoryCYE",function ($http) {
        let factory =  {
            getAllData : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.143:8080/selectCYE"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            deleteData : function (objetoCYE) {
                $http({
                    method : "POST",
                    url: "http://172.24.42.143:8080/deleteCYE",
                    data: objetoCYE
                }).then(function successCallback(response) {
                    $.notify("Registro eliminado!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al borrar!","error");
                });
            },
            insertData : function (objetoCYE) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.143:8080/insertCYE",
                    data :  objetoCYE
                }).then(function successCallback(response) {
                    swal("Agregado!", "Registro creado.", "success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al crear!","error")
                });
            },
            editData : function (objetoCYE) {
                $http({
                    method : "POST",
                    url : "http://172.24.42.143:8080/editCYE",
                    data : objetoCYE
                }).then(function successCallback(response) {
                    $.notify("Dimensión editada!","success");
                }).catch(function errorCallback(response) {
                    $.notify("Error al editar!","error");
                });
            },
            getComponents : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.143:8080/selectComponentes"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            }
        };
        return factory;
    })
;