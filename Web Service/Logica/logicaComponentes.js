/*
===============================================================================================
>  BackEnd de Componentes, se encarga de realizar las llamadas necesarias a la base de datos  <
===============================================================================================
*/

var consultsPreparer = require('../ConexionDBs/consultsPreparer.js');

// inserta componentes
exports.insertarComponente = function(datos, callback) {
    console.log("logicaComponente: "+datos);
    consultsPreparer.insertComponente(datos, function(response) {
        msg = (response.error == 1) ? "Error de conexión" : "No se pudo insertar el componente";
        if (response.success) {
            callback({
                success: true,
                data: response.data,
                error: response.error,
                title: "Componente agregado",
                message: "Componente agregado con exito",
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

// seleccionar componentes
exports.seleccionarComponente = function(callback) {
    consultsPreparer.selectComponente( function(response) {
        if (response.success) {
            msg = (response.error == 1) ? "Error de conexión" : "No se pudo seleccionar los componentes";
            //console.log(response.data);
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

// editar componentes
exports.editarComponente = function(datos, callback) {
    consultsPreparer.editComponente(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se pudo modificar el componente";
        if (response.success) {
            callback({
                success: true,
                data: response.data,
                error: response.error,
                title: "Componente editado",
                message: "Componente editado con exito",
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

// eliminar componentes
exports.eliminarComponente = function(datos, callback) {
    consultsPreparer.deleteComponente(datos, function(response) {
        msg = (response.error === 1) ? "Error de conexión" : "No se puede eliminar el componente";
        if (response.success) {
            callback({
                success: true,
                data: [],
                error: response.error,
                title: "Componente eliminado",
                message: "Componente eliminado con éxito",
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