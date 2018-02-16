angular.module("acreditacion")
    /*
        Para conectarse a los endpoints del webservice
     */
    .factory("FactoryCYE_Ajustados",function ($http) {
        let factory =  {
            getAllData : function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.143:8080/selectCYEA"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            deleteData : function (objetoCYEA) {
                $http({
                    method : "POST",
                    url: "http://172.24.42.143:8080/deleteCYEA",
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
                    url : "http://172.24.42.143:8080/insertCYEA",
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
                    url : "http://172.24.42.143:8080/editCYE",
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
                    url: "http://172.24.42.143:8080/selectCYE"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            getResponsables: function (callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.42.143:8080/selectUsuarios"
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