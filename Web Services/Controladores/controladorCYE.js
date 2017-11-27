/*
================================================
>      Controlador de las CYE del sistema      <
================================================
*/
var logicaCYE = require('../Logica/logicaCYE.js');

exports.insertCYE = function(rRequest, rResponse){
    logicaCYE.insertarCYE(rRequest.body, function(data){
        rResponse.send(data);
    })
};

exports.editCYE = function(rRequest, rResponse){
    logicaCYE.editarCYE(rRequest.body, function(data){
        rResponse.send(data);
    });
};

exports.selectCYE = function(rRequest, rResponse){
    logicaCYE.seleccionarCYE(function(data){
        rResponse.send(data.data);
    })
};

exports.deleteCYE = function(rRequest, rResponse){
    logicaCYE.eliminarCYE(rRequest.body, function(data){
        rResponse.send(data);
    });
};