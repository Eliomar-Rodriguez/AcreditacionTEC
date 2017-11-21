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
            editarDimension(nuevoNombre,listaComponentes){
                this.nombreDimension = nuevoNombre;
                this.listaComponentes = listaComponentes;
            }
        }
        return dimension;
    })
    .service("gestionDimensiones",function ($http,claseDimension) {
        this.listaDimensiones = [];//ALMACENA LOS OBJETOS DE TIPO DIMENSIÓN

        this.getFromDB = function(){
            $http.get("http://IP/funcion")
                .then(function (response) {
                    llenarListaDimensiones(response.data);
                    $.notify("Consulta exitosa!","info");
                },function (response) {
                    $.notify("Error al procesar consulta!","error")
                });
        };
        this.llenarListaDimensiones = function (lista) { //parametrolista
            for(var i = 0; i < lista.length; i++){
                this.listaDimensiones.push(JSON.parse(lista[i]));
            }
        };
        this.postDB = function (objetoDimension) {
            $http({
                method: 'POST',
                url: '"http://IP/funcion"',
                data: {
                    nombreParametro: JSON.parse(objetoDimension)
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

        this.crearDimension = function(nombreDimension,listaComponentes){
            this.listaDimensiones.push(new claseDimension(nombreDimension,listaComponentes));
            //this.postDB(new claseDimension(nombreDimension,listaComponentes));//ENVÍA EL OBJETO AL A BD
        };
        this.getComponentByDimensionName = function (nombreDimension) {
          for(i in this.listaDimensiones){
              if(this.listaDimensiones[i].nombreDimension == nombreDimension){
                  return this.listaDimensiones[i].listaComponentes;
              }
          }
        };
        this.removeDimension = function (dimension) {
            for(i in this.listaDimensiones){
                if(this.listaDimensiones[i].getNombreDimension() == dimension){
                    this.listaDimensiones.splice(i,1);
                }
            }
            return this.listaDimensiones;
        };
        this.editarDimension = function (nombreActual,nuevoNombre,listaComponentes) {
            for(i in this.listaDimensiones){
                if(this.listaDimensiones[i].getNombreDimension() == nombreActual){
                    this.listaDimensiones[i].editarDimension(nuevoNombre,listaComponentes);
                }
            }
        };
        this.getAll = function(){
            return this.listaDimensiones;
        };


        /*PERMITE HACER C-R-D CON LA LISTA DE COMPONENTES SELECCIONADOS*/
        this.removeSelectedComponente = function (componente,lista) {
            for(i in lista){
                if(lista[i].getNombre() == componente){
                    lista.splice(i,1);
                    return true;
                }
            }
            return false;
        };
        this.getComponent = function(componente,lista){
            for(i in lista){
                if(lista[i].getNombre() == componente){
                    return lista[i];
                }
            }
            return false;
        };
    })
    .controller("Dimensiones",function ($scope,gestionDimensiones,gestionComponentes,claseComponente) {
        /*------------------------------VARIABLES NECESARIAS---------------------------------*/
        $scope.listaDimensiones = [];
        $scope.listaComponentesDisponibles = [];//ARREGLO CON TODOS LOS COMPONENTES CREADOS
        $scope.listaComponentesSeleccionados = [];//ARREGLO QUE ALMACENA LOS COMPONENTES SELECCIONADOS
        $scope.listaDimensiones = gestionDimensiones.listaDimensiones; //ALMACENA LAS DIMENSIONES CREADAS
        $scope.name = "";//ALMACENA EL NOMBRE DE LA DIMENSIÓN ESCRITO AL INTENTAR CREAR UNA DIMENSIÓN NUEVA
        $scope.removeSelected = "";//POSEE EL ITEM QUE SE QUIERE QUITAR DE LA LISTA DE COMPONENTES SELECCIONADOS
        $scope.addComponent = ""; //POSEE EL ITEM QUE SE QUIERE AGREGAR A LA LISTA DE COMPONENTES SELECCIONADOS

        //gestionDimensiones.getFromDB();
        $scope.listaComponentesSeleccionados.push(
            new claseComponente(1,"componente1"),
            new claseComponente(2,"componente2"),
            new claseComponente(3,"componente3")
        );

        $scope.listaComponentesDisponibles.push(
            new claseComponente(1,"componente1"),
            new claseComponente(2,"componente2"),
            new claseComponente(3,"componente3"),
            new claseComponente(4,"componente4")
        );

        //$scope.listaDimensiones = gestionDimensiones.getAll();


        /*-----------------------------------MÉTODOS AUXILIARES------------------------------------------*/
        /*PERMITE INTENTAR GUARDAR UNA NUEVA DIMENSIÓN*/
        $scope.save = function () {
            if($scope.name != "" && $scope.listaComponentesSeleccionados != []){
                swal({
                        title: "Aceptar",
                        text: "Se registrará un nueva dimensión!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonClass: "btn-primary",
                        confirmButtonText: "Sí, Crearlo!",
                        cancelButtonText: "No, Cancelar!",
                        cancelButtonClass:"btn-danger",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm) {
                        if (isConfirm) {
                            $scope.listaDimensiones = [];
                            gestionDimensiones.crearDimension($scope.name,$scope.listaComponentesSeleccionados);

                            $scope.listaDimensiones = gestionDimensiones.getAll();

                            swal("Agregado!", "Registro creado.", "success");
                            $("#modalAddDimension").modal("hide");
                            //window.location.reload();

                        } else {
                            swal("Cancelado", "Operación cancelada", "error");
                        }
                    }
                );

            }
            else if($scope.name == ""){
                swal("Campo nombre vacío","Ingrese un nombre valido primero","error");
            }
            else{
                swal("Componentes","Seleccione al menos componente","error");
            }
        };
        $scope.openModalEdit = function (nombre) {
            $scope.dimensionName = nombre;
            $scope.auxiliarName = nombre;//PERMITE GUARDAR EL NOMBRE ORIGINAL
            $scope.listaComponentesSeleccionados = gestionDimensiones.getComponentByDimensionName(nombre);
        };
        $scope.editDimension = function () {
          if($scope.dimensionName != "" && this.listaComponentesSeleccionados != []){
              gestionDimensiones.editarDimension($scope.auxiliarName,$scope.dimensionName,$scope.listaComponentesSeleccionados);
          }
        };
        /*PERMITE QUITAR UN COMPONENTE DE LA LISTA DE COMPONENTES SELECCIONADOS*/
        $scope.removeComponent = function () {
            if($scope.removeSelected == ""){
                swal("Seleccione un componente","Debe seleccionar al menos un componente!","error");
            }
            else{
                gestionDimensiones.removeSelectedComponente($scope.removeSelected,this.listaComponentesSeleccionados);
            }
        }
        /*PERMITE MOVER UN COMPONENTE DE LA LISTA COMPONENTES DISPONIBLES A LA LISTA DE COMPONENTES SELECCIONADOS*/
        $scope.moveComponent = function () {
            if($scope.addComponent != "" ){
                if(!gestionDimensiones.getComponent($scope.addComponent,$scope.listaComponentesSeleccionados)){
                    $scope.listaComponentesSeleccionados.push(gestionDimensiones.getComponent($scope.addComponent,$scope.listaComponentesDisponibles));
                }
            }
            else{
                swal("Componentes","Seleccione un componente!","error");
            }
        }
        $scope.removeDimension = function (dimension) {
            gestionDimensiones.removeDimension(dimension);
            swal("Eliminado","Registrado eliminado!","success");
        }
    })
;