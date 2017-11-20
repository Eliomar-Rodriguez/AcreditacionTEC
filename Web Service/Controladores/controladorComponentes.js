/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var logicaComponente = require('../Logica/logicaComponentes.js');

exports.insertComponente = function(rRequest, rResponse){
    console.log("controladorComponente: "+rRequest);
    /// >>>> en caso de enviar un objeto json desde el frontend solamente paso el rRequest, no debo hace un .algo <<<<
    logicaComponente.insertarComponente(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editComponente = function(rRequest, rResponse){
    logicaComponente.editarComponente(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectComponente = function(rRequest, rResponse){
    logicaComponente.seleccionarComponente(function(data){
        rResponse.send(data.data);
    })
};

exports.deleteComponente = function(rRequest, rResponse){
    logicaComponente.eliminarComponente(rRequest.body, function(data){
        rResponse.send(data);
    });
};