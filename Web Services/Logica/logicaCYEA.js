/*
===============================================================================================
>     BackEnd de CYE, se encarga de realizar las llamadas necesarias a la base de datos       <
===============================================================================================
*/

var consultsPreparerCYEA = require('../ConsultsPreparer/consultsPreparerCYEA.js');

// inserta CYEA
exports.insertarCYEA = function(datos, callback) {
    consultsPreparerCYEA.insertCYEA(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar el CYEA";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "CYEA agregado",
                message: "CYEA agregado con exito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// seleccionar CYEA
exports.seleccionarCYEA = function(callback) {
    consultsPreparerCYEA.selectCYEA( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar los CYEAs";
            callback({
                data: response.data           
            })
        } else {
            callback({
                success: false,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// editar CYEA
exports.editarCYEA = function(datos, callback) {
    consultsPreparerCYEA.editCYEA(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar el CYEA";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "CYEA editado",
                message: "CYEA editado con exito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                message: msg,
                title: "Error",
                error: response.error,
                type: "error"
            })
        }
    });
};

// eliminar CYEA
exports.eliminarCYEA = function(datos, callback) {
    consultsPreparerCYEA.deleteCYEA(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el CYEA";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "CYEA eliminado",
                message: "CYEA eliminado con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                error: response.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
};