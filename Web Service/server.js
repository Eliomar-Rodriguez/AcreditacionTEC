/*
=================================================
=   Autor: Eliomar Antonio Rodríguez Arguedas   =
=                                               =
=   Web Service para el proyecto Acreditación   =
=   TEC                                         =
=================================================

===============================================================
>  Archivos donde estan los controladores en el servidor.     <
===============================================================
*/
var componenteCtrl = require('./Controladores/controladorComponentes'); // controlador de Componentes
var dimensionCtrl = require('./Controladores/controladorDimensiones'); // controlador de Componentes
/*
===============================================================================
>  Configuraciones principales del servidor, con esto escucha las peticiones  <
===============================================================================
*/
bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/Web Service/'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
===========================================
>  Inicio de las direcciones (Endpoints)  <
===========================================

==================================
>  EndPoints de los Componentes  <
==================================
*/
app.post('/insertDimension', componenteCtrl.insertComponente);
app.get('/selectComponentes', componenteCtrl.selectComponente);
app.post('/editComponente', componenteCtrl.editComponente);
app.post('/deleteComponenete', componenteCtrl.deleteComponente);

/*
==================================
>  EndPoints de los Componentes  <
==================================
*/
app.post('/insertDimension', componenteCtrl.insertComponente);
/*
==================================================================================
>  Pone el servidor en escucha de peticiones,lo levanta en el puerto requerido.  <
==================================================================================
*/

server.listen(port, function() {
    console.log('Servidor escuchando en el puerto: ' + port);
});