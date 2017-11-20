var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var sqlConection = require('./sqlConection.js');

/*
===========================
>  CRUD's de Componentes  <
>   - insert              <
>   - select              <
>   - edit                <
>   - delete              <
===========================
*/
exports.insertDimension = function insertDimension(datos, callback) {
    console.log("consultsPreparer: "+datos);
    var request = new Request('insertComponente', function(err) { // nombre de procedimiento en la base de datos
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
    request.addParameter('Componente', TYPES.VarChar, datos.Componente);
    request.addParameter('ID_Dimension', TYPES.Int, datos.ID_Dimension);
    request.addOutputParameter('success', TYPES.Bit);
    
    sqlConection.callProcedure(request, function(res) {
        callback(res);
    });
}

exports.selectDimension = function(callback) {   
    console.log('Preparar consulta'); 
    var query = "SELECT * FROM Dimensiones"; //Agregar procedimiento almacenado para esta consulta
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
    //request.addOutputParameter('success', TYPES.Bit);
    //request.addOutputParameter('sCodError', TYPES.VarChar);
    // se usa executeRequest porque es el destinado para escribir consultas desde aca en vez de llamar procedimientos almacenados
    sqlConection.executeRequest(request, callback); 
}

exports.editDimension = function editDimension(datos, callback) {
    var request = new Request('editComponente', function(err) {
        if (err) {
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: "Sucedio un error en la modificación de los datos",
                type: "error"
            })
        }
    });

    request.addParameter('ID_Componente', TYPES.Int, datos.ID);
    request.addParameter('nombreComponente', TYPES.VarChar, datos.nombreComponente);

    sqlConection.callProcedure(request, callback);
};
// DELETE 
exports.deleteDimension = function deleteDimension(datos, callback) {
    var request = new Request('deleteComponente', function(err) {
        if (err) {
            msg = (request.error == 1) ? "Error de conexión" : "No se puede eliminar el componente";
            callback({
                success: false,
                data: err,
                error: request.error,
                title: "Error",
                message: msg,
                type: "error"
            })
        }
    });
    request.addParameter('ID', TYPES.Int, datos.ID);

    sqlConection.callProcedure(request, callback);
}