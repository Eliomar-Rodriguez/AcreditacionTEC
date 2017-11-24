/*
================================================
>  Controlador de los Componentes del sistema  <
================================================
*/
var logicaComponente = require('../Logica/logicaComponentes.js');

exports.insertComponente = function(rRequest, rResponse){
    logicaComponente.insertarComponente(rRequest.query, function(data){
        rResponse.send(data);
    })
};

exports.editComponente = function(rRequest, rResponse){
    logicaComponente.editarComponente(rRequest.query, function(data){
        rResponse.send(data);
    });
};

exports.selectComponente = function(rRequest, rResponse){
    logicaComponente.seleccionarComponente(function(data){
        rResponse.send(data.data);
    })
};

exports.deleteComponente = function(rRequest, rResponse){
    console.log("Controlador"+rRequest.query)
    logicaComponente.eliminarComponente(rRequest.query, function(data){
        rResponse.send(data);
    });
};