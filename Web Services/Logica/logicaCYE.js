/*
===============================================================================================
>     BackEnd de CYE, se encarga de realizar las llamadas necesarias a la base de datos       <
===============================================================================================
*/

var consultsPreparerCYE = require('../ConsultsPreparer/consultsPreparerCYE.js');

// inserta CYE
exports.insertarCYE = function(datos, callback) {
    consultsPreparerCYE.insertCYE(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar el CYE";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "CYE agregado",
                message: "CYE agregado con exito",
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

// seleccionar CYE
exports.seleccionarCYE = function(callback) {
    consultsPreparerCYE.selectCYE( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar los CYEs";
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

// editar CYE
exports.editarCYE = function(datos, callback) {
    consultsPreparerCYE.editCYE(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar el CYE";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "CYE editado",
                message: "CYE editado con exito",
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

// eliminar CYE
exports.eliminarCYE = function(datos, callback) {
    consultsPreparerCYE.deleteCYE(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el CYE";
        if (response.success) {
            callback({
                success: true,
                error: response.error,
                title: "CYE eliminado",
                message: "CYE eliminado con éxito",
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