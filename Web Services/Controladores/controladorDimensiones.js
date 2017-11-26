/*
================================================
>  Controlador de las Dimensiones del sistema  <
================================================
*/
var logicaDimension = require('../Logica/logicaDimensiones.js');

exports.insertDimension = function(rRequest, rResponse){
    logicaDimension.insertarDimension(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editDimension = function(rRequest, rResponse){
    logicaDimension.editarDimension(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectDimension = function(rRequest, rResponse){
    logicaDimension.seleccionarDimension(function(data){
        rResponse.send(data.data);
    })
};

exports.deleteDimension = function(rRequest, rResponse){
    logicaDimension.eliminarDimension(rRequest.body, function(data){
        rResponse.send(data);
    });
};