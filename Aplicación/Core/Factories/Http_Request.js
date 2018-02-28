angular.module("acreditacion")
    .factory("Http_Request",function ($http) {
        let http_Request = {
            Http_Request : function (http,params,callback) {
                $http({
                    method : http.method,
                    url : "http://172.24.42.143:8080/" + http.endPoint,
                    data : params
                }).then(function successCallback(response) {
                    callback(response);
                }).catch(function errorCallback(response) {
                    callback(response);
                })
            }
        };
        return http_Request;
    })
;