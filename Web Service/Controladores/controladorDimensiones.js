/*
================================================
>  Controlador de las Dimensiones del sistema  <
================================================
*/
var logicaDimension = require('../Logica/logicaDimensiones.js');

exports.insertDimension = function(rRequest, rResponse){
    console.log("controladorComponente: "+rRequest);
    /// >>>> en caso de enviar un objeto json desde el frontend solamente paso el rRequest, no debo hace un .algo <<<<
    logicaDimension.insertarDimension(rRequest.query, function(data){
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