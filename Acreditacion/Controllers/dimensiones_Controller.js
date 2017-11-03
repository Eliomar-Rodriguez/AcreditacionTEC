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
        return dimension;
    })
    .service("gestionDimensiones",function ($http,claseDimension) {
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
        this.llenarListaDimensiones = function () { //parametrolista
            //for(var i = 0; i < lista.length; i++){
              //  this.listaDimensiones.push(JSON.parse(lista[i]));
            //}

            //DATOS DE PRUEBA
            this.listaC = [];
            this.listaDimensiones.push(
                new claseDimension("dimension 1",this.listaC),
                new claseDimension("dimension 2",this.listaC),
                new claseDimension("dimension 3",this.listaC)
            );
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
            for(i in this.listaDimensiones){
                if(this.listaDimensiones[i].getNombreDimension() == dimension){
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
        gestionDimensiones.llenarListaDimensiones();

        console.log(gestionDimensiones.listaDimensiones);
        gestionDimensiones.crearDimension("dimension 4",[]);
        console.log(gestionDimensiones.listaDimensiones);
        gestionDimensiones.removeDimension("dimension 2");
        console.log(gestionDimensiones.listaDimensiones);


        $scope.listaDimensionesSeleccionadas = new Array();//ARREGLO QUE ALMACENA LOS COMPONENTES SELECCIONADOS
        $scope.name = "";//ALMACENA EL NOMBRE DE LA DIMENSIÓN ESCRITO AL INTENTAR CREAR UNA DIMENSIÓN NUEVA


        /*-----------------------------------MÉTODOS AUXILIARES------------------------------------------*/
        /*PERMITE INTENTAR GUARDAR UNA NUEVA DIMENSIÓN*/
        $scope.save = function () {
            if($scope.name == ""){
                /*swal({
                        title: "Are you sure?",
                        text: "You will not be able to recover this imaginary file!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "Yes, delete it!",
                        cancelButtonText: "No, cancel plx!",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            swal("Deleted!", "Your imaginary file has been deleted.", "success");
                        } else {
                            swal("Cancelled", "Your imaginary file is safe :)", "error");
                        }
                    }
                );*/
            }
        }
    })
;