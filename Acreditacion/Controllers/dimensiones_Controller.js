//Creacion de la variable que contiene la referencia del modulo creado en App.JS
angular.module("acreditacion")
    /*CREA UN OBJETO DE TIPO DIMENSION = DIMENSION + COMPONENTES*/
    .factory("claseDimension",function () {
        /*CLASE DIMENSION*/
        class dimension{
            constructor(nombre,componentes){
                this.nombreDimension = nombre;
                this.listaComponentes = componentes;
            }
            getDimension(){
                return this;
            }
            getNombreDimension(){
                return this.nombreDimension;
            }
            addComponente(nuevoComponente){
                this.listaComponentes.push(nuevoComponente);
            }
            removeComponente(componenteID){
                for(i in this.listaComponentes){
                    if(this.listaComponentes[i].getComponent() == componenteID){
                        this.listaComponentes.splice(this.listaComponentes[i],1);
                        return true;
                    }
                }
                return false;
            }
            editarDimension(nuevoNombre){
                this.nombreDimension = nuevoNombre;
            }
        }
    })
    .service("gestionDimensiones",function ($http) {
        this.listaDimensiones = new Array();//ALMACENA LOS OBJETOS DE TIPO DIMENSIÓN

        this.getFromDB = function(){
            $http.get("http://IP/funcion")
                .then(function (response) {
                    llenarListaDimensiones(response.data);
                    $.notify("Consulta exitosa!","info");
                },function (response) {
                    $.notify("Error al procesar consulta!","error")
                });
        };
        this.llenarListaDimensiones = function (lista) {
            for(var i = 0; i < lista.length; i++){
                this.listaDimensiones.push(JSON.parse(lista[i]));
            }
        };

        this.postDB = function () {
            $http({
                method: 'POST',
                url: '"http://IP/funcion"',
                data: {
                    nombreParametro: JSON.parse(this.listaDimensiones)
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .success(function(response) {
                    console.log(response.data);
                }.error(function (error) {
                    console.log(error);
                }));
        };

        this.crearDimension = function(nombreDimension,listaComponentesSeleccionados){
            this.listaDimensiones.push(new claseDimension(nombreDimension,listaComponentesSeleccionados));
        };
        this.removeDimension = function (dimension) {
            for(i in this.listaComponentes){
                if(this.listaComponentes[i].getNombreDimension() == dimension){
                    this.listaDimensiones.splice(i,1);
                    return true;
                }
            }
            return false;
        };
        this.editarDimension = function (nombreActual,nuevoNombre) {
            for(i in this.listaDimensiones){
                if(this.listaDimensiones[i].getNombreDimension() == nombreActual){
                    this.listaDimensiones[i].editarDimension(nuevoNombre);
                    return true;
                }
            }
            return false;
        };
        this.getAll = function(){
            return this.listaDimensiones;
        };
        this.removeComponente = function (nombreDimension,nombreComponente) {
            for(i in this.listaDimensiones){
                if(this.listaDimensiones[i].getNombreDimension(nombreDimension)){
                    this.listaDimensiones[i].removeComponente(nombreComponente);
                    return true;
                }
            }
            return false;
        };
    })
    .controller("Dimensiones",function ($scope,gestionDimensiones,gestionComponentes) {
        //gestionDimensiones.getFromDB();
        $scope.dimensionesDisponibles = gestionDimensiones.getAll();
        $scope.listaDimensionesSeleccionadas = new Array();
        $scope.name = "";//ALMACENA EL NOMBRE DE LA DIMENSIÓN ESCRITO AL INTENTAR CREAR UNA DIMENSIÓN NUEVA

        /*PERMITE INTENTAR GUARDAR UNA NUEVA DIMENSIÓN*/
        $scope.save = function () {
            if($scope.name == ""){
                swal({
                    title: "Crear Nueva Dimensión",
                    text: "Esta acción no podrá revertirse.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Si",
                    cancelButtonText: "Cancelar",
                    closeOnConfirm: false
                }, function () {

                    swal({
                        title: "Creado",
                        text: "Dimensión creada",
                        type: "success",
                        confirmButtonColor: "#140e39",
                        timer: 1000,
                        showConfirmButton: false
                    });
                });
            }
        }
    })
;