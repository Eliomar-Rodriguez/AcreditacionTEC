var Connection = require('tedious').Connection; // libreria necesaria para conectar con SQL Server

/*
=====================================================================
>   Configuraciones de conección a la base de datos sql server.     <
>   Cambiar esto por la configuraciones del servidor en producción  <
=====================================================================
*/
var config = {
    userName: 'sa',
    password: '12345',
    server: 'localhost', // direccion del servidor
    options: {
        database: 'AcreditacionTEC',
        driver: 'SQL Server Native Client 11.0',
        port: 1433,
        rowCollectionOnDone: true
    }
};
//Códigos de error
var SIN_CONEXION = 1;

//Crea la conección, si todo sale bien no tira el mensaje de error en la consola.
var connection = new Connection(config);

connection.on('connect', function(err) {
    if (err) {
        console.log(err);
    }
});

/**
 * Ejecuta un query en la base de datos SQL Server.
 *
 * @param {fuest} request
 * @param {function} callback
 */
exports.executeRequest = function executeRequest(request, callback) {
    'use strict';
    console.log("sqlConection");
    var res = [],
        connection = new Connection(config);

    connection.on('connect', function(err) {
        if (err) {
            callback({
                success: false,
                data: err.message,
                error: SIN_CONEXION,
            });
            return;
        }
        
        request.on('row', function(columns) { // si devuelve datos llena res[]
            console.log(res);
            var row = {};
            columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    row[column.metadata.colName] = column.value;
                }
            });
            res.push(row);
        });

        request.on('returnValue', function(parameterName, value, metadata) {
            connection.close();
            console.log("entro al return");
            if (parameterName === 'success' && (value === 1 || value === true)) {
                callback({
                    success: true,
                    data: res
                });
            } else {
                callback({
                    success: false,
                    data: []
                });
            };
        });

        
        request.on('done', function (rowCount, more, rows) { // si el tipo de exito es done llena callback
            console.log(res);
            callback({
                success: true,
                data: res,
                error: 200
            }); 
        });

        request.on('doneProc', function (rowCount, more, rows) { // si el tipo de exito es doneProc llena callback
            //console.log('done: '+ rowCount + ' row(s) returned');
            console.log(res);
            callback({
                success: true,
                data: res,
                error: 200
            }); 
        });
        connection.execSql(request);
    });
};

/**
 * Ejecuta un procedimiento almacenado en la base de datos SQL Server.
 *
 * @param {Request} request
 * @param {function} callback
 */
exports.callProcedure = function callProcedure(request, callback) {
    'use strict';
    var res = [],
    connection = new Connection(config);

    connection.on('connect', function(err) {
        if (err) {
            callback({
                success: false,
                data: err.message,
                error: SIN_CONEXION
            });
        }
        request.on('row', function(columns) {
            var row = {};
            columns.forEach(function(column) {
                if (column.value === null) {
                    console.log('NULL recibido');
                } else {
                    row[column.metadata.colName] = column.value;
                }
            });
            res.push(row);
        });
        
        request.on('returnValue', function(parameterName, value, metadata) {
            connection.close();
            console.log(metadata);
            if (parameterName === 'success' && (value === 1 || value === true)) {
                callback({
                    success: true,
                    data: res
                });
            } else {
                callback({
                    success: false,
                    data: []
                });
            };
        });
        /*
        request.on('doneProc', function(rowCount, more, rows) {
            callback({
                success: true,
                data: res,
                error: 200
            });
        });
        */
        connection.callProcedure(request);
    });
};