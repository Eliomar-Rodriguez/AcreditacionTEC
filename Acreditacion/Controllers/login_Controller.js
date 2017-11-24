/**
 * Created by Josue on 23/11/2017.
 */
angular.module("acreditacion")
    .factory("FactoryLogin",function ($http,$location) {
        let factory = {

            getUserInfo:function (ID,callback) {
                $http({
                    method:"GET",
                    url: "http://172.24.23.66:8080/ruta"
                }).then(function successCallback(response) {
                    callback(response.data);
                }).catch(function errorCallback(response) {
                    callback(response.data);
                });
            },
            getUserInfoTemp : function (idPersona,callback) {

            }
        };
        return factory;
    })
    .controller("login_Controller",function ($scope,$http,$location) {
        $("#button_aceptar").click(function () {
            alert($scope.input_email);
        });
    })
;
