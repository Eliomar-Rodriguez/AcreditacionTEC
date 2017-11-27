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
var dimensionCtrl = require('./Controladores/controladorDimensiones'); // controlador de Dimensiones
var CYECtrl = require('./Controladores/controladorCYE'); // controlador de CYE
var CYEACtrl = require('./Controladores/controladorCYEA'); // controlador de CYEA
/*
===============================================================================
>  Configuraciones principales del servidor, con esto escucha las peticiones  <
===============================================================================
*/
var bodyParser = require('body-parser');
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', express.static(__dirname + '/"Web Services"'));


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/*
===========================================
>  Inicio de las direcciones (Endpoints)  <
===========================================

/** tipos de consulta, implementar!
 * post
 * get
 * put
 * delete
 */
/*
==================================
>  EndPoints de los Componentes  < // bien todos
==================================
*/
app.post('/insertComponente', componenteCtrl.insertComponente);
app.get('/selectComponentes', componenteCtrl.selectComponente);
app.post('/editComponente', componenteCtrl.editComponente);
app.post('/deleteComponente', componenteCtrl.deleteComponente);

/*
==================================
>  EndPoints de los Dimensiones  < // bien todos
==================================
*/
app.post('/insertDimension', dimensionCtrl.insertDimension);
app.get('/selectDimensiones', dimensionCtrl.selectDimension);
app.post('/editDimension', dimensionCtrl.editDimension);
app.post('/deleteDimension', dimensionCtrl.deleteDimension);

/*
==================================
>     EndPoints de los CYE       < // bien todos
==================================
*/
app.post('/insertCYE', CYECtrl.insertCYE);
app.get('/selectCYE', CYECtrl.selectCYE);
app.post('/editCYE', CYECtrl.editCYE);
app.post('/deleteCYE', CYECtrl.deleteCYE);

/*
==================================
>     EndPoints de los CYEA      < // bien todos
==================================
*/
app.post('/insertCYEA', CYEACtrl.insertCYEA);
app.get('/selectCYEA', CYEACtrl.selectCYEA);
app.post('/editCYEA', CYEACtrl.editCYEA);
app.post('/deleteCYEA', CYEACtrl.deleteCYEA);
/*
==================================================================================
>  Pone el servidor en escucha de peticiones,lo levanta en el puerto requerido.  <
==================================================================================
*/
server.listen(port, function() {
    console.log('Servidor escuchando en el puerto: ' + port);
});