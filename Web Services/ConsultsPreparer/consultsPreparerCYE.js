var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('../ConexionDBs/sqlConection.js');

/*
===========================
>  CRUD's de CYE          <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertCYE = function insertCYE(datos, callback) {
    var request = new Request('insertDimension', function(err) { // nombre de procedimiento en la base de datos
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
    request.addParameter('NombreDimension', TYPES.VarChar, datos.Dimension);

    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectCYE = function(callback) {   
    console.log('Preparar consulta'); 
    var query = "SELECT * FROM CYE"; //Agregar procedimiento almacenado para esta consulta
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

exports.editCYE = function editCYE(datos, callback) {
    var request = new Request('editDimension', function(err) {
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

    request.addParameter('ID_Dimension', TYPES.Int, datos.ID);
    request.addParameter('nombreDimension', TYPES.VarChar, datos.nombreDimension);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteCYE = function deleteCYE(datos, callback) {
    var request = new Request('deleteDimension', function(err) {
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
    request.addParameter('ID_Dimension', TYPES.Int, datos.ID);
    
    request.addOutputParameter('success', TYPES.Bit);

    sqlConection.callProcedure(request, callback);
}