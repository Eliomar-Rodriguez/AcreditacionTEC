/*
===============================================================================================
>  BackEnd de Componentes, se encarga de realizar las llamadas necesarias a la base de datos  <
===============================================================================================
*/

var consultsPreparerDimensiones = require('../ConexionDBs/consultsPreparerDimensiones');

// inserta dimensiones
exports.insertarDimension = function(datos, callback) {
    consultsPreparerDimensiones.insertDimension(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar la dimensión";
        if (response.success) {
            callback({
                success: true,
                data: response.data,
                error: response.error,
                title: "Dimensión agregada",
                message: "Dimensión agregada con exito",
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

// seleccionar dimension
exports.seleccionarDimension = function(callback) {
    consultsPreparerDimensiones.selectDimension( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar los componentes";
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

// editar dimension
exports.editarDimension = function(datos, callback) {
    consultsPreparerDimensiones.editDimension(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar la dimensión";
        if (response.success) {
            callback({
                success: true,
                data: response.data,
                error: response.error,
                title: "Dimensión editada",
                message: "Dimensión editada con exito",
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

// eliminar dimension
exports.eliminarDimension = function(datos, callback) {
    consultsPreparerDimensiones.deleteDimension(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar la dimensión";
        if (response.success) {
            callback({
                success: true,
                data: [],
                error: response.error,
                title: "Dimensión eliminada",
                message: "Dimensión eliminada con éxito",
                type: "success"
            })
        } else {
            callback({
                success: false,
                data: [],
                error: response.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
};