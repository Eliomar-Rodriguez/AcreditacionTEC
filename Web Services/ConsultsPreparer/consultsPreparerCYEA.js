var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection.js');

/*
===========================
>  CRUD's de CYEA          <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertCYEA = function insertCYEA(datos, callback) {
    var request = new Request('insertCYEA', function(err) { // nombre de procedimiento en la base de datos
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la inserción de los datos",
                type: "error"
            })
        }
    });
    request.addParameter('ID_CYE_General', TYPES.Int, datos.ID_CYE);
    request.addParameter('ID_Responsable', TYPES.Int, datos.ID_Responsable);
    request.addParameter('CriterioAjustado', TYPES.VarChar, datos.CriterioAjustado);
    request.addParameter('FLOC', TYPES.Date, datos.Fecha);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectCYEA = function(callback) {  
    var query = "SELECT * FROM CYEA"; //Agregar procedimiento almacenado para esta consulta
    var request = new Request(query, function(err) {
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Error obteniendo los datos. Revise su conexión",
                type: "error"
            });
        }
    });
    // se usa executeRequest porque es el destinado para escribir consultas desde aca en vez de llamar procedimientos almacenados
    sqlConection.executeRequest(request, callback); 
}

exports.editCYEA = function editCYEA(datos, callback) {
    var request = new Request('editCYEA', function(err) {
        if (err) {
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la modificación de los datos",
                type: "error"
            })
        }
    });

    request.addParameter('ID_CYEA', TYPES.Int, datos.ID);
    request.addParameter('ID_CYE_General', TYPES.Int, datos.ID_CYE);
    request.addParameter('ID_Responsable', TYPES.Int, datos.ID_Responsable);
    request.addParameter('Valoracion', TYPES.Int, datos.Valoracion);
    request.addParameter('FLOC', TYPES.Date, datos.Fecha);
    request.addParameter('CriterioAjustado', TYPES.VarChar, datos.CriterioAjustado);
    request.addParameter('Observaciones', TYPES.VarChar, datos.Observaciones);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteCYEA = function deleteCYEA(datos, callback) {
    var request = new Request('deleteCYEA', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar la dimensión";
            callback({
                success: false,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID_CYEA', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}